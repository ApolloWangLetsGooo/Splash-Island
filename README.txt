SPLASH ISLAND  ·  水花岛
=========================================================

  index.html                游戏本体（一个文件，所有模型和代码都在里面）
  server.js                 联机服务器（不需要安装任何插件，只要有 Node.js）
  start-windows.bat         Windows：双击启动服务器
  start-mac.command         Mac：双击启动服务器

---------------------------------------------------------
一、一个人玩
---------------------------------------------------------
直接双击 index.html，用 Chrome 或 Edge 打开就能玩。

---------------------------------------------------------
二、和朋友在同一个 Wi-Fi 下联机（最稳）
---------------------------------------------------------
1. 先安装 Node.js（免费）：https://nodejs.org ，选 LTS 版本。
2. 双击 start-windows.bat（Windows）或 start-mac.command（Mac）。
   Mac 第一次如果提示“无法打开”：右键点它 → 打开。
3. 黑色窗口里会显示两个地址：
     On this computer:       http://localhost:8080          ← 你自己用这个
     Friends on your Wi-Fi:  http://192.168.x.x:8080        ← 发给朋友
4. 朋友连同一个 Wi-Fi，用浏览器打开第二个地址，就进到同一个岛了。
5. 玩的时候这个窗口不要关。

---------------------------------------------------------
三、朋友不在身边（通过互联网联机）
---------------------------------------------------------
方法 A：放到网站上（不用一直开着电脑）
  把这个文件夹上传到任何静态网站托管，例如 GitHub Pages、Netlify、
  Cloudflare Pages（都有免费版，需要注册账号）。把得到的网址发给朋友。
  这种方式游戏会自动用“点对点”直连（P2P）：大多数家里的 Wi-Fi 可以，
  少数学校、公司或手机网络会挡住；挡住时就只能单人玩。

方法 B：用你的电脑当服务器（最稳）
  1. 按上面“二”的步骤启动服务器。
  2. 再开一个终端窗口，运行（需要先安装 cloudflared：
     Mac 用 brew install cloudflared，Windows 去 Cloudflare 官网下载）：
         cloudflared tunnel --url http://localhost:8080
  3. 它会给你一个 https://xxxx.trycloudflare.com 的网址，发给朋友即可。

方法 C：放到云服务器上
  任何能运行 Node.js 的主机（自己的服务器、Render、Railway、Fly.io 等），
  上传整个文件夹，启动命令写 node server.js。端口会自动读取 PORT 环境变量。

---------------------------------------------------------
四、组队（私人房间）
---------------------------------------------------------
- 默认所有连上同一个服务器（或同一个网址）的人都在“公共岛”一起玩。
- 想只和自己人玩：选英雄界面点 NEW PARTY，会出现一个代码（比如 WAVE69），
  朋友在 JOIN 旁边输入同一个代码。游戏里按 P（手机点右上角 FRIENDS）也能打开。
- 每人选一个不同的英雄。走到朋友的车 / 鸟 / 船旁边按 R 就能坐上去。

---------------------------------------------------------
五、操作
---------------------------------------------------------
  WASD 移动    鼠标 看四周（点一下画面锁定鼠标，Esc 释放）   滚轮 远近
  Shift 疾跑（耗体力）   空格 跳；空中再按一次开滑翔伞
  鼠标左键 / J 攻击（自动转向最近的敌人）   E 英雄能力
  R 上下朋友的载具   C 鸟形态下降   1–4 换英雄   P 好友和组队   M 声音   H 隐藏操作说明
  手机：左下摇杆（推到底就是疾跑），右边按钮：Attack / Jump / Power / Ride / Down / Help

---------------------------------------------------------
六、四个英雄
---------------------------------------------------------
  AP       回旋太阳飞盘（反手飞盘投掷）。E：太阳车，可以载 3 个朋友。
  Clark    高尔夫少年。敌人在身边：球杆像剑一样连斩（连按两下是正手+反手）；
           敌人在远处：侧身站好、完整挥杆把高尔夫球打出去。E：大鸟（不再有体力限制）。
  TMZ      四分卫。持球夹在臂下，攻击时举球到耳边、单手过肩把螺旋球传出去。E：冲撞。
  Freddie  锚扛在肩上。敌人在身边：抡锚砸；远处：把锚连着绳子甩出去，勾住怪物拖回来。
           E：帆船，在水上航行；开上陆地时船底会出现一朵云，船浮在云上照样开。

=========================================================
ENGLISH
=========================================================
Solo: double-click index.html (Chrome or Edge).

Same Wi-Fi: install Node.js (https://nodejs.org, LTS), double-click start-windows.bat or
start-mac.command, then friends open the "Friends on your Wi-Fi" address it prints.
Keep that window open while you play.

Over the internet:
  A. Upload this folder to any static host (GitHub Pages, Netlify, Cloudflare Pages) and share
     the URL. Players connect peer-to-peer; most home networks work, some school/office
     networks block it.
  B. Run the server, then `cloudflared tunnel --url http://localhost:8080` and share the
     https://….trycloudflare.com address it gives you.
  C. Run `node server.js` on any Node host; it reads the PORT environment variable.

Parties: everyone on the same server/URL shares the public island. NEW PARTY gives you a code;
friends type it next to JOIN to get your own island (P in game opens the same panel).

Heroes: AP throws a backhand sun disc. Clark is a golf kid: up close his club slashes like a sword
(attack twice for a forehand + backhand combo), at range he stands side-on and drives a golf ball;
his bird no longer runs out of stamina. TMZ is a quarterback who throws spiralling passes overhand.
Freddie carries his anchor on his shoulder: he smashes with it up close, or hurls it on a rope to hook
monsters and drag them in; his boat sails on water, and on land it floats on a cloud.

---------------------------------------------------------
Credits
---------------------------------------------------------
3D characters: Quaternius "Ultimate Modular Men" (CC0) · enemies, car: KayKit by Kay Lousberg (CC0)
Island nature (trees, bushes, flowers, rocks): Quaternius "Stylized Nature MegaKit" (CC0) · camp props: Quaternius "Fantasy Props MegaKit" (CC0)
Code libraries: three.js (MIT), postprocessing (Zlib), N8AO (ISC), meshoptimizer (MIT), Trystero (MIT)
