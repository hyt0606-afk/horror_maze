/* =========================
   Horror Maze Online
   style.css
   Part 1
========================= */

:root{

--bg:#050505;
--panel:#111;
--panel2:#1b1b1b;

--text:#ffffff;

--red:#ff2d55;
--green:#00ff66;
--yellow:#ffd400;
--blue:#33bbff;

--border:#444;

--cell:48px;

}

/* ========================= */

*{

margin:0;
padding:0;
box-sizing:border-box;

}

body{

background:#000;
color:white;
font-family:Arial,sans-serif;

overflow:hidden;

user-select:none;

}

/* ========================= */

.hidden{

display:none!important;

}

/* ========================= */

button{

background:#222;

color:white;

border:2px solid #555;

padding:12px 20px;

border-radius:10px;

font-size:18px;

cursor:pointer;

transition:.2s;

}

button:hover{

background:#333;

transform:scale(1.05);

}

button:active{

transform:scale(.95);

}

/* ========================= */

input{

background:#111;

border:2px solid #555;

color:white;

padding:12px;

font-size:18px;

border-radius:10px;

outline:none;

width:220px;

}

/* ========================= */
/* Lobby */
/* ========================= */

#lobby{

position:absolute;

left:50%;

top:50%;

transform:translate(-50%,-50%);

width:360px;

background:#111;

padding:30px;

border-radius:15px;

border:2px solid #444;

text-align:center;

box-shadow:0 0 30px rgba(255,0,0,.15);

}

#lobby h1{

font-size:34px;

color:var(--red);

margin-bottom:10px;

}

#lobby p{

color:#bbb;

margin-bottom:25px;

}

#roomInfo{

margin-top:25px;

font-size:18px;

color:var(--green);

}

/* ========================= */
/* Waiting */
/* ========================= */

#waiting{

position:absolute;

left:50%;

top:50%;

transform:translate(-50%,-50%);

width:400px;

background:#111;

padding:30px;

border-radius:15px;

border:2px solid #444;

text-align:center;

}

#codeDisplay{

font-size:46px;

letter-spacing:8px;

margin:20px;

color:var(--yellow);

}

#playerList{

margin:25px 0;

min-height:120px;

}

/* ========================= */
/* HUD */
/* ========================= */

#hud{

position:absolute;

top:0;

left:0;

width:100%;

height:70px;

background:rgba(0,0,0,.55);

display:flex;

justify-content:space-around;

align-items:center;

backdrop-filter:blur(6px);

z-index:50;

}

#role{

color:#00ffff;

font-size:20px;

font-weight:bold;

}

#keys{

font-size:20px;

color:gold;

}

#timer{

font-size:28px;

color:#ff5555;

font-weight:bold;

}

/* ========================= */
/* Stamina */
/* ========================= */

#staminaBox{

width:180px;

height:20px;

background:#333;

border-radius:20px;

overflow:hidden;

border:2px solid #555;

}

#staminaBar{

height:100%;

width:100%;

background:linear-gradient(
90deg,
lime,
yellow,
red
);

transition:.15s;

}

/* ========================= */
/* Canvas */
/* ========================= */

#gameContainer{

position:absolute;

left:50%;

top:50%;

transform:translate(-50%,-50%);

}

#gameCanvas{

background:#0a0a0a;

border:4px solid #555;

box-shadow:

0 0 40px rgba(255,0,0,.2);

}

/* ========================= */
/* Result */
/* ========================= */

#result{

position:absolute;

left:50%;

top:50%;

transform:translate(-50%,-50%);

background:#111;

padding:40px;

border-radius:15px;

border:2px solid #555;

text-align:center;

z-index:999;

}

#resultTitle{

font-size:42px;

margin-bottom:30px;

}
/* =======================================
   Part 2：玩家、鬼、迷宮、動畫
======================================= */

/* 玩家 */

.player{
    position:absolute;
    width:40px;
    height:40px;
    border-radius:8px;
    transition:.1s linear;
    z-index:20;
}

.player.blue{
    background:#00aaff;
    box-shadow:0 0 15px #00ffff;
}

.player.orange{
    background:#ff7700;
    box-shadow:0 0 15px #ffaa00;
}

.player.purple{
    background:#aa00ff;
    box-shadow:0 0 15px #ff00ff;
}

.player.pink{
    background:#ff2299;
    box-shadow:0 0 15px #ff55cc;
}

/* 鬼 */

.ghost{

    position:absolute;

    width:42px;

    height:42px;

    background:#d40000;

    border-radius:50%;

    box-shadow:

    0 0 20px red,

    0 0 40px darkred;

    animation:

    ghostFloat 1.2s infinite alternate;

}

@keyframes ghostFloat{

from{

transform:translateY(0px);

}

to{

transform:translateY(-5px);

}

}

/* 鑰匙 */

.key{

width:22px;

height:22px;

background:gold;

border-radius:50%;

box-shadow:

0 0 15px yellow;

animation:keyGlow .8s infinite alternate;

}

@keyframes keyGlow{

from{

transform:scale(1);

}

to{

transform:scale(1.2);

}

}

/* 出口 */

.exit{

background:#00cc55;

box-shadow:

0 0 20px lime;

animation:exitBlink 1s infinite;

}

@keyframes exitBlink{

50%{

opacity:.45;

}

}

/* 牆壁 */

.wall{

background:#2d2d2d;

border:1px solid #3a3a3a;

}

/* 地板 */

.floor{

background:#111;

}

/* 黑暗 */

.darkness{

position:absolute;

left:0;

top:0;

width:100%;

height:100%;

pointer-events:none;

background:rgba(0,0,0,.65);

}

/* 手電筒 */

.flashlight{

position:absolute;

width:260px;

height:260px;

border-radius:50%;

pointer-events:none;

background:

radial-gradient(circle,

rgba(255,255,255,.15),

rgba(0,0,0,.92));

}

/* 血跡 */

.blood{

position:absolute;

width:30px;

height:30px;

background:#900;

border-radius:50%;

opacity:.6;

animation:bloodFade 6s linear forwards;

}

@keyframes bloodFade{

to{

opacity:0;

}

}

/* 玩家名稱 */

.nameTag{

position:absolute;

margin-top:-20px;

font-size:14px;

font-weight:bold;

text-shadow:

0 0 5px black;

}

/* 被鬼追 */

.scared{

animation:shake .15s infinite;

}

@keyframes shake{

0%{

transform:translateX(-2px);

}

50%{

transform:translateX(2px);

}

100%{

transform:translateX(-2px);

}

}
