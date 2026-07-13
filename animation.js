// =============================
// animation.js
// 動畫與視覺效果系統
// =============================

const AnimationManager = {
    // 活躍的動畫
    activeAnimations: [],
    
    // 粒子效果
    particles: [],
    
    // 創建收集鑰匙動畫
    createKeyPickupAnimation(x, y) {
        for (let i = 0; i < 10; i++) {
            const angle = (Math.PI * 2 * i) / 10;
            const velocity = {
                x: Math.cos(angle) * 2,
                y: Math.sin(angle) * 2
            };
            
            this.particles.push({
                x: x * TILE_SIZE + TILE_SIZE / 2,
                y: y * TILE_SIZE + TILE_SIZE / 2,
                vx: velocity.x,
                vy: velocity.y,
                life: 1,
                color: 'gold',
                size: 4
            });
        }
    },
    
    // 創建傷害閃爍
    createDamageFlash() {
        this.activeAnimations.push({
            type: 'damageFlash',
            duration: 200,
            startTime: Date.now(),
            color: 'rgba(255, 0, 0, 0.5)'
        });
    },
    
    // 更新所有粒子
    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            
            // 更新位置
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1; // 重力
            
            // 衰減
            p.life -= 0.02;
            
            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    },
    
    // 繪製粒子
    drawParticles(ctx) {
        for (const p of this.particles) {
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life;
            ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
        }
        ctx.globalAlpha = 1;
    },
    
    // 更新所有動畫
    updateAnimations() {
        const now = Date.now();
        
        for (let i = this.activeAnimations.length - 1; i >= 0; i--) {
            const anim = this.activeAnimations[i];
            const elapsed = now - anim.startTime;
            
            if (elapsed > anim.duration) {
                this.activeAnimations.splice(i, 1);
            }
        }
    },
    
    // 繪製傷害閃爍
    drawDamageFlash(ctx) {
        for (const anim of this.activeAnimations) {
            if (anim.type === 'damageFlash') {
                const elapsed = Date.now() - anim.startTime;
                const progress = 1 - (elapsed / anim.duration);
                
                ctx.fillStyle = `rgba(255, 0, 0, ${0.5 * progress})`;
                ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            }
        }
    },
    
    // 創建文字浮動動畫
    createFloatingText(text, x, y, color = '#FFF') {
        this.activeAnimations.push({
            type: 'floatingText',
            text: text,
            x: x,
            y: y,
            color: color,
            duration: 1000,
            startTime: Date.now()
        });
    },
    
    // 繪製浮動文字
    drawFloatingText(ctx) {
        for (const anim of this.activeAnimations) {
            if (anim.type === 'floatingText') {
                const elapsed = Date.now() - anim.startTime;
                const progress = elapsed / anim.duration;
                const offsetY = progress * 30;
                const opacity = 1 - progress;
                
                ctx.fillStyle = anim.color;
                ctx.globalAlpha = opacity;
                ctx.font = 'bold 16px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(anim.text, anim.x, anim.y - offsetY);
                ctx.globalAlpha = 1;
            }
        }
    },
    
    // 清空所有動畫
    clear() {
        this.activeAnimations = [];
        this.particles = [];
    }
};
