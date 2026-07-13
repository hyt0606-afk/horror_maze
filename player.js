// =============================
// player.js - 優化版本
// 玩家控制系統
// =============================

// 玩家資料
let player = {
    x: PLAYER_START_X,
    y: PLAYER_START_Y,
    size: PLAYER_SIZE,
    color: PLAYER_COLOR,

    speed: PLAYER_SPEED,
    runSpeed: PLAYER_RUN_SPEED,

    running: false,

    stamina: PLAYER_MAX_STAMINA,
    maxStamina: PLAYER_MAX_STAMINA,

    direction: "down"
};

// 建立玩家
function createPlayer() {
    player.x = PLAYER_START_X;
    player.y = PLAYER_START_Y;
    player.stamina = PLAYER_MAX_STAMINA;
    player.running = false;
}

// 更新玩家（優化版 - 更平穩的體力恢復）
function updatePlayer() {
    // 恢復體力
    if (!player.running && player.stamina < player.maxStamina) {
        player.stamina = Math.min(
            player.stamina + STAMINA_RECOVERY_RATE,
            player.maxStamina
        );
    }
}

// 繪製玩家
function drawPlayer(ctx) {
    const px = player.x * TILE_SIZE + TILE_SIZE / 2;
    const py = player.y * TILE_SIZE + TILE_SIZE / 2;

    // 玩家身體
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.arc(px, py, player.size / 2, 0, Math.PI * 2);
    ctx.fill();

    // 玩家眼睛（朝向指示）
    ctx.fillStyle = "#FFFFFF";

    let eyeX = 0;
    let eyeY = 0;

    switch (player.direction) {
        case "up":
            eyeY = -PLAYER_EYE_OFFSET;
            break;
        case "down":
            eyeY = PLAYER_EYE_OFFSET;
            break;
        case "left":
            eyeX = -PLAYER_EYE_OFFSET;
            break;
        case "right":
            eyeX = PLAYER_EYE_OFFSET;
            break;
    }

    ctx.beginPath();
    ctx.arc(px + eyeX, py + eyeY, PLAYER_EYE_SIZE, 0, Math.PI * 2);
    ctx.fill();
    
    // 繪製體力條
    drawStaminaBar(ctx, px, py);
}

// 繪製體力條
function drawStaminaBar(ctx, px, py) {
    const barWidth = 40;
    const barHeight = 4;
    const staminaPercent = player.stamina / player.maxStamina;
    
    // 背景
    ctx.fillStyle = "rgba(100,100,100,0.5)";
    ctx.fillRect(px - barWidth / 2, py + 20, barWidth, barHeight);
    
    // 體力條
    const color = staminaPercent > 0.3 ? "#00FF00" : "#FF6600";
    ctx.fillStyle = color;
    ctx.fillRect(px - barWidth / 2, py + 20, barWidth * staminaPercent, barHeight);
}

// 玩家移動
function movePlayer(dx, dy) {
    const step = player.running ? player.runSpeed : player.speed;

    const nextX = player.x + dx * step;
    const nextY = player.y + dy * step;

    if (isWall(nextX, nextY)) return;

    player.x = nextX;
    player.y = nextY;
}

// 奔跑消耗體力（優化版 - 更精確的時間控制）
setInterval(() => {
    if (player.running && player.stamina > 0) {
        player.stamina -= STAMINA_DRAIN_RATE;

        if (player.stamina <= 0) {
            player.stamina = 0;
            player.running = false;
        }
    }
}, STAMINA_DRAIN_INTERVAL);