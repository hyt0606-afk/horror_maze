// =============================
// Horror Maze Online
// game.js - 完整工作版本
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

// 初始化遊戲
function initGame() {
    console.log('🎮 正在初始化遊戲...');
    
    try {
        // 重置遊戲狀態
        gameRunning = false;
        keysCollected = 0;
        gameTime = 600;
        
        // 建立遊戲元素
        createMaze();
        createPlayer();
        createGhost();
        createItems();
        
        // 更新 HUD
        updateHUD();
        
        // 更新 UI
        document.getElementById("menu").classList.add("hidden");
        document.getElementById("hud").classList.remove("hidden");
        document.getElementById("gameArea").classList.remove("hidden");
        document.getElementById("gameOver").classList.add("hidden");
        
        // 啟動遊戲
        gameRunning = true;
        console.log('✅ 遊戲初始化成功');
        
        // 啟動主迴圈
        requestAnimationFrame(gameLoop);
    } catch (error) {
        console.error('❌ 遊戲初始化失敗:', error);
        alert('遊戲初始化失敗：' + error.message);
    }
}

// 主遊戲迴圈
function gameLoop() {
    if (!gameRunning) return;
    
    update();
    draw();
    
    requestAnimationFrame(gameLoop);
}

// 遊戲更新邏輯
function update() {
    if (!gameRunning) return;
    
    try {
        updatePlayer();
        updateGhost();
        updateItems();
        updateTimer();
    } catch (error) {
        console.error('❌ 遊戲更新錯誤:', error);
    }
}

// 遊戲繪製
function draw() {
    try {
        // 清空畫布
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 繪製所有元素
        drawMaze(ctx);
        drawItems(ctx);
        drawPlayer(ctx);
        drawGhost(ctx);
        drawLighting(ctx);
    } catch (error) {
        console.error('❌ 遊戲繪製錯誤:', error);
    }
}

// 更新 HUD
function updateHUD() {
    try {
        document.getElementById("keyCount").innerText =
            "🔑 " + keysCollected + " / " + totalKeys;
    } catch (error) {
        console.error('❌ HUD 更新錯誤:', error);
    }
}

// 計時器更新
function updateTimer() {
    if (gameTime > 0) {
        gameTime--;
    } else {
        gameOver("💀 時間到了！");
        return;
    }

    let min = Math.floor(gameTime / 60);
    let sec = gameTime % 60;

    document.getElementById("timer").innerText =
        `${min}:${sec.toString().padStart(2, "0")}`;
}

// 遊戲結束
function gameOver(text) {
    gameRunning = false;
    
    console.log('🏁 遊戲結束:', text);
    
    try {
        document.getElementById("gameOver").classList.remove("hidden");
        document.getElementById("resultText").innerText = text;
        
        // 顯示分數
        let score = keysCollected * 100 + Math.max(0, gameTime * 10);
        document.getElementById("scoreDisplay").innerText = "分數: " + score;
    } catch (error) {
        console.error('❌ 遊戲結束處理錯誤:', error);
    }
}

// 頁面加載完成後初始化
window.addEventListener('DOMContentLoaded', function() {
    console.log('📄 頁面加載完成');
    
    // 綁定開始遊戲按鈕
    const singleBtn = document.getElementById("singleBtn");
    if (singleBtn) {
        singleBtn.addEventListener("click", function() {
            console.log('🎮 點擊單人遊戲按鈕');
            initGame();
        });
        console.log('✅ 單人遊戲按鈕綁定完成');
    } else {
        console.error('❌ 找不到單人遊戲按鈕');
    }
    
    // 綁定重新開始按鈕
    const restartBtn = document.getElementById("restartBtn");
    if (restartBtn) {
        restartBtn.addEventListener("click", function() {
            console.log('🔄 重新開始遊戲');
            location.reload();
        });
        console.log('✅ 重新開始按鈕綁定完成');
    }
    
    console.log('✅ 頁面初始化完成');
});
