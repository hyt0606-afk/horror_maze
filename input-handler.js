// =============================
// input-handler.js
// 統一輸入處理
// =============================

const InputHandler = {
    keys: {},
    
    init() {
        document.addEventListener('keydown', (e) => this.onKeyDown(e));
        document.addEventListener('keyup', (e) => this.onKeyUp(e));
    },
    
    onKeyDown(e) {
        this.keys[e.key.toLowerCase()] = true;
    },
    
    onKeyUp(e) {
        this.keys[e.key.toLowerCase()] = false;
    },
    
    isKeyPressed(key) {
        return this.keys[key.toLowerCase()] === true;
    }
};
