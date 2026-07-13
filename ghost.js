// =============================
// ghost.js
// 鬼 AI
// =============================

let ghost = {
    x: 13,
    y: 13,
    size: 32,
    color: "#FF0000",

    speed: 1,

    direction: "left",

    chaseRange: 5,

    moveTimer: 0
};

// 建立鬼
function createGhost() {

    ghost.x = 13;
    ghost.y = 13;

}

// 更新鬼
function updateGhost() {

    ghost.moveTimer++;

    // 每 20 幀移動一次
    if (ghost.moveTimer < 20) return;

    ghost.moveTimer = 0;

    const dx = player.x - ghost.x;
    const dy = player.y - ghost.y;

    // 玩家在追逐範圍內
    if (
        Math.abs(dx) + Math.abs(dy) <= ghost.chaseRange
    ) {

        chasePlayer();

    } else {

        randomMove();

    }

    // 抓到玩家
    if (
        ghost.x === player.x &&
        ghost.y === player.y
    ) {

        gameOver("💀 你被鬼抓到了");

    }

}

// 鬼追玩家
function chasePlayer() {

    let moveX = 0;
    let moveY = 0;

    if (Math.abs(player.x - ghost.x) > Math.abs(player.y - ghost.y)) {

        moveX = player.x > ghost.x ? 1 : -1;

    } else {

        moveY = player.y > ghost.y ? 1 : -1;

    }

    if (!isWall(ghost.x + moveX, ghost.y + moveY)) {

        ghost.x += moveX;
        ghost.y += moveY;

    }

}

// 鬼隨機移動
function randomMove() {

    const dirs = [

        [0,-1],
        [0,1],
        [-1,0],
        [1,0]

    ];

    const dir = dirs[
        Math.floor(Math.random()*dirs.length)
    ];

    const nx = ghost.x + dir[0];
    const ny = ghost.y + dir[1];

    if (!isWall(nx, ny)) {

        ghost.x = nx;
        ghost.y = ny;

    }

}

// 畫鬼
function drawGhost(ctx) {

    const px = ghost.x * TILE_SIZE + TILE_SIZE / 2;
    const py = ghost.y * TILE_SIZE + TILE_SIZE / 2;

    // 身體
    ctx.fillStyle = ghost.color;

    ctx.beginPath();
    ctx.arc(
        px,
        py,
        ghost.size /
