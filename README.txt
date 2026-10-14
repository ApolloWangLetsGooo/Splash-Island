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
  R 上下朋友的载具   C 直升机下降   1–6 换英雄   M 地图   F 拉杆   Enter 聊天   P 好友和组队   N 声音   H 隐藏操作说明
  手机：左下摇杆（推到底就是疾跑），右边按钮：Attack / Jump / Power / Ride / Down / Help

---------------------------------------------------------
六、六个英雄（按 1–6 切换）
---------------------------------------------------------
  AP       回旋太阳飞盘。E：太阳车，载 3 个朋友。
  Clark    高尔夫少年。近身：球杆像剑一样连斩；远处：侧身挥杆把球打出去。
           E：私人直升机（载 3 人），机头有机枪，点攻击就扫射。
  TMZ      四分卫，单手过肩传球；冲刺时按攻击 = 冲撞。
           E：球队大巴，载 7 个朋友（车里 3 个、车顶 4 个），能把怪物撞飞、撞开裂石门。
  Freddie  锚扛在肩上。近身抡锚；远处把锚甩出去勾住怪物拖回来。
           E：帆船，水上航行，上了陆地就浮在一朵云上继续开。
  小刚      寸头击剑手。攻击会冲刺弓步刺过去，连按是刺+挑；E：快攻冲刺，一路刺穿一排怪物。
  Tim      吟游诗人。敲法杖在地上放出冲击波，头顶会弹出 "bro like"；
           E：唱歌，附近所有朋友（包括自己）回血并且攻击力提升 8 秒。

---------------------------------------------------------
七、地图和锚点
---------------------------------------------------------
  按 M（手机点 MAP）打开大地图，滚轮或双指缩放、拖动移动。
  岛上有锚点石碑，走到旁边就解锁；在地图上点金色的锚就能传送过去。

---------------------------------------------------------
八、对战岛（Battle Isle）
---------------------------------------------------------
  第一座岛东边海岸、桥头附近有一根古老的拉杆。走过去按 F（手机点 RIDE）拉下它，
  会播放一段航拍：一座比第一座岛还大的新岛从海里升起来，桥也一起浮出水面。
  岛默认是沉在海里的（还没打开）。有人拉下拉杆时，当时在线的所有人会一起看这段航拍；之后才进游戏的人，进来时岛也会升起来。
  岛上有：英雄雕像大道、古罗马式斗兽场、废墟、灯塔、营地、训练木桩。
  斗兽场里玩家之间可以互相攻击，右上角有 KO 计分板；被打倒会在斗兽场门口复活。
  斗兽场里有观众（打中人、KO 时会欢呼跳起来）、贵宾包厢、遮阳帆、铁闸门、武器架和金色奖杯。
  岛的东边是一片沙漠，被一道巨大的沙丘挡着，沙丘顶上有被封印的古门和风沙；能爬上去看到沙漠，但还过不去（以后开放）。

  泰坦之穴（团队 Boss）：新岛东北山坡上有一个发光的山洞口（牌子写着 TITAN'S HOLLOW），走进去就到地下大厅。
  沙之泰坦血量随人数增加，会砸地（看到红圈快跑）、放沙浪（跳起来躲过）、召唤小怪。
  只有一个人时它的沙之护甲会挡掉大部分伤害，需要两人以上一起打。打败后 10 分钟后复活，参战的人都有奖励。
  从大厅南边的蓝色光环出去。

  另外：第一座岛的怪物被清掉后，5 分钟内不会再刷新。

---------------------------------------------------------
九、聊天
---------------------------------------------------------
  按 Enter 或 T（手机点 CHAT）打开聊天框，可以打字，也可以点快捷短语。
  消息会出现在左下角，并在你角色头顶冒泡。

---------------------------------------------------------
十、Freddie 的船
---------------------------------------------------------
  在陆地上是浮在云上的小帆船；一开进水里就变成黑帆海盗大帆船，能载 7 人，
  点攻击会朝最近的怪物打一轮舷炮。

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

Heroes (1-6): AP (sun disc, Sun Car), Clark (golf club; private helicopter with a chin gun), TMZ (quarterback;
Team Bus for 7 friends, sprint + attack to tackle), Freddie (anchor on a rope; boat that floats on a cloud over land),
Xiaogang (buzz-cut fencer: lunges in; E = fleche dash), Tim (bard: staff shockwave "bro like"; E = healing song).
Map: press M (scroll/pinch to zoom). Walk up to an anchor stone to unlock it, then click a gold anchor to travel. Sound is N.
Battle Isle: pull the old lever on the east shore (F) to raise a new, bigger island from the sea. Its colosseum is a
PvP arena with a cheering crowd and KO scoreboard; the desert beyond the great dune is sealed for now. Chat: Enter or T.
Titan's Hollow: a cave on the Battle Isle hills leads to the Sand Titan raid boss (needs 2+ players). Monsters stay dead for 5 minutes.
Freddie's boat becomes a black-sailed galleon on open water (7 seats, broadside cannons).

---------------------------------------------------------
Credits
---------------------------------------------------------
3D characters: Quaternius "Ultimate Modular Men" (CC0) · enemies, car: KayKit by Kay Lousberg (CC0)
Island nature (trees, bushes, flowers, rocks): Quaternius "Stylized Nature MegaKit" (CC0) · camp props: Quaternius "Fantasy Props MegaKit" (CC0)
Code libraries: three.js (MIT), postprocessing (Zlib), N8AO (ISC), meshoptimizer (MIT), Trystero (MIT)
