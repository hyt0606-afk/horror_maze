// =============================
// Horror Maze Online
// game.js
// =============================

// Canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// 地圖設定
const TILE_SIZE = 48;
const MAP_WIDTH = 15;
const MAP_HEIGHT = 15;

// 遊戲狀態
let gameRunning = false;
let keysCollected = 0;
let totalKeys = 5;
let gameTime = 600; // 秒

// 初始化
function initGame(){

    createMaze();

    createPlayer();

    createGhost();
    
    createItems();
    
    gameRunning = true;

    document.getElementById("menu").classList.add("hidden");
    document.getElementById("hud").classList.remove("hidden");
    document.getElementById("gameArea").classList.remove("hidden");

    requestAnimationFrame(gameLoop);

}

// 主迴圈
function gameLoop(){

    if(!gameRunning) return;

    update();

    draw();

    requestAnimationFrame(gameLoop);

}

// 更新
function update(){

    updatePlayer();

    updateGhost();

    updateItems();

}

// 繪圖
function draw(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

drawMaze(ctx);

drawItems(ctx);

drawPlayer(ctx);

drawGhost(ctx);

}

// HUD
function updateHUD(){

    document.getElementById("keyCount").innerText =
        "🔑 " + keysCollected + " / " + totalKeys;

}

// 計時
function updateTimer(){

    if(gameTime>0){

        gameTime--;

    }

    let min = Math.floor(gameTime/60);
    let sec = gameTime%60;

    document.getElementById("timer").innerText =
        `${min}:${sec.toString().padStart(2,"0")}`;

}

// 結束
function gameOver(text){

    gameRunning = false;

    document.getElementById("gameOver")
        .classList.remove("hidden");

    document.getElementById("resultText")
        .innerText = text;

}

// 開始按鈕
document.getElementById("singleBtn")
.addEventListener("click",initGame);

// 重新開始
document.getElementById("restartBtn")
.addEventListener("click",()=>{

    location.reload();

});
