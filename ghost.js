// =============================
// ghost.js - 優化版本
// 鬼 AI 系統
// =============================

let ghost = {
    x: GHOST_START_X,
    y: GHOST_START_Y,
    size: GHOST_SIZE,
    color: GHOST_COLOR,

    speed: GHOST_SPEED,

    direction: "left",

    chaseRange: GHOST_CHASE_RANGE,

    moveTimer: 0,
    
    // 緩存的路徑
    cachedPath: null,
    pathUpdateTimer: 0
};

// 建立鬼
function createGhost() {
    ghost.x = GHOST_START_X;
    ghost.y = GHOST_START_Y;
    ghost.moveTimer = 0;
    ghost.cachedPath = null;
}

// 更新鬼（優化版 - 改進的 AI 邏輯）
function updateGhost() {
    ghost.moveTimer++;

    // 每 N 幀移動一次
    if (ghost.moveTimer < GHOST_MOVE_INTERVAL) return;

    ghost.moveTimer = 0;

    const dx = player.x - ghost.x;
    const dy = player.y - ghost.y;
    const distance = Math.abs(dx) + Math.abs(dy);

    // 玩家在追逐範圍內 - 使用改進的追逐邏輯
    if (distance <= ghost.chaseRange) {
        chasePlayerOptimized(dx, dy);
    } else {
        randomMove();
    }

    // 檢查是否抓到玩家
    if (ghost.x === player.x && ghost.y === player.y) {
        gameOver(RESULT_GAME_OVER);
    }
}

// 改進的玩家追逐邏輯
function chasePlayerOptimized(dx, dy) {
    let moveX = 0;
    let moveY = 0;

    // 優先選擇更接近玩家的方向
    if (Math.abs(dx) > Math.abs(dy)) {
        moveX = dx > 0 ? 1 : -1;
    } else {
        moveY = dy > 0 ? 1 : -1;
    }

    // 嘗試朝玩家移動
    if (!isWall(ghost.x + moveX, ghost.y + moveY)) {
        ghost.x += moveX;
        ghost.y += moveY;
        return;
    }

    // 如果主方向被堵，嘗試另一個方向
    const alternateX = moveY;
    const alternateY = moveX;

    if (!isWall(ghost.x + alternateX, ghost.y + alternateY)) {
        ghost.x += alternateX;
        ghost.y += alternateY;
    }
}

// 鬼隨機移動（使用預定義方向以優化性能）
const DIRECTIONS = [[0, -1], [0, 1], [-1, 0], [1, 0]];

function randomMove() {
    const dir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];

    const nx = ghost.x + dir[0];
    const ny = ghost.y + dir[1];

    if (!isWall(nx, ny)) {
        ghost.x = nx;
        ghost.y = ny;
    }
}

// 畫鬼
function drawGhost(ctx) {
    if (!ghostVisible()) return;

    const px = ghost.x * TILE_SIZE + TILE_SIZE / 2;
    const py = ghost.y * TILE_SIZE + TILE_SIZE / 2;

    // 身體
    ctx.fillStyle = ghost.color;
    ctx.beginPath();
    ctx.arc(px, py, ghost.size / 2, 0, Math.PI * 2);
    ctx.fill();

    // 眼睛
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.arc(px - 6, py - 4, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(px + 6, py - 4, 3, 0, Math.PI * 2);
    ctx.fill();

    // 底部波浪效果
    ctx.strokeStyle = ghost.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(px - ghost.size / 2, py + ghost.size / 2);
    
    for (let i = 0; i < 4; i++) {
        const waveX = px - ghost.size / 2 + (i + 1) * ghost.size / 4;
        const waveY = py + ghost.size / 2 + (i % 2 === 0 ? 4 : -4);
        ctx.lineTo(waveX, waveY);
    }
    
    ctx.stroke();
}

// 判斷鬼是否可見（優化版 - 避免重複計算）
function ghostVisible() {
    if (!flashlightOn) return false;

    const dx = ghost.x - player.x;
    const dy = ghost.y - player.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance <= GHOST_VISIBLE_RANGE;
}