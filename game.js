// =============================
// game.js - 完整優化版本
// Horror Maze Online
// =============================

// Canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d", { alpha: false });

// 遊戲狀態
let gameRunning = false;
let keysCollected = 0;
let gameTime = GAME_TIME;
let lastUpdateTime = Date.now();

// 初始化
function initGame() {
    // 清空動畫
    AnimationManager.clear();
    
    // 重置遊戲狀態
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
    
    // 初始化系統
    PerformanceMonitor.init();
    DrawOptimizer.init();
    InputHandler.init();
    JoystickManager.init();
    SoundManager.init();
    
    // 顯示遊戲開始通知
    UIManager.showNotification('🎮 遊戲開始！');

    requestAnimationFrame(gameLoop);
}

// 主迴圈（優化版）
let lastFrameTime = 0;
function gameLoop(currentTime) {
    if (!gameRunning) return;
    
    PerformanceMonitor.recordFrame();
    
    // 計算 Delta Time
    const deltaTime = (currentTime - lastFrameTime) / 1000;
    lastFrameTime = currentTime;
    
    // 執行更新和繪製
    PerformanceMonitor.measure('update', () => update(deltaTime));
    PerformanceMonitor.measure('draw', () => draw());

    requestAnimationFrame(gameLoop);
}

// 更新遊戲邏輯
function update(deltaTime) {
    if (!gameRunning) return;
    
    updatePlayer();
    updateGhost();
    updateItems();
    updateTimer();
    updateGhostWarning();
    AnimationManager.updateParticles();
    AnimationManager.updateAnimations();
    
    // 發送網路更新
    if (NetworkManager.connected) {
        NetworkManager.sendPlayerPosition(player.x, player.y);
    }
}

// 繪製遊戲
function draw() {
    // 使用離屏 canvas 優化渲染
    const offscreenCtx = DrawOptimizer.getOffscreenContext();
    DrawOptimizer.clear();
    
    // 繪製遊戲元素
    drawMaze(offscreenCtx);
    drawItems(offscreenCtx);
    drawPlayer(offscreenCtx);
    drawRemotePlayers(offscreenCtx); // 遠端玩家
    drawGhost(offscreenCtx);
    
    // 繪製動畫
    AnimationManager.drawParticles(offscreenCtx);
    AnimationManager.drawFloatingText(offscreenCtx);
    
    // 繪製照明（必須最後）
    drawLighting(offscreenCtx);
    
    // 繪製傷害閃爍
    AnimationManager.drawDamageFlash(offscreenCtx);
    
    // 複製到主 canvas
    DrawOptimizer.copyToMain(ctx);
}

// HUD 更新
function updateHUD() {
    document.getElementById("keyCount").innerText =
        `🔑 ${keysCollected} / ${TOTAL_KEYS}`;
    
    // 更新體力條（如果存在）
    if (document.getElementById("staminaBar")) {
        const staminaPercent = (player.stamina / player.maxStamina) * 100;
        const bar = document.getElementById("staminaBar");
        bar.style.width = staminaPercent + '%';
        bar.style.backgroundColor = staminaPercent > 30 ? '#00FF00' : '#FF6600';
    }
}

// 計時器更新
function updateTimer() {
    if (gameTime > 0) {
        gameTime--;
    } else {
        gameOver(RESULT_GAME_OVER);
        SoundManager.playGameOver();
    }

    let min = Math.floor(gameTime / 60);
    let sec = gameTime % 60;

    document.getElementById("timer").innerText =
        `⏱️ ${min}:${sec.toString().padStart(2, "0")}`;
}

// 遊戲結束
function gameOver(text) {
    gameRunning = false;
    
    // 計算分數
    const score = DifficultyManager.calculateScore(
        gameTime,
        keysCollected,
        DifficultyManager.currentDifficulty
    );
    
    // 保存分數
    const playerName = document.getElementById("playerName").value || 'Anonymous';
    ScoreManager.saveScore(playerName, score, DifficultyManager.currentDifficulty);

    document.getElementById("gameOver").classList.remove("hidden");
    document.getElementById("resultText").innerText = text;
    
    // 顯示分數
    const scoreDisplay = document.createElement('div');
    scoreDisplay.id = "scoreDisplay";
    scoreDisplay.innerText = `分數: ${score}`;
    document.getElementById("gameOver").appendChild(scoreDisplay);
    
    // 發送網路通知
    if (NetworkManager.connected) {
        NetworkManager.sendGameOver(text);
    }
}

// 事件監聽
document.getElementById("singleBtn")
    .addEventListener("click", () => {
        UIManager.showDifficultyMenu();
    });

document.getElementById("restartBtn")
    .addEventListener("click", () => {
        location.reload();
    });
