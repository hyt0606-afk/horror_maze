// =============================
// input-handler.js
// 統一輸入處理
// =============================

const InputHandler = {
    // 按鍵狀態
    keys: {},
    
    // 初始化
    init() {
        document.addEventListener('keydown', (e) => this.onKeyDown(e));
        document.addEventListener('keyup', (e) => this.onKeyUp(e));
    },
    
    // 按鍵按下
    onKeyDown(e) {
        this.keys[e.key.toLowerCase()] = true;
        
        // 方向鍵移動
        switch (e.key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                player.direction = 'up';
                movePlayer(0, -1);
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                player.direction = 'down';
                movePlayer(0, 1);
                break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
                player.direction = 'left';
                movePlayer(-1, 0);
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                player.direction = 'right';
                movePlayer(1, 0);
                break;
        }
        
        // Shift 奔跑
        if ((e.key === 'Shift') && player.stamina > 0) {
            player.running = true;
        }
        
        // F 切換手電筒
        if (e.key.toLowerCase() === 'f') {
            toggleFlashlight();
        }
    },
    
    // 按鍵釋放
    onKeyUp(e) {
        this.keys[e.key.toLowerCase()] = false;
        
        if (e.key === 'Shift') {
            player.running = false;
        }
    },
    
    // 檢查按鍵狀態
    isKeyPressed(key) {
        return this.keys[key.toLowerCase()] === true;
    }
};