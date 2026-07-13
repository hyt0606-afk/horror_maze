// =============================
// lighting.js
// 手電筒與黑暗系統
// =============================

// 手電筒狀態
let flashlightOn = true;

// 光束長度
const LIGHT_DISTANCE = 220;
const LIGHT_ANGLE = Math.PI / 2;

// 開關手電筒
function toggleFlashlight() {
    flashlightOn = !flashlightOn;
}

// 畫黑暗與光束
function drawLighting(ctx) {
    ctx.save();

    // 全畫面黑暗
    ctx.fillStyle = "rgba(0,0,0,0.94)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (!flashlightOn) {
        ctx.restore();
        return;
    }

    const px = player.x * TILE_SIZE + TILE_SIZE / 2;
    const py = player.y * TILE_SIZE + TILE_SIZE / 2;

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
    const gradient = ctx.createRadialGradient(px, py, 20, px, py, LIGHT_DISTANCE);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.arc(px, py, LIGHT_DISTANCE, angle - LIGHT_ANGLE / 2, angle + LIGHT_ANGLE / 2);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
}

// F 鍵切換手電筒
document.addEventListener("keydown", function (e) {
    if (e.key === "f" || e.key === "F") {
        toggleFlashlight();
    }
});
