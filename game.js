// =============================
// Horror Maze Online
// game.js - 優化版本
// =============================

// Canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d", { alpha: false });

// 遊戲狀態
let gameRunning = false;
let keysCollected = 0;
let gameTime = GAME_TIME;

// 初始化
function initGame() {
    createMaze();
    createPlayer();
    createGhost();
    createItems();
    
    keysCollected = 0;
    gameTime = GAME_TIME;
    
    updateHUD();
    
    gameRunning = true;

    document.getElementById("menu").classList.add("hidden");
    document.getElementById("hud").classList.remove("hidden");
    document.getElementById("gameArea").classList.remove("hidden");
    
    // 初始化性能監控
    PerformanceMonitor.init();
    DrawOptimizer.init();
    InputHandler.init();

    requestAnimationFrame(gameLoop);
}

// 主迴圈（優化版）
let lastFrameTime = 0;
function gameLoop(currentTime) {
    if (!gameRunning) return;
    
    PerformanceMonitor.recordFrame();
    
    // 固定時間步進（可選）
    const deltaTime = currentTime - lastFrameTime;
    lastFrameTime = currentTime;
    
    PerformanceMonitor.measure('update', () => update());
    PerformanceMonitor.measure('draw', () => draw());

    requestAnimationFrame(gameLoop);
}

// 更新遊戲邏輯
function update() {
    if (!gameRunning) return;
    
    updatePlayer();
    updateGhost();
    updateItems();
    updateTimer();
}

// 繪製遊戲
function draw() {
    // 使用離屏 canvas 優化繪製
    const offscreenCtx = DrawOptimizer.getOffscreenContext();
    DrawOptimizer.clear();
    
    drawMaze(offscreenCtx);
    drawItems(offscreenCtx);
    drawPlayer(offscreenCtx);
    drawGhost(offscreenCtx);
    drawLighting(offscreenCtx);
    
    // 複製到主 canvas
    DrawOptimizer.copyToMain(ctx);
}

// HUD 更新
function updateHUD() {
    document.getElementById("keyCount").innerText =
        `🔑 ${keysCollected} / ${TOTAL_KEYS}`;
}

// 計時器更新
function updateTimer() {
    if (gameTime > 0) {
        gameTime--;
    } else {
        gameOver(RESULT_GAME_OVER);
    }

    let min = Math.floor(gameTime / 60);
    let sec = gameTime % 60;

    document.getElementById("timer").innerText =
        `${min}:${sec.toString().padStart(2, "0")}`;
}

// 遊戲結束
function gameOver(text) {
    gameRunning = false;

    document.getElementById("gameOver")
        .classList.remove("hidden");

    document.getElementById("resultText")
        .innerText = text;
}

// 事件監聽（優化版 - 統一管理）
document.getElementById("singleBtn")
    .addEventListener("click", initGame);

document.getElementById("restartBtn")
    .addEventListener("click", () => {
        location.reload();
    });