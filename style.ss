/* =========================
   Horror Maze Online
   style.css
========================= */

/* ===== 基本設定 ===== */

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{

    background:#000;

    color:#fff;

    font-family:Arial, Helvetica, sans-serif;

    overflow:hidden;

    user-select:none;

}

.hidden{

    display:none;

}

/* ===== 主選單 ===== */

#menu{

    position:absolute;

    left:50%;

    top:50%;

    transform:translate(-50%,-50%);

    width:360px;

    background:#111;

    border:2px solid #444;

    border-radius:15px;

    padding:30px;

    text-align:center;

    box-shadow:0 0 30px rgba(255,0,0,.25);

}

#menu h1{

    color:#ff3333;

    margin-bottom:10px;

    text-shadow:0 0 10px red;

}

#menu p{

    color:#bbb;

    margin-bottom:25px;

}

#playerName{

    width:100%;

    padding:12px;

    font-size:18px;

    border-radius:10px;

    border:2px solid #555;

    background:#222;

    color:white;

}

button{

    margin:8px;

    padding:12px 22px;

    font-size:18px;

    border:none;

    border-radius:10px;

    cursor:pointer;

    background:#222;

    color:white;

    transition:.2s;

}

button:hover{

    background:#444;

    transform:scale(1.05);

}

button:active{

    transform:scale(.95);

}

/* ===== HUD ===== */

#hud{

    position:absolute;

    top:0;

    left:0;

    width:100%;

    height:60px;

    display:flex;

    justify-content:space-around;

    align-items:center;

    background:rgba(0,0,0,.7);

    border-bottom:2px solid #333;

    z-index:20;

}

#role{

    color:#00ffff;

    font-weight:bold;

}

#keyCount{

    color:gold;

    font-weight:bold;

}

#timer{

    color:#ff4444;

    font-size:22px;

    font-weight:bold;

}

/* ===== 遊戲畫面 ===== */

#gameArea{

    width:100vw;

    height:100vh;

    display:flex;

    justify-content:center;

    align-items:center;

}

#gameCanvas{

    background:#0a0a0a;

    border:3px solid #555;

    box-shadow:0 0 30px rgba(255,0,0,.25);

}

/* ===== Game Over ===== */

#gameOver{

    position:absolute;

    left:50%;

    top:50%;

    transform:translate(-50%,-50%);

    width:340px;

    padding:30px;

    text-align:center;

    background:#111;

    border-radius:15px;

    border:2px solid #700;

    box-shadow:0 0 40px red;

    animation:popup .3s;

}

#resultText{

    margin-bottom:25px;

    color:#ff3333;

}

/* ===== 手機控制 ===== */

#mobileUI{

    position:fixed;

    left:0;

    bottom:0;

    width:100%;

    padding:20px;

    display:flex;

    justify-content:space-between;

    align-items:flex-end;

}

#joystick{

    width:120px;

    height:120px;

    border-radius:50%;

    background:rgba(255,255,255,.08);

    border:2px solid rgba(255,255,255,.2);

}

#runBtn,
#flashBtn,
#actionBtn{

    width:70px;

    height:70px;

    border-radius:50%;

    font-size:28px;

    background:#333;

}

/* ===== 動畫 ===== */

@keyframes popup{

    from{

        opacity:0;

        transform:translate(-50%,-60%) scale(.8);

    }

    to{

        opacity:1;

        transform:translate(-50%,-50%) scale(1);

    }

}

@keyframes flicker{

    0%{opacity:1;}

    20%{opacity:.85;}

    40%{opacity:1;}

    60%{opacity:.75;}

    80%{opacity:1;}

    100%{opacity:.9;}

}

#gameCanvas{

    animation:flicker 4s infinite;

}

/* ===== 響應式 ===== */

@media (max-width:768px){

#menu{

    width:90%;

}

#gameCanvas{

    width:95vw;

    height:95vw;

}

#mobileUI{

    display:flex;

}

}

@media (min-width:769px){

#mobileUI{

    display:none;

}

}
