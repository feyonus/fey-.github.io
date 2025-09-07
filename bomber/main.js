const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const gameOverButtons = document.getElementById('game-over-buttons');
const newGameBtn = document.getElementById('new-game-btn');
const exitBtn = document.getElementById('exit-btn');
const newGameSettingsPanel = document.getElementById('new-game-settings-panel');
const newGameColorSelect = document.getElementById('new-game-color-select');
const roundsInput = document.getElementById('rounds-input');
const bombIntensitySelect = document.getElementById('bomb-intensity-select');
const startNewGameBtn = document.getElementById('start-new-game-btn');
const cancelNewGameBtn = document.getElementById('cancel-new-game-btn');

let game;

function init() {
    game = new Game(ctx);
    window.gameInstance = game; // Make game instance globally accessible for bombs
    const savedColor = localStorage.getItem('playerColor') || 'none';
    game.playerColor = savedColor;

    // Load saved new game settings
    const savedNewColor = localStorage.getItem('newGameColor') || 'none';
    const savedRounds = parseInt(localStorage.getItem('newGameRounds')) || 3;
    const savedIntensity = localStorage.getItem('bombIntensity') || 'normal';
    newGameColorSelect.value = savedNewColor;
    roundsInput.value = savedRounds;
    bombIntensitySelect.value = savedIntensity;

    // Show new game settings panel
    newGameSettingsPanel.style.display = 'block';

    game.loadAssets().then(() => {
        // Set up demo mode
        game.gameState = STATE_DEMO;
        game.player = new AIPlayer(100, SCREEN_HEIGHT - 100);
        game.player.colorTint = 'red'; // Random color for demo
        game.aiPlayer = new AIPlayer(SCREEN_WIDTH - 132, SCREEN_HEIGHT - 100);
        game.aiPlayer.colorTint = 'blue'; // Another color
        game.createRandomLevel();
        game.backgroundColorIndex = Math.floor(Math.random() * game.backgroundColors.length);

        // Start demo loop
        game.run();
    });
}

function updateButtons() {
    if (game.gameState === STATE_GAME_OVER) {
        gameOverButtons.style.display = 'none';
        newGameSettingsPanel.style.display = 'none';
    } else if (game.gameState === STATE_DEMO) {
        gameOverButtons.style.display = 'none';
        newGameSettingsPanel.style.display = 'block';
    } else {
        gameOverButtons.style.display = 'none';
        newGameSettingsPanel.style.display = 'none';
    }
}

newGameBtn.addEventListener('click', () => {
    // Load saved settings
    const savedColor = localStorage.getItem('newGameColor') || 'none';
    const savedRounds = parseInt(localStorage.getItem('newGameRounds')) || 3;
    const savedIntensity = localStorage.getItem('bombIntensity') || 'normal';
    newGameColorSelect.value = savedColor;
    roundsInput.value = savedRounds;
    bombIntensitySelect.value = savedIntensity;

    // Show settings panel
    newGameSettingsPanel.style.display = 'block';
    gameOverButtons.style.display = 'none';
});

exitBtn.addEventListener('click', () => {
    window.location.reload();
});



startNewGameBtn.addEventListener('click', () => {
    // Apply settings
    const color = newGameColorSelect.value;
    const rounds = parseInt(roundsInput.value);
    const intensity = bombIntensitySelect.value;

    // Save settings
    localStorage.setItem('newGameColor', color);
    localStorage.setItem('newGameRounds', rounds);
    localStorage.setItem('bombIntensity', intensity);

    // Apply bomb intensity
    switch (intensity) {
        case 'easy':
            BOMB_FUSE_TIME = 4.0;
            EXPLOSION_DAMAGE = 1;
            EXPLOSION_RADIUS = 50;
            break;
        case 'normal':
            BOMB_FUSE_TIME = 3.0;
            EXPLOSION_DAMAGE = 1;
            EXPLOSION_RADIUS = 60;
            break;
        case 'hard':
            BOMB_FUSE_TIME = 2.0;
            EXPLOSION_DAMAGE = 2;
            EXPLOSION_RADIUS = 70;
            break;
    }

    // Reset all game state
    game.gameState = STATE_PLAYING;
    game.currentRound = 1;
    game.playerScore = 0;
    game.aiScore = 0;
    game.playerColor = color;
    game.player = new Player(100, SCREEN_HEIGHT - 100, false);
    game.player.colorTint = game.playerColor;
    game.aiPlayer = new AIPlayer(SCREEN_WIDTH - 132, SCREEN_HEIGHT - 100);
    game.aiPlayer.colorTint = 'yellow';
    game.bombs = [];
    game.createRandomLevel();
    game.backgroundColorIndex = Math.floor(Math.random() * game.backgroundColors.length);

    // Set max rounds
    MAX_ROUNDS = rounds;

    newGameSettingsPanel.style.display = 'none';
    updateButtons();

    // The game loop is already running from demo, just switch state
});

cancelNewGameBtn.addEventListener('click', () => {
    // Since this is the start screen, reload to restart
    window.location.reload();
});

// Handle exit to menu on game over
document.addEventListener('keydown', (e) => {
    if (game.gameState === STATE_GAME_OVER && (e.key === 'e' || e.key === 'E')) {
        // Reset to starting screen
        game.gameState = STATE_DEMO;
        game.currentRound = 1;
        game.playerScore = 0;
        game.aiScore = 0;
        game.resetDemo();
        updateButtons();
    }
});

window.onload = init;