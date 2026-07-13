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
    running: false
};

// 建立玩家
function createPlayer() {
    player.x = 1;
    player.y = 1;
}

// 更新玩家（之後加入動畫、體力）
function updatePlayer() {

}

// 繪製玩家
function drawPlayer(ctx) {

    const px = player.x * TILE_SIZE + TILE_SIZE / 2;
    const py = player.y * TILE_SIZE + TILE_SIZE / 2;

    ctx.fillStyle = player.color;

    ctx.beginPath();
    ctx.arc(px, py, player.size / 2, 0, Math.PI * 2);
    ctx.fill();

}

// 玩家移動
function movePlayer(dx, dy) {

    const nextX = player.x + dx;
    const nextY = player.y + dy;

    // 暫時只有邊界判定
    if (
        nextX < 0 ||
        nextY < 0 ||
        nextX >= MAP_WIDTH ||
        nextY >= MAP_HEIGHT
    ) {
        return;
    }

    player.x = nextX;
    player.y = nextY;

}

// 鍵盤控制
document.addEventListener("keydown", (e) => {

    switch (e.key) {

        case "ArrowUp":
        case "w":
        case "W":
            movePlayer(0, -1);
            break;

        case "ArrowDown":
        case "s":
        case "S":
            movePlayer(0, 1);
            break;

        case "ArrowLeft":
        case "a":
        case "A":
            movePlayer(-1, 0);
            break;

        case "ArrowRight":
        case "d":
        case "D":
            movePlayer(1, 0);
            break;

    }

});
