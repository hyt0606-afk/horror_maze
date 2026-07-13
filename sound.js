// =============================
// sound.js
// 音效系統
// =============================

const SoundManager = {
    // 音效狀態
    enabled: true,
    masterVolume: 0.5,
    effectVolume: 0.7,
    musicVolume: 0.4,
    
    // 音效緩存
    sounds: {},
    currentMusic: null,
    
    // 初始化
    init() {
        this.createAudioContext();
        this.preloadSounds();
    },
    
    // 創建 Audio Context
    createAudioContext() {
        if (!window.audioContext) {
            window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    },
    
    // 預加載音效
    preloadSounds() {
        // 此處可以加載音效 URL
        // 範例: this.sounds.keyPickup = new Audio('sounds/key.mp3');
    },
    
    // 播放收集鑰匙音效
    playKeyPickup() {
        if (!this.enabled) return;
        this.playTone(800, 100, 0.1);
    },
    
    // 播放遊戲結束音效
    playGameOver() {
        if (!this.enabled) return;
        this.playTone(400, 500, 0.15);
    },
    
    // 播放勝利音效
    playVictory() {
        if (!this.enabled) return;
        this.playTone(523, 150, 0.1);
        setTimeout(() => this.playTone(659, 150, 0.1), 150);
        setTimeout(() => this.playTone(784, 300, 0.15), 300);
    }
    
    // 播放警告音效（鬼靠近）
    playWarning() {
        if (!this.enabled) return;
        this.playTone(600, 50, 0.08);
    },
    
    // 生成音調 (Web Audio API)
    playTone(frequency, duration, volume) {
        try {
            const context = window.audioContext;
            const oscillator = context.createOscillator();
            const gainNode = context.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(context.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(
                volume * this.masterVolume * this.effectVolume,
                context.currentTime
            );
            gainNode.gain.exponentialRampToValueAtTime(
                0.01,
                context.currentTime + duration / 1000
            );
            
            oscillator.start(context.currentTime);
            oscillator.stop(context.currentTime + duration / 1000);
        } catch (e) {
            console.warn('Audio context error:', e);
        }
    },
    
    // 切換音效
    toggleSound() {
        this.enabled = !this.enabled;
        return this.enabled;
    },
    
    // 調整音量
    setVolume(level) {
        this.masterVolume = Math.max(0, Math.min(1, level));
    }
};

// 鬼接近時的警告音效
let lastWarningTime = 0;
function updateGhostWarning() {
    if (!gameRunning) return;
    
    const dx = ghost.x - player.x;
    const dy = ghost.y - player.y;
    const distance = Math.abs(dx) + Math.abs(dy);
    
    // 鬼在 3-5 格內發出警告音
    if (distance >= 3 && distance <= 5) {
        const now = Date.now();
        if (now - lastWarningTime > 500) {
            SoundManager.playWarning();
            lastWarningTime = now;
        }
    }
}