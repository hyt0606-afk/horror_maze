// =============================
// ui.js
// UI 和菜單系統
// =============================

const UIManager = {
    // 顯示難度選擇菜單
    showDifficultyMenu() {
        const menu = document.getElementById('menu');
        let html = '<h1>👻 Horror Maze Online</h1>';
        html += '<p>選擇難度</p>';
        html += '<div style="margin: 20px 0;">';
        
        for (const [difficulty, config] of Object.entries(DifficultyManager.difficulties)) {
            const info = DifficultyManager.getDifficultyInfo(difficulty);
            html += `<button onclick="selectDifficulty('${difficulty}')" style="display: block; width: 100%; margin: 10px 0;">`;
            html += `<strong>${info.name}</strong><br/>`;
            html += `<small>${info.description}</small>`;
            html += `</button>`;
        }
        
        html += '</div>';
        menu.innerHTML = html;
    },
    
    // 顯示排行榜
    showLeaderboard() {
        const scores = ScoreManager.getLeaderboard();
        let html = '<h2>🏆 排行榜</h2>';
        html += '<table style="width: 100%; text-align: left;">';
        html += '<tr><th>排名</th><th>玩家</th><th>分數</th><th>難度</th></tr>';
        
        scores.forEach((score, index) => {
            html += `<tr>`;
            html += `<td>${index + 1}</td>`;
            html += `<td>${score.playerName}</td>`;
            html += `<td>${score.score}</td>`;
            html += `<td>${score.difficulty.toUpperCase()}</td>`;
            html += `</tr>`;
        });
        
        html += '</table>';
        html += '<button onclick="location.reload()">返回菜單</button>';
        
        return html;
    },
    
    // 顯示遊戲設置
    showSettings() {
        let html = '<h2>⚙️ 設置</h2>';
        html += '<div style="text-align: left;">';
        html += '<label>音效: <input type="checkbox" id="soundToggle" ' + (SoundManager.enabled ? 'checked' : '') + ' onchange="toggleSound()"/></label><br/>';
        html += '<label>音量: <input type="range" min="0" max="1" step="0.1" value="' + SoundManager.masterVolume + '" onchange="setVolume(this.value)"/></label><br/>';
        html += '<label>困難模式: <input type="checkbox" id="hardcoreToggle" onchange="toggleHardcore()"/></label><br/>';
        html += '</div>';
        html += '<button onclick="location.reload()">返回菜單</button>';
        
        return html;
    },
    
    // 更新 HUD
    updateHUD(keysCollected, timeRemaining, stamina, staminaMax) {
        const staminaPercent = Math.floor((stamina / staminaMax) * 100);
        const staminaColor = staminaPercent > 30 ? '#00FF00' : '#FF6600';
        
        document.getElementById('keyCount').innerText = `🔑 ${keysCollected} / ${TOTAL_KEYS}`;
        document.getElementById('timer').innerText = `⏱️ ${Math.floor(timeRemaining / 60)}:${(timeRemaining % 60).toString().padStart(2, '0')}`;
        
        // 體力條
        const staminaBar = document.getElementById('staminaBar');
        if (staminaBar) {
            staminaBar.style.width = staminaPercent + '%';
            staminaBar.style.backgroundColor = staminaColor;
        }
    },
    
    // 顯示通知
    showNotification(message, duration = 3000) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.9);
            color: #FFF;
            padding: 15px 30px;
            border-radius: 10px;
            border: 2px solid #00FF00;
            z-index: 1000;
            animation: slideDown 0.3s ease;
        `;
        notification.innerText = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, duration);
    }
};

// 全局函數（從 HTML 調用）
function selectDifficulty(difficulty) {
    DifficultyManager.setDifficulty(difficulty);
    initGame();
}

function toggleSound() {
    const enabled = SoundManager.toggleSound();
    UIManager.showNotification(enabled ? '🔊 音效已開啟' : '🔇 音效已關閉');
}

function setVolume(level) {
    SoundManager.setVolume(level);
}

function toggleHardcore() {
    // 實現困難模式邏輯
}
