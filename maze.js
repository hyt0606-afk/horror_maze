// =============================
// maze.js - 優化版本
// 迷宮系統
// =============================

let maze = [];
let mazeCanvas = null;
let mazeCtx = null;

// 建立迷宮
function createMaze() {
    maze = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,1,0,0,0,0,0,1,0,0,0,1],
        [1,0,1,0,1,0,1,1,1,0,1,0,1,0,1],
        [1,0,1,0,0,0,0,0,1,0,0,0,1,0,1],
        [1,0,1,1,1,1,1,0,1,1,1,0,1,0,1],
        [1,0,0,0,0,0,1,0,0,0,1,0,1,0,1],
        [1,1,1,1,1,0,1,1,1,0,1,0,1,0,1],
        [1,0,0,0,1,0,0,0,1,0,0,0,1,0,1],
        [1,0,1,0,1,1,1,0,1,1,1,1,1,0,1],
        [1,0,1,0,0,0,1,0,0,0,0,0,1,0,1],
        [1,0,1,1,1,0,1,1,1,1,1,0,1,0,1],
        [1,0,0,0,1,0,0,0,0,0,1,0,0,0,1],
        [1,1,1,0,1,1,1,1,1,0,1,1,1,0,1],
        [1,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ];
    
    // 初始化迷宮快取 canvas
    initMazeCache();
}

// 初始化迷宮快取
function initMazeCache() {
    mazeCanvas = document.createElement('canvas');
    mazeCanvas.width = CANVAS_WIDTH;
    mazeCanvas.height = CANVAS_HEIGHT;
    mazeCtx = mazeCanvas.getContext('2d', { alpha: false });
    
    // 預先繪製迷宮到快取
    drawMazeToCache();
}

// 繪製迷宮到快取
function drawMazeToCache() {
    for (let y = 0; y < MAP_HEIGHT; y++) {
        for (let x = 0; x < MAP_WIDTH; x++) {
            if (maze[y][x] === 1) {
                mazeCtx.fillStyle = WALL_COLOR;
            } else {
                mazeCtx.fillStyle = FLOOR_COLOR;
            }

            mazeCtx.fillRect(
                x * TILE_SIZE,
                y * TILE_SIZE,
                TILE_SIZE,
                TILE_SIZE
            );

            mazeCtx.strokeStyle = GRID_COLOR;
            mazeCtx.strokeRect(
                x * TILE_SIZE,
                y * TILE_SIZE,
                TILE_SIZE,
                TILE_SIZE
            );
        }
    }
}

// 畫迷宮（使用快取 canvas）
function drawMaze(ctx) {
    ctx.drawImage(mazeCanvas, 0, 0);
}

// 是否是牆壁（碰撞檢測）
function isWall(x, y) {
    // 邊界檢查
    if (x < 0 || y < 0 || x >= MAP_WIDTH || y >= MAP_HEIGHT) {
        return true;
    }

    return maze[y][x] === 1;
}