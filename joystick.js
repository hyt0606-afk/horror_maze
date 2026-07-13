// =============================
// joystick.js - 優化版本
// 手機虛擬搖桿
// =============================

const JoystickManager = {
    // 搖桿狀態
    touching: false,
    lastTouchTime: 0,
    touchDebounce: 50, // 毫秒
    
    // 初始化
    init() {
        const joystick = document.getElementById("joystick");
        
        if (!joystick) return;
        
        joystick.addEventListener("touchstart", (e) => this.onTouchStart(e));
        joystick.addEventListener("touchend", (e) => this.onTouchEnd(e));
        joystick.addEventListener("touchmove", (e) => this.onTouchMove(e));
    },
    
    // 觸摸開始
    onTouchStart(e) {
        this.touching = true;
    },
    
    // 觸摸結束
    onTouchEnd(e) {
        this.touching = false;
    },
    
    // 觸摸移動
    onTouchMove(e) {
        if (!this.touching) return;
        
        // 防抖
        const now = Date.now();
        if (now - this.lastTouchTime < this.touchDebounce) return;
        this.lastTouchTime = now;
        
        const joystick = document.getElementById("joystick");
        const rect = joystick.getBoundingClientRect();
        
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const dx = x - centerX;
        const dy = y - centerY;
        
        // 死區設定
        const deadZone = 20;
        
        // 上下左右判定
        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > deadZone) {
                player.direction = "right";
                movePlayer(1, 0);
            } else if (dx < -deadZone) {
                player.direction = "left";
                movePlayer(-1, 0);
            }
        } else {
            if (dy > deadZone) {
                player.direction = "down";
                movePlayer(0, 1);
            } else if (dy < -deadZone) {
                player.direction = "up";
                movePlayer(0, -1);
            }
        }
        
        e.preventDefault();
    }
};
