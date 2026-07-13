// =============================
// lighting.js - 優化版本
// 手電筒與黑暗系統
// =============================

// 手電筒狀態
let flashlightOn = true;

// 開關手電筒
function toggleFlashlight() {
    flashlightOn = !flashlightOn;
}

// 畫黑暗與光束（優化版）
function drawLighting(ctx) {
    ctx.save();

    // 全畫面黑暗
    ctx.fillStyle = `rgba(0,0,0,${DARKNESS_OPACITY})`;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    if (!flashlightOn) {
        ctx.restore();
        return;
    }

    const px = player.x * TILE_SIZE + TILE_SIZE / 2;
    const py = player.y * TILE_SIZE + TILE_SIZE / 2;

    // 根據玩家方向計算光束角度
    let angle = 0;
    switch (player.direction) {
        case "up":
            angle = -Math.PI / 2;
            break;
        case "down":
            angle = Math.PI / 2;
            break;
        case "left":
            angle = Math.PI;
            break;
        case "right":
            angle = 0;
            break;
    }

    ctx.globalCompositeOperation = "destination-out";

    // 漸層光束
    const gradient = ctx.createRadialGradient(
        px, py, LIGHT_INNER_RADIUS,
        px, py, LIGHT_DISTANCE
    );

    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.7, "rgba(255,255,255,0.5)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    ctx.fillStyle = gradient;

    ctx.beginPath();
    ctx.moveTo(px, py);

    ctx.arc(
        px, py,
        LIGHT_DISTANCE,
        angle - LIGHT_ANGLE / 2,
        angle + LIGHT_ANGLE / 2
    );

    ctx.closePath();
    ctx.fill();

    ctx.restore();
}