// =============================
// difficulty.js
// 難度系統
// =============================

const DifficultyManager = {
    // 難度等級
    currentDifficulty: 'normal',
    
    // 難度配置
    difficulties: {
        easy: {
            gameTime: 900,         // 15 分鐘
            ghostMoveInterval: 30, // 鬼移動速度較慢
            ghostChaseRange: 3,    // 追逐範圍較小
            totalKeys: 3,
            spawnRadius: 10        // 鑰匙生成範圍
        },
        normal: {
            gameTime: 600,         // 10 分鐘
            ghostMoveInterval: 20,
            ghostChaseRange: 5,
            totalKeys: 5,
            spawnRadius: 7
        },
        hard: {
            gameTime: 300,         // 5 分鐘
            ghostMoveInterval: 15, // 鬼移動速度較快
            ghostChaseRange: 8,    // 追逐範圍較大
            totalKeys: 7,
            spawnRadius: 5
        },
        nightmare: {
            gameTime: 180,         // 3 分鐘
            ghostMoveInterval: 10, // 非常快
            ghostChaseRange: 10,   // 非常大
            totalKeys: 10,
            spawnRadius: 3
        }
    },
    
    // 設置難度
    setDifficulty(difficulty) {
        if (this.difficulties[difficulty]) {
            this.currentDifficulty = difficulty;
            const config = this.difficulties[difficulty];
            
            // 應用難度配置
            GAME_TIME = config.gameTime;
            GHOST_MOVE_INTERVAL = config.ghostMoveInterval;
            GHOST_CHASE_RANGE = config.ghostChaseRange;
            TOTAL_KEYS = config.totalKeys;
            
            console.log(`難度設置為: ${difficulty}`);
            return config;
        }
        return null;
    },
    
    // 獲取當前難度配置
    getCurrentConfig() {
        return this.difficulties[this.currentDifficulty];
    },
    
    // 獲取難度資訊
    getDifficultyInfo(difficulty) {
        const config = this.difficulties[difficulty];
        return {
            name: difficulty.toUpperCase(),
            time: config.gameTime,
            keys: config.totalKeys,
            ghostSpeed: `${31 - config.ghostMoveInterval}x`,
            description: this.getDescription(difficulty)
        };
    },
    
    // 獲取難度描述
    getDescription(difficulty) {
        const descriptions = {
            easy: '適合新手，充足的時間和較慢的鬼',
            normal: '標準難度，平衡的挑戰',
            hard: '高難度，快速的鬼和短時間',
            nightmare: '地獄難度，幾乎不可能的挑戰'
        };
        return descriptions[difficulty] || '未知難度';
    },
    
    // 計算得分
    calculateScore(timeRemaining, keysCollected, difficulty) {
        const config = this.difficulties[difficulty];
        const difficultyMultiplier = {
            easy: 0.5,
            normal: 1,
            hard: 2,
            nightmare: 5
        };
        
        const baseScore = timeRemaining * 10 + keysCollected * 100;
        return Math.floor(baseScore * difficultyMultiplier[difficulty]);
    }
};

// 高分記錄
const ScoreManager = {
    // 本地存儲鍵
    storageKey: 'horror_maze_scores',
    maxScores: 10,
    
    // 加載高分
    loadScores() {
        const saved = localStorage.getItem(this.storageKey);
        return saved ? JSON.parse(saved) : [];
    },
    
    // 保存分數
    saveScore(playerName, score, difficulty, date = new Date()) {
        const scores = this.loadScores();
        scores.push({
            playerName,
            score,
            difficulty,
            date: date.toISOString()
        });
        
        // 排序並保留最高分數
        scores.sort((a, b) => b.score - a.score);
        scores.splice(this.maxScores);
        
        localStorage.setItem(this.storageKey, JSON.stringify(scores));
        return scores;
    },
    
    // 獲取排行榜
    getLeaderboard() {
        return this.loadScores().slice(0, this.maxScores);
    },
    
    // 清空記錄
    clearScores() {
        localStorage.removeItem(this.storageKey);
    },
    
    // 檢查是否是新高分
    isNewHighScore(score) {
        const scores = this.loadScores();
        if (scores.length < this.maxScores) return true;
        return score > scores[scores.length - 1].score;
    }
};
