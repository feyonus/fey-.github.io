// Game constants
const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 600;
const FPS = 60;

// Colors
const BLACK = 'rgb(0, 0, 0)';
const WHITE = 'rgb(255, 255, 255)';
const BLUE = 'rgb(0, 100, 255)';
const GREEN = 'rgb(0, 255, 0)';
const RED = 'rgb(255, 0, 0)';
const YELLOW = 'rgb(255, 255, 0)';
const ORANGE = 'rgb(255, 165, 0)';

// Game states
const STATE_MENU = 0;
const STATE_PLAYING = 1;
const STATE_ROUND_TRANSITION = 2;
const STATE_GAME_OVER = 3;
const STATE_DEMO = 4;

// Physics
const GRAVITY = 0.5;
const JUMP_VELOCITY = -12;
const PLAYER_SPEED = 5;
const FRICTION = 0.8;

// Player dimensions
const PLAYER_WIDTH = 32;
const PLAYER_HEIGHT = 32;

// Animation
const ANIMATION_SPEED = 0.15;

// Bomb mechanics
const BOMB_WIDTH = 16;
const BOMB_HEIGHT = 16;
let BOMB_FUSE_TIME = 3.0; // seconds
let EXPLOSION_RADIUS = 60;
let EXPLOSION_DAMAGE = 1;
const EXPLOSION_DURATION = 0.5; // seconds
const KNOCKBACK_FORCE = 10;

// Health system
const MAX_HEALTH = 3;

// Round system
let MAX_ROUNDS = 3;

// Game modes
const GAME_MODE_CLASSIC = 0;
const GAME_MODE_SURVIVAL = 1;
const GAME_MODE_TIME_ATTACK = 2;
const GAME_MODE_BOMB_RAIN = 3;

// Time Attack settings
const TIME_ATTACK_DURATION = 120; // 2 minutes in seconds

// Bomb Rain settings
const BOMB_RAIN_INTERVAL = 2.0; // seconds between random bombs
const BOMB_RAIN_DURATION = 10;   // seconds of bomb rain

// Weather effects
const WEATHER_NONE = 0;
const WEATHER_RAIN = 1;
const WEATHER_SNOW = 2;

// Platform generation
const MIN_PLATFORM_WIDTH = 60;
const MAX_PLATFORM_WIDTH = 120;
const PLATFORM_HEIGHT = 20;
const MIN_PLATFORMS = 3;
const MAX_PLATFORMS = 5;