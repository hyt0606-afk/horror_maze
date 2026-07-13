// =============================
// player.js
// 玩家控制
// =============================

// 玩家資料
let player = {
    x: 1,
    y: 1,
    size: 32,
    color: "#00AAFF",
    speed: 1,
    runSpeed: 2,
    running: false,
    stamina: 100,
    maxStamina: 100,
    direction: "down"
};

// 建立玩家
function createPlayer() {
    player.x = 1;
    player.y = 1;
    player.stamina = 100;
    player.running = false;
}

// 更新玩家
function updatePlayer() {
    // 恢復體力
    if (!player.running && player.stamina < player.maxStamina) {
        player.stamina += 0.2;
        if (player.stamina > player.maxStamina) {
            player.stamina = player.maxStamina;
        }
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

    // 玩家眼睛
    ctx.fillStyle = "#FFFFFF";
    let eyeX = 0;
    let eyeY = 0;

    switch (player.direction) {
        case "up":
            eyeY = -8;
            break;
        case "down":
            eyeY = 8;
            break;
        case "left":
            eyeX = -8;
            break;
        case "right":
            eyeX = 8;
            break;
    }

    ctx.beginPath();
    ctx.arc(px + eyeX, py + eyeY, 3, 0, Math.PI * 2);
    ctx.fill();
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

// Shift 奔跑
document.addEventListener("keydown", (e) => {
    if (e.key === "Shift" && player.stamina > 0) {
        player.running = true;
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key === "Shift") {
        player.running = false;
    }
});

// 鍵盤控制
document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
            player.direction = "up";
            movePlayer(0, -1);
            break;
        case "ArrowDown":
        case "s":
        case "S":
            player.direction = "down";
            movePlayer(0, 1);
            break;
        case "ArrowLeft":
        case "a":
        case "A":
            player.direction = "left";
            movePlayer(-1, 0);
            break;
        case "ArrowRight":
        case "d":
        case "D":
            player.direction = "right";
            movePlayer(1, 0);
            break;
    }
});

// 奔跑消耗體力
setInterval(() => {
    if (player.running) {
        player.stamina -= 1;
        if (player.stamina <= 0) {
            player.stamina = 0;
            player.running = false;
        }
    }
}, 100);
