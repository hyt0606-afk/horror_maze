// =============================
// items.js - 優化版本
// 鑰匙與出口系統
// =============================

let keys = [];
let exitDoor = {
    x: GHOST_START_X,
    y: GHOST_START_Y,
    open: false
};

// 建立物品
function createItems() {
    keys = [];

    // 生成指定數量的鑰匙
    while (keys.length < TOTAL_KEYS) {
        const x = Math.floor(Math.random() * (MAP_WIDTH - 2)) + 1;
        const y = Math.floor(Math.random() * (MAP_HEIGHT - 2)) + 1;

        // 檢查有效性
        if (isWall(x, y)) continue;
        if (x === PLAYER_START_X && y === PLAYER_START_Y) continue;
        if (keys.some(k => k.x === x && k.y === y)) continue;

        keys.push({
            x,
            y,
            collected: false
        });
    }

    exitDoor.open = false;
}

// 更新物品
function updateItems() {
    // 檢查鑰匙碰撞
    for (const key of keys) {
        if (key.collected) continue;

        if (player.x === key.x && player.y === key.y) {
            key.collected = true;
            keysCollected++;
            updateHUD();

            // 所有鑰匙都收集後打開出口
            if (keysCollected >= TOTAL_KEYS) {
                exitDoor.open = true;
            }
        }
    }

    // 檢查出口碰撞
    if (
        exitDoor.open &&
        player.x === exitDoor.x &&
        player.y === exitDoor.y
    ) {
        gameOver(RESULT_WIN);
    }
}

// 畫物品
function drawItems(ctx) {
    // 畫未收集的鑰匙
    for (const key of keys) {
        if (key.collected) continue;

        ctx.fillStyle = KEY_COLOR;
        ctx.beginPath();
        ctx.arc(
            key.x * TILE_SIZE + TILE_SIZE / 2,
            key.y * TILE_SIZE + TILE_SIZE / 2,
            KEY_SIZE,
            0,
            Math.PI * 2
        );
        ctx.fill();
    }

    // 畫出口
    const exitColor = exitDoor.open ? EXIT_COLOR_OPEN : EXIT_COLOR_CLOSED;
    ctx.fillStyle = exitColor;

    ctx.fillRect(
        exitDoor.x * TILE_SIZE + EXIT_PADDING,
        exitDoor.y * TILE_SIZE + EXIT_PADDING,
        TILE_SIZE - 2 * EXIT_PADDING,
        TILE_SIZE - 2 * EXIT_PADDING
    );
}