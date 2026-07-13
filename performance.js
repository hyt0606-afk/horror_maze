// =============================
// performance.js
// 性能監控工具
// =============================

const PerformanceMonitor = {
    fps: 0,
    frameCount: 0,
    lastTime: performance.now(),
    
    // 初始化監控
    init() {
        setInterval(() => {
            this.fps = this.frameCount;
            this.frameCount = 0;
        }, 1000);
    },
    
    // 記錄幀數
    recordFrame() {
        this.frameCount++;
    },
    
    // 獲取 FPS
    getFPS() {
        return this.fps;
    },
    
    // 測量函數執行時間
    measure(name, fn) {
        const start = performance.now();
        const result = fn();
        const duration = performance.now() - start;
        
        if (duration > 5) {
            console.warn(`⚠️ ${name} took ${duration.toFixed(2)}ms`);
        }
        
        return result;
    }
};

// 優化的繪製函數
const DrawOptimizer = {
    // 緩存的 canvas 上下文
    offscreenCanvas: null,
    offscreenCtx: null,
    
    // 初始化
    init() {
        this.offscreenCanvas = document.createElement('canvas');
        this.offscreenCanvas.width = CANVAS_WIDTH;
        this.offscreenCanvas.height = CANVAS_HEIGHT;
        this.offscreenCtx = this.offscreenCanvas.getContext('2d', { alpha: false });
    },
    
    // 獲取離屏 canvas
    getOffscreenContext() {
        return this.offscreenCtx;
    },
    
    // 複製到主 canvas
    copyToMain(mainCtx) {
        mainCtx.drawImage(this.offscreenCanvas, 0, 0);
    },
    
    // 清除離屏 canvas
    clear() {
        this.offscreenCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
};