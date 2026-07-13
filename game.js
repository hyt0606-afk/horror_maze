// =============================
// game.js - 完全修復版本
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
    try {
        // 清空動畫
        if (typeof AnimationManager !== 'undefined') {
            AnimationManager.clear();
        }
        
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
        document.getElementById("difficultyMenu").classList.add("hidden");
        document.getElementById("hud").classList.remove("hidden");
        document.getElementById("gameArea").classList.remove("hidden");
        
        // 初始化系統
        if (typeof PerformanceMonitor !== 'undefined') {
            PerformanceMonitor.init();
        }
        if (typeof DrawOptimizer !== 'undefined') {
            DrawOptimizer.init();
        }
        if (typeof InputHandler !== 'undefined') {
            InputHandler.init();
        }
        if (typeof JoystickManager !== 'undefined') {
            JoystickManager.init();
        }
        if (typeof SoundManager !== 'undefined') {
            SoundManager.init();
        }
        
        console.log('✅ 遊戲初始化成功，難度：' + (DifficultyManager?.currentDifficulty || 'normal'));

        requestAnimationFrame(gameLoop);
    } catch (error) {
        console.error('❌ 遊戲初始化失敗:', error);
        alert('遊戲初始化失敗：' + error.message);
    }
}

// 主迴圈（優化版）
let lastFrameTime = 0;
function gameLoop(currentTime) {
    if (!gameRunning) return;
    
    if (typeof PerformanceMonitor !== 'undefined') {
        PerformanceMonitor.recordFrame();
    }
    
    // 計算 Delta Time
    const deltaTime = (currentTime - lastFrameTime) / 1000;
    lastFrameTime = currentTime;
    
    // 執行更新和繪製
    try {
        if (typeof PerformanceMonitor !== 'undefined') {
            PerformanceMonitor.measure('update', () => update(deltaTime));
            PerformanceMonitor.measure('draw', () => draw());
        } else {
            update(deltaTime);
            draw();
        }
    } catch (error) {
        console.error('❌ 遊戲迴圈錯誤:', error);
    }

    requestAnimationFrame(gameLoop);
}

// 更新遊戲邏輯
function update(deltaTime) {
    if (!gameRunning) return;
    
    try {
        updatePlayer();
        updateGhost();
        updateItems();
        updateTimer();
        
        if (typeof updateGhostWarning !== 'undefined') {
            updateGhostWarning();
        }
        if (typeof AnimationManager !== 'undefined') {
            AnimationManager.updateParticles();
            AnimationManager.updateAnimations();
        }
        
        // 發送網路更新
        if (typeof NetworkManager !== 'undefined' && NetworkManager.connected) {
            NetworkManager.sendPlayerPosition(player.x, player.y);
        }
    } catch (error) {
        console.error('❌ 更新錯誤:', error);
    }
}

// 繪製遊戲
function draw() {
    try {
        // 使用離屏 canvas 優化渲染
        if (typeof DrawOptimizer !== 'undefined' && DrawOptimizer.offscreenCanvas) {
            const offscreenCtx = DrawOptimizer.getOffscreenContext();
            DrawOptimizer.clear();
            
            // 繪製遊戲元素
            drawMaze(offscreenCtx);
            drawItems(offscreenCtx);
            drawPlayer(offscreenCtx);
            
            if (typeof drawRemotePlayers !== 'undefined') {
                drawRemotePlayers(offscreenCtx); // 遠端玩家
            }
            
            drawGhost(offscreenCtx);
            
            // 繪製動畫
            if (typeof AnimationManager !== 'undefined') {
                AnimationManager.drawParticles(offscreenCtx);
                AnimationManager.drawFloatingText(offscreenCtx);
            }
            
            // 繪製照明（必須最後）
            drawLighting(offscreenCtx);
            
            // 繪製傷害閃爍
            if (typeof AnimationManager !== 'undefined') {
                AnimationManager.drawDamageFlash(offscreenCtx);
            }
            
            // 複製到主 canvas
            DrawOptimizer.copyToMain(ctx);
        } else {
            // 降級方案：直接使用主 canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawMaze(ctx);
            drawItems(ctx);
            drawPlayer(ctx);
            drawGhost(ctx);
            drawLighting(ctx);
        }
    } catch (error) {
        console.error('❌ 繪製錯誤:', error);
    }
}

// HUD 更新
function updateHUD() {
    try {
        document.getElementById("keyCount").innerText =
            `🔑 ${keysCollected} / ${TOTAL_KEYS}`;
        
        // 更新體力條（如果存在）
        if (document.getElementById("staminaBar")) {
            const staminaPercent = (player.stamina / player.maxStamina) * 100;
            const bar = document.getElementById("staminaBar");
            bar.style.width = staminaPercent + '%';
            bar.style.backgroundColor = staminaPercent > 30 ? '#00FF00' : '#FF6600';
        }
    } catch (error) {
        console.error('❌ HUD 更新錯誤:', error);
    }
}

// 計時器更新
function updateTimer() {
    if (gameTime > 0) {
        gameTime--;
    } else {
        gameOver(RESULT_GAME_OVER);
        if (typeof SoundManager !== 'undefined') {
            SoundManager.playGameOver();
        }
    }

    let min = Math.floor(gameTime / 60);
    let sec = gameTime % 60;

    document.getElementById("timer").innerText =
        `⏱️ ${min}:${sec.toString().padStart(2, "0")}`;
}

// 遊戲結束
function gameOver(text) {
    gameRunning = false;
    
    try {
        // 計算分數
        let score = 0;
        if (typeof DifficultyManager !== 'undefined') {
            score = DifficultyManager.calculateScore(
                gameTime,
                keysCollected,
                DifficultyManager.currentDifficulty
            );
            
            // 保存分數
            const playerName = document.getElementById("playerName").value || 'Anonymous';
            if (typeof ScoreManager !== 'undefined') {
                ScoreManager.saveScore(playerName, score, DifficultyManager.currentDifficulty);
            }
        }
        
        document.getElementById("gameOver").classList.remove("hidden");
        document.getElementById("resultText").innerText = text;
        
        // 顯示分數
        if (score > 0) {
            const scoreDisplay = document.createElement('div');
            scoreDisplay.id = "scoreDisplay";
            scoreDisplay.innerText = `分數: ${score}`;
            document.getElementById("gameOver").appendChild(scoreDisplay);
        }
        
        // 發送網路通知
        if (typeof NetworkManager !== 'undefined' && NetworkManager.connected) {
            NetworkManager.sendGameOver(text);
        }
    } catch (error) {
        console.error('❌ 遊戲結束處理錯誤:', error);
    }
}

// 頁面加載完成後初始化
window.addEventListener('DOMContentLoaded', function() {
    console.log('📄 頁面加載完成');
    
    // 綁定單人遊戲按鈕
    const singleBtn = document.getElementById("singleBtn");
    if (singleBtn) {
        singleBtn.addEventListener("click", function() {
            console.log('🎮 點擊單人遊戲');
            // 直接開始遊戲（默認難度 normal）
            if (typeof DifficultyManager !== 'undefined') {
                DifficultyManager.setDifficulty('normal');
            }
            initGame();
        });
    }

    // 綁定重新開始按鈕
    const restartBtn = document.getElementById("restartBtn");
    if (restartBtn) {
        restartBtn.addEventListener("click", () => {
            location.reload();
        });
    }
    
    console.log('✅ 事件監聽器綁定完成');
});
