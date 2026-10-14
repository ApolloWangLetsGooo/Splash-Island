#!/usr/bin/env node
/* Splash Island game server — no dependencies, just Node.js (v18 or newer).
   - Serves the game (index.html in this folder).
   - Relays multiplayer over WebSocket: everyone on this server shares the public island ("lobby"),
     and a party code gives a group its own island.
   Run:  node server.js            (port 8080)
         PORT=3000 node server.js  (another port; hosting services set PORT for you) */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const os = require('os');

const PORT = +process.env.PORT || 8080;
const ROOT = __dirname;
const MAX_MSG = 16 * 1024, MAX_PER_ROOM = 24, MAX_CLIENTS = 400;
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.txt': 'text/plain; charset=utf-8', '.glb': 'model/gltf-binary' };

/* ---------- static files ---------- */
const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://x');
  if (url.pathname.endsWith('/__splash')) { res.writeHead(200, { 'content-type': 'application/json', 'cache-control': 'no-store' }); res.end(JSON.stringify({ splash: 1, players: clients.size })); return; }
  let p = decodeURIComponent(url.pathname); if (p.endsWith('/')) p += 'index.html';
  const file = path.normalize(path.join(ROOT, p));
  if (!file.startsWith(ROOT + path.sep) || path.basename(file) === 'server.js') { res.writeHead(403); res.end(); return; }
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) { res.writeHead(404, { 'content-type': 'text/plain' }); res.end('Not found'); return; }
    res.writeHead(200, { 'content-type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream', 'cache-control': 'no-cache' });
    fs.createReadStream(file).pipe(res);
  });
});

/* ---------- a tiny WebSocket implementation (RFC 6455: text frames, ping/pong, close) ---------- */
const clients = new Map(); // id -> client
const rooms = new Map();   // room name -> Set(client)
let nextId = 1;
function frame(str, op = 1) {
  const data = Buffer.from(str); const n = data.length; let head;
  if (n < 126) head = Buffer.from([0x80 | op, n]);
  else if (n < 65536) { head = Buffer.alloc(4); head[0] = 0x80 | op; head[1] = 126; head.writeUInt16BE(n, 2); }
  else { head = Buffer.alloc(10); head[0] = 0x80 | op; head[1] = 127; head.writeBigUInt64BE(BigInt(n), 2); }
  return Buffer.concat([head, data]);
}
function send(c, obj) { if (c.alive && !c.sock.destroyed) c.sock.write(frame(JSON.stringify(obj))); }
function drop(c) {
  if (!c.alive) return; c.alive = false; clients.delete(c.id);
  const set = rooms.get(c.room); if (set) { set.delete(c); if (!set.size) rooms.delete(c.room); else for (const o of set) send(o, { t: 'leave', id: c.id }); }
  try { c.sock.end(); } catch (e) { /* gone */ } setTimeout(() => c.sock.destroy(), 1000);
}
function onMessage(c, text) {
  if (text.length > MAX_MSG) return; let m; try { m = JSON.parse(text); } catch (e) { return; }
  if (!m || typeof m !== 'object') return; const set = rooms.get(c.room); if (!set) return;
  if (m.t === 'all') { if (m.d && m.d.t === 'p') c.pres = m.d; for (const o of set) if (o !== c) send(o, { t: 'msg', from: c.id, d: m.d }); }
  else if (m.t === 'to') { const o = clients.get(String(m.id)); if (o && o.room === c.room) send(o, { t: 'msg', from: c.id, d: m.d }); }
}
server.on('upgrade', (req, sock) => {
  const url = new URL(req.url, 'http://x'); const key = req.headers['sec-websocket-key'];
  const room = String(url.searchParams.get('room') || 'lobby').toLowerCase();
  if (!url.pathname.endsWith('/ws') || !key || !/^[a-z0-9][a-z0-9_.-]{0,47}$/.test(room) || clients.size >= MAX_CLIENTS || (rooms.get(room) || new Set()).size >= MAX_PER_ROOM) { sock.end('HTTP/1.1 400 Bad Request\r\n\r\n'); return; }
  const accept = crypto.createHash('sha1').update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11').digest('base64');
  sock.write('HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: ' + accept + '\r\n\r\n');
  sock.setNoDelay(true);
  const c = { id: String(nextId++), sock, room, pres: null, alive: true, buf: Buffer.alloc(0), frag: [], seen: Date.now() };
  clients.set(c.id, c); if (!rooms.has(room)) rooms.set(room, new Set()); const set = rooms.get(room);
  send(c, { t: 'hello', id: c.id, room, peers: [...set].map((o) => ({ id: o.id, d: o.pres })) });
  for (const o of set) send(o, { t: 'join', id: c.id }); set.add(c);
  sock.on('data', (chunk) => {
    c.seen = Date.now(); c.buf = Buffer.concat([c.buf, chunk]);
    while (c.buf.length >= 2) {
      const b0 = c.buf[0], b1 = c.buf[1]; const fin = b0 & 0x80, op = b0 & 0x0f, masked = b1 & 0x80; let len = b1 & 0x7f, off = 2;
      if (len === 126) { if (c.buf.length < 4) return; len = c.buf.readUInt16BE(2); off = 4; }
      else if (len === 127) { if (c.buf.length < 10) return; const big = c.buf.readBigUInt64BE(2); if (big > BigInt(MAX_MSG * 4)) return drop(c); len = Number(big); off = 10; }
      if (len > MAX_MSG * 4) return drop(c);
      const need = off + (masked ? 4 : 0) + len; if (c.buf.length < need) return;
      let payload = c.buf.subarray(off + (masked ? 4 : 0), need);
      if (masked) { const mask = c.buf.subarray(off, off + 4); payload = Buffer.from(payload); for (let i = 0; i < payload.length; i++) payload[i] ^= mask[i & 3]; }
      c.buf = c.buf.subarray(need);
      if (op === 8) return drop(c);
      if (op === 9) { if (!sock.destroyed) sock.write(frame(payload.toString(), 10)); continue; }
      if (op === 10) continue;
      if (op === 1 || op === 0) { c.frag.push(payload); if (fin) { const text = Buffer.concat(c.frag).toString('utf8'); c.frag = []; onMessage(c, text); } }
    }
  });
  sock.on('close', () => drop(c)); sock.on('error', () => drop(c));
});
// keep connections alive through proxies/tunnels, and clear out dead ones
setInterval(() => { const now = Date.now(); for (const c of clients.values()) { if (now - c.seen > 60000) drop(c); else if (!c.sock.destroyed) c.sock.write(frame('', 9)); } }, 20000);

server.listen(PORT, () => {
  const ips = []; for (const list of Object.values(os.networkInterfaces())) for (const a of list || []) if (a.family === 'IPv4' && !a.internal) ips.push(a.address);
  console.log('\n  Splash Island is running!\n');
  console.log('  On this computer:      http://localhost:' + PORT);
  for (const ip of ips) console.log('  Friends on your Wi-Fi: http://' + ip + ':' + PORT);
  console.log('\n  Keep this window open while you play. Press Ctrl+C to stop.\n');
});
