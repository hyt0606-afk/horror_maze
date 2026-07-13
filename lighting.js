// =============================
// lighting.js
// 黑暗 + 手電筒
// =============================

let flashlightOn = true;

// 手電筒半徑
const LIGHT_RADIUS = 140;

// 鬼可見距離
const GHOST_VISIBLE_DISTANCE = 5;

// 切換手電筒
function toggleFlashlight() {

    flashlightOn = !flashlightOn;

}

// 畫黑暗
function drawLighting(ctx) {

    if (!flashlightOn) {

        ctx.fillStyle = "rgba(0,0,0,0.95)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        return;

    }

    ctx.save();

    ctx.fillStyle = "rgba(0,0,0,0.92)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const px = player.x * TILE_SIZE + TILE_SIZE / 2;
    const py = player.y * TILE_SIZE + TILE_SIZE / 2;

    ctx.globalCompositeOperation = "destination-out";

    const light = ctx.createRadialGradient(
        px,
        py,
        20,
        px,
        py,
        LIGHT_RADIUS
    );

    light.addColorStop(0, "rgba(255,255,255,1)");
    light.addColorStop(1, "rgba(255,255,255,0)");

    ctx.fillStyle = light;

    ctx.beginPath();
    ctx.arc(
        px,
        py,
        LIGHT_RADIUS,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.restore();

}

// 判斷鬼是否可見
function ghostVisible() {

    const dx = player.x - ghost.x;
    const dy = player.y - ghost.y;

    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance <= GHOST_VISIBLE_DISTANCE;

}

// 手機按鈕
const flashBtn = document.getElementById("flashBtn");

if (flashBtn) {

    flashBtn.addEventListener("click", toggleFlashlight);

}

// 鍵盤 F
document.addEventListener("keydown", (e) => {

    if (e.key === "f" || e.key === "F") {

        toggleFlashlight();

    }

});
