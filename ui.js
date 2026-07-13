// =============================
// ui.js - 修復版本
// UI 和菜單系統
// =============================

const UIManager = {
    // 顯示難度選擇菜單
    showDifficultyMenu() {
        console.log('📊 顯示難度選擇菜單');
        try {
            const menu = document.getElementById('menu');
            const difficultyMenu = document.getElementById('difficultyMenu');
            const optionsDiv = document.getElementById('difficultyOptions');
            
            if (!optionsDiv) {
                console.error('❌ difficultyOptions 元素不存在');
                return;
            }
            
            // 清空之前的選項
            optionsDiv.innerHTML = '';
            
            // 生成難度按鈕
            for (const [difficulty, config] of Object.entries(DifficultyManager.difficulties)) {
                const info = DifficultyManager.getDifficultyInfo(difficulty);
                const button = document.createElement('button');
                button.className = 'difficulty-btn';
                button.innerHTML = `
                    <strong>${info.name}</strong><br/>
                    <small>${info.description}</small><br/>
                    <small>時間: ${info.time}秒 | 鑰匙: ${info.keys}</small>
                `;
                button.onclick = () => selectDifficulty(difficulty);
                optionsDiv.appendChild(button);
            }
            
            // 顯示菜單
            if (menu) menu.classList.add('hidden');
            difficultyMenu.classList.remove('hidden');
        } catch (error) {
            console.error('❌ 顯示難度菜單失敗:', error);
        }
    },
    
    // 顯示排行榜
    showLeaderboard() {
        const scores = typeof ScoreManager !== 'undefined' ? ScoreManager.getLeaderboard() : [];
        let html = '<h2>🏆 排行榜</h2>';
        html += '<table style="width: 100%; text-align: left;">';
        html += '<tr><th>排名</th><th>玩家</th><th>分數</th><th>難度</th></tr>';
        
        if (scores.length === 0) {
            html += '<tr><td colspan="4" style="text-align: center;">暫無記錄</td></tr>';
        } else {
            scores.forEach((score, index) => {
                html += `<tr>`;
                html += `<td>${index + 1}</td>`;
                html += `<td>${score.playerName}</td>`;
                html += `<td>${score.score}</td>`;
                html += `<td>${score.difficulty.toUpperCase()}</td>`;
                html += `</tr>`;
            });
        }
        
        html += '</table>';
        html += '<button onclick="location.reload()">返回菜單</button>';
        
        return html;
    },
    
    // 顯示遊戲設置
    showSettings() {
        let html = '<h2>⚙️ 設置</h2>';
        html += '<div style="text-align: left;">';
        
        if (typeof SoundManager !== 'undefined') {
            html += '<label>🔊 音效: <input type="checkbox" id="soundToggle" ' + (SoundManager.enabled ? 'checked' : '') + ' onchange="toggleSound()"/></label><br/>';
            html += '<label>音量: <input type="range" min="0" max="1" step="0.1" value="' + SoundManager.masterVolume + '" onchange="setVolume(this.value)"/></label><br/>';
        }
        
        html += '</div>';
        html += '<button onclick="location.reload()">返回菜單</button>';
        
        return html;
    },
    
    // 更新 HUD
    updateHUD(keysCollected, timeRemaining, stamina, staminaMax) {
        const staminaPercent = Math.floor((stamina / staminaMax) * 100);
        
        document.getElementById('keyCount').innerText = `🔑 ${keysCollected} / ${TOTAL_KEYS}`;
        document.getElementById('timer').innerText = `⏱️ ${Math.floor(timeRemaining / 60)}:${(timeRemaining % 60).toString().padStart(2, '0')}`;
        
        // 更新體力條
        if (document.getElementById("staminaBar")) {
            const bar = document.getElementById("staminaBar");
            bar.style.width = staminaPercent + '%';
            bar.style.backgroundColor = staminaPercent > 30 ? '#00FF00' : '#FF6600';
        }
    },
    
    // 顯示通知
    showNotification(message, duration = 3000) {
        console.log('💬 通知:', message);
        try {
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.style.cssText = `
                position: fixed;
                top: 90px;
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
        } catch (error) {
            console.error('❌ 顯示通知失敗:', error);
        }
    }
};

// 全局函數（從 HTML 調用）
function selectDifficulty(difficulty) {
    console.log('📍 選擇難度:', difficulty);
    try {
        if (typeof DifficultyManager !== 'undefined') {
            DifficultyManager.setDifficulty(difficulty);
        }
        initGame();
    } catch (error) {
        console.error('❌ 選擇難度失敗:', error);
    }
}

function toggleSound() {
    if (typeof SoundManager === 'undefined') return;
    const enabled = SoundManager.toggleSound();
    UIManager.showNotification(enabled ? '🔊 音效已開啟' : '🔇 音效已關閉');
}

function setVolume(level) {
    if (typeof SoundManager === 'undefined') return;
    SoundManager.setVolume(level);
}
