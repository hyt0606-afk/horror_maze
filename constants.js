// =============================
// constants.js
// 遊戲常數配置
// =============================

// Canvas & Map
const TILE_SIZE = 48;
const MAP_WIDTH = 15;
const MAP_HEIGHT = 15;
const CANVAS_WIDTH = 720;
const CANVAS_HEIGHT = 720;

// Game Timing
const GAME_TIME = 600; // 秒
const GHOST_MOVE_INTERVAL = 20; // 幀數
const STAMINA_RECOVERY_RATE = 0.2; // 每幀恢復
const STAMINA_DRAIN_INTERVAL = 100; // 毫秒
const STAMINA_DRAIN_RATE = 1; // 每 interval 消耗

// Player
const PLAYER_START_X = 1;
const PLAYER_START_Y = 1;
const PLAYER_SIZE = 32;
const PLAYER_SPEED = 1;
const PLAYER_RUN_SPEED = 2;
const PLAYER_COLOR = "#00AAFF";
const PLAYER_EYE_SIZE = 3;
const PLAYER_EYE_OFFSET = 8;
const PLAYER_MAX_STAMINA = 100;

// Ghost
const GHOST_START_X = 13;
const GHOST_START_Y = 13;
const GHOST_SIZE = 32;
const GHOST_COLOR = "#FF0000";
const GHOST_SPEED = 1;
const GHOST_CHASE_RANGE = 5;

// Lighting
const LIGHT_DISTANCE = 220;
const LIGHT_ANGLE = Math.PI / 2;
const DARKNESS_OPACITY = 0.94;
const LIGHT_INNER_RADIUS = 20;
const GHOST_VISIBLE_RANGE = 5;

// Items
const TOTAL_KEYS = 5;
const KEY_COLOR = "gold";
const KEY_SIZE = 8;
const EXIT_COLOR_OPEN = "#00ff66";
const EXIT_COLOR_CLOSED = "#666";
const EXIT_PADDING = 8;

// Colors
const WALL_COLOR = "#303030";
const FLOOR_COLOR = "#111111";
const GRID_COLOR = "#1d1d1d";

// UI
const HUD_KEY_FORMAT = "🔑 {collected} / {total}";
const RESULT_GAME_OVER = "💀 你被鬼抓到了";
const RESULT_WIN = "🎉 成功逃脫！";