// =============================
// items.js
// 鑰匙與出口
// =============================

let keys = [];
let exitDoor = {
    x: 13,
    y: 13,
    open: false
};

const TOTAL_KEYS = 5;

// 建立物品
function createItems() {

    keys = [];

    while (keys.length < TOTAL_KEYS) {

        const x = Math.floor(Math.random() * (MAP_WIDTH - 2)) + 1;
        const y = Math.floor(Math.random() * (MAP_HEIGHT - 2)) + 1;

        if (isWall(x, y)) continue;

        if (x === 1 && y === 1) continue;

        if (keys.some(k => k.x === x && k.y === y)) continue;

        keys.push({
            x,
            y,
            collected: false
        });

    }

    exitDoor.open = false;

}

// 更新
function updateItems() {

    for (const key of keys) {

        if (key.collected) continue;

        if (player.x === key.x && player.y === key.y) {

            key.collected = true;

            keysCollected++;

            updateHUD();

            if (keysCollected >= TOTAL_KEYS) {

                exitDoor.open = true;

            }

        }

    }

    if (
        exitDoor.open &&
        player.x === exitDoor.x &&
        player.y === exitDoor.y
    ) {

        gameOver("🎉 成功逃脫！");

    }

}

// 畫物品
function drawItems(ctx) {

    // 鑰匙
    for (const key of keys) {

        if (key.collected) continue;

        ctx.fillStyle = "gold";

        ctx.beginPath();
        ctx.arc(
            key.x * TILE_SIZE + TILE_SIZE / 2,
            key.y * TILE_SIZE + TILE_SIZE / 2,
            8,
            0,
            Math.PI * 2
        );
        ctx.fill();

    }

    // 出口
    ctx.fillStyle = exitDoor.open ? "#00ff66" : "#666";

    ctx.fillRect(
        exitDoor.x * TILE_SIZE + 8,
        exitDoor.y * TILE_SIZE + 8,
        TILE_SIZE - 16,
        TILE_SIZE - 16
    );

}
