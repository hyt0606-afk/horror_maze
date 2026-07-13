// =============================
// joystick.js
// 手機虛擬搖桿
// =============================

const joystick = document.getElementById("joystick");

let touching = false;

if (joystick) {
    joystick.addEventListener("touchstart", function(e) {
        touching = true;
    });

    joystick.addEventListener("touchend", function(e) {
        touching = false;
    });

    joystick.addEventListener("touchmove", function(e) {
        if (!touching) return;

        const rect = joystick.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const dx = x - centerX;
        const dy = y - centerY;

        // 上下左右判定
        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 20) {
                player.direction = "right";
                movePlayer(1, 0);
            } else if (dx < -20) {
                player.direction = "left";
                movePlayer(-1, 0);
            }
        } else {
            if (dy > 20) {
                player.direction = "down";
                movePlayer(0, 1);
            } else if (dy < -20) {
                player.direction = "up";
                movePlayer(0, -1);
            }
        }

        e.preventDefault();
    });
}
