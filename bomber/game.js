/**
 * Main game class handling game logic, rendering, and state.
 */
class Game {
    /**
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    constructor(ctx) {
        this.ctx = ctx;
        this.running = true;
        this.gameState = STATE_PLAYING;
        this.currentRound = 1;
        this.playerScore = 0;
        this.aiScore = 0;

        // Dynamic backgrounds
        this.backgroundColors = [
            BLUE,
            'rgb(0, 50, 100)',  // Dark blue
            'rgb(50, 0, 50)',   // Purple
            'rgb(0, 100, 50)',  // Teal
            'rgb(100, 50, 0)',  // Orange-brown
            'rgb(25, 25, 50)'   // Dark slate
        ];
        this.backgroundColorIndex = 0;

        // Background particles
        this.backgroundParticles = [];
        this.createBackgroundParticles();

        // Screen shake effect
        this.screenShake = 0;
        this.screenShakeIntensity = 0;

        // Weather
        this.weather = WEATHER_NONE;
        this.weatherParticles = [];

        // Player color persistence
        this.playerColor = 'none';

        // Round transition timer
        this.roundTransitionTimer = 0;
        this.lastWinner = null; // 'player' or 'ai'

        // Combo tracking for rapid explosions
        this.explosionCombo = 0;
        this.comboTimer = 0;
        this.lastExplosionTime = 0;

        // Distortion fields for heat effects
        this.distortionFields = [];

        this.player = new Player(100, SCREEN_HEIGHT - 100, false);
        this.aiPlayer = new AIPlayer(SCREEN_WIDTH - 132, SCREEN_HEIGHT - 100);

        this.platforms = [];
        this.bombs = [];

        this.createRandomLevel();

        this.keys = {};
        this.setupInput();
    }

    setupInput() {
        document.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
        });
        document.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });
    }

    createRandomLevel() {
        this.platforms = [];
        // Ground platform
        this.platforms.push(new Platform(0, SCREEN_HEIGHT - 50, SCREEN_WIDTH, 50, 'rgb(139, 69, 19)'));

        // Random weather
        const rand = Math.random();
        if (rand < 0.2) {
            this.weather = WEATHER_RAIN;
        } else if (rand < 0.4) {
            this.weather = WEATHER_SNOW;
        } else {
            this.weather = WEATHER_NONE;
        }
        this.createWeatherParticles();

        // Random floating platforms
        const numPlatforms = Math.floor(Math.random() * (MAX_PLATFORMS - MIN_PLATFORMS + 1)) + MIN_PLATFORMS;
        for (let i = 0; i < numPlatforms; i++) {
            let valid = false;
            let attempts = 0;
            while (!valid && attempts < 50) {
                const width = Math.floor(Math.random() * (MAX_PLATFORM_WIDTH - MIN_PLATFORM_WIDTH + 1)) + MIN_PLATFORM_WIDTH;
                const x = Math.floor(Math.random() * (SCREEN_WIDTH - width));
                const y = Math.floor(Math.random() * (SCREEN_HEIGHT - 150)) + 100;

                const platformRect = { x, y, width, height: PLATFORM_HEIGHT };
                const player1Area = { x: 50, y: SCREEN_HEIGHT - 120, width: 150, height: 120 };
                const player2Area = { x: SCREEN_WIDTH - 200, y: SCREEN_HEIGHT - 120, width: 150, height: 120 };

                let overlaps = false;
                for (const existing of this.platforms) {
                    const existingRect = existing.getRect();
                    if (this.rectsOverlap(platformRect, existingRect)) {
                        overlaps = true;
                        break;
                    }
                }

                if (!this.rectsOverlap(platformRect, player1Area) && !this.rectsOverlap(platformRect, player2Area) && !overlaps) {
                    valid = true;
                    this.platforms.push(new Platform(x, y, width, PLATFORM_HEIGHT));
                }
                attempts++;
            }
        }

        // Ensure at least one platform is within jumping range from ground
        const maxJumpHeight = (JUMP_VELOCITY * JUMP_VELOCITY) / (2 * GRAVITY);
        const accessibleY = SCREEN_HEIGHT - 50 - maxJumpHeight;
        const hasAccessiblePlatform = this.platforms.some(p => p.y <= accessibleY);
        if (!hasAccessiblePlatform) {
            let valid = false;
            let attempts = 0;
            while (!valid && attempts < 50) {
                const width = 100; // Fixed width for guaranteed platform
                const x = Math.floor(Math.random() * (SCREEN_WIDTH - width));
                const y = Math.floor(Math.random() * 50) + (SCREEN_HEIGHT - 50 - maxJumpHeight);

                const platformRect = { x, y, width, height: PLATFORM_HEIGHT };
                const player1Area = { x: 50, y: SCREEN_HEIGHT - 120, width: 150, height: 120 };
                const player2Area = { x: SCREEN_WIDTH - 200, y: SCREEN_HEIGHT - 120, width: 150, height: 120 };

                let overlaps = false;
                for (const existing of this.platforms) {
                    const existingRect = existing.getRect();
                    if (this.rectsOverlap(platformRect, existingRect)) {
                        overlaps = true;
                        break;
                    }
                }

                if (!this.rectsOverlap(platformRect, player1Area) && !this.rectsOverlap(platformRect, player2Area) && !overlaps) {
                    valid = true;
                    this.platforms.push(new Platform(x, y, width, PLATFORM_HEIGHT));
                }
                attempts++;
            }
        }
    }

    rectsOverlap(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }

    createBackgroundParticles() {
        for (let i = 0; i < 30; i++) {
            this.backgroundParticles.push({
                x: Math.random() * SCREEN_WIDTH,
                y: Math.random() * SCREEN_HEIGHT,
                velY: -Math.random() * 1 + 0.5  // -0.5 to -1.5
            });
        }
    }

    createWeatherParticles() {
        this.weatherParticles = [];
        if (this.weather === WEATHER_RAIN) {
            for (let i = 0; i < 100; i++) {
                this.weatherParticles.push({
                    x: Math.random() * SCREEN_WIDTH,
                    y: Math.random() * SCREEN_HEIGHT,
                    velY: 5 + Math.random() * 5,
                    length: 10 + Math.random() * 10
                });
            }
        } else if (this.weather === WEATHER_SNOW) {
            for (let i = 0; i < 50; i++) {
                this.weatherParticles.push({
                    x: Math.random() * SCREEN_WIDTH,
                    y: Math.random() * SCREEN_HEIGHT,
                    velY: 1 + Math.random() * 2,
                    size: 2 + Math.random() * 3
                });
            }
        }
    }

    addScreenShake(intensity = 5, duration = 10) {
        this.screenShake = duration;
        this.screenShakeIntensity = intensity;
    }

    createImpactSparks(x, y) {
        if (!window.particleSystem) return;

        // Create impact sparks when bomb hits platform
        for (let i = 0; i < 12; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 4 + 2;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed - Math.random() * 3;

            const colors = ['#ffff00', '#ffffff', '#ffaa00', '#ffdd00'];
            const color = colors[Math.floor(Math.random() * colors.length)];

            window.particleSystem.particles.push(new Particle(
                x, y, vx, vy, color, 15 + Math.random() * 10, 1 + Math.random() * 1.5, 0.1
            ));
        }

        // Add small screen shake for impact
        this.addScreenShake(3, 6);
    }

    createDistortionField(x, y, radius = 50) {
        // Create a distortion field for heat effects
        if (!this.distortionFields) {
            this.distortionFields = [];
        }

        this.distortionFields.push({
            x: x,
            y: y,
            radius: radius,
            intensity: 1.0,
            lifetime: 30,
            maxLifetime: 30
        });
    }

    updateDistortionFields() {
        if (!this.distortionFields) return;

        for (let i = this.distortionFields.length - 1; i >= 0; i--) {
            const field = this.distortionFields[i];
            field.lifetime--;
            field.intensity = field.lifetime / field.maxLifetime;

            if (field.lifetime <= 0) {
                this.distortionFields.splice(i, 1);
            }
        }
    }

    updateComboTracking() {
        if (this.comboTimer > 0) {
            this.comboTimer -= 1/60;
            if (this.comboTimer <= 0) {
                this.explosionCombo = 0;
            }
        }
    }

    trackExplosionCombo() {
        const currentTime = Date.now() / 1000; // Convert to seconds
        const timeSinceLastExplosion = currentTime - this.lastExplosionTime;

        if (timeSinceLastExplosion < 0.5) { // Within 0.5 seconds
            this.explosionCombo++;
            this.comboTimer = 1.0; // Reset combo timer

            // Create combo visual effects
            if (this.explosionCombo >= 3) {
                this.createComboEffect();
            }
        } else {
            this.explosionCombo = 1;
            this.comboTimer = 1.0;
        }

        this.lastExplosionTime = currentTime;
    }

    createComboEffect() {
        // Create special combo particles and effects
        const centerX = SCREEN_WIDTH / 2;
        const centerY = SCREEN_HEIGHT / 2;

        if (window.particleSystem) {
            // Create combo burst particles
            for (let i = 0; i < 20; i++) {
                const angle = (i / 20) * Math.PI * 2;
                const speed = 3 + Math.random() * 2;
                const vx = Math.cos(angle) * speed;
                const vy = Math.sin(angle) * speed;

                const colors = ['#ff00ff', '#00ffff', '#ffff00', '#ff0000', '#00ff00'];
                const color = colors[Math.floor(Math.random() * colors.length)];

                window.particleSystem.particles.push(new Particle(
                    centerX, centerY, vx, vy, color, 40, 2 + Math.random() * 2, 0.02
                ));
            }
        }

        // Add screen shake for combo
        this.addScreenShake(5, 12);
    }

    update() {
        if (this.gameState === STATE_ROUND_TRANSITION) {
            this.roundTransitionTimer -= 1 / 60;
            if (this.roundTransitionTimer <= 0) {
                this.resetRound();
            }
            return;
        }
        if (this.gameState === STATE_DEMO) {
            this.updatePlayers();
            this.updateBombs();
            this.updateParticles();
            this.handlePlayerCollisions();
            this.checkDemoEnd();
            return;
        }
        if (this.gameState !== STATE_PLAYING) return;

        this.updatePlayers();
        this.updateBombs();
        this.updateParticles();
        this.checkRoundEnd();
        this.handlePlayerCollisions();
    }

    updatePlayers() {
        this.player.update(this.bombs, this.aiPlayer, this.keys);
        this.aiPlayer.update(this.bombs, this.player, this.keys);
    }

    updateBombs() {
        for (let i = this.bombs.length - 1; i >= 0; i--) {
            const bomb = this.bombs[i];
            const wasExploded = bomb.exploded;
            bomb.update(this.platforms);

            // Check for platform impact (bomb just exploded due to collision)
            if (bomb.exploded && !wasExploded) {
                this.createImpactSparks(bomb.x + bomb.width / 2, bomb.y + bomb.height / 2);
            }

            if (bomb.isExplosionFinished()) {
                this.bombs.splice(i, 1);
            } else if (bomb.exploded) {
                // Check for damage (exclude bomb owner)
                const explosionRect = bomb.getExplosionRect();
                if (this.rectsOverlap(explosionRect, this.player.getRect()) && bomb.owner !== this.player) {
                    this.player.takeDamage(EXPLOSION_DAMAGE);
                }
                if (this.rectsOverlap(explosionRect, this.aiPlayer.getRect()) && bomb.owner !== this.aiPlayer) {
                    this.aiPlayer.takeDamage(EXPLOSION_DAMAGE);
                }
            }
        }
    }

    updateParticles() {
        // Update background particles
        for (const particle of this.backgroundParticles) {
            particle.y += particle.velY;
            if (particle.y < 0) {
                particle.y = SCREEN_HEIGHT;
                particle.x = Math.random() * SCREEN_WIDTH;
            }
        }

        // Update weather particles
        for (const particle of this.weatherParticles) {
            particle.y += particle.velY;
            if (this.weather === WEATHER_RAIN) {
                if (particle.y > SCREEN_HEIGHT) {
                    particle.y = 0;
                    particle.x = Math.random() * SCREEN_WIDTH;
                }
            } else if (this.weather === WEATHER_SNOW) {
                particle.x += Math.sin(particle.y * 0.01) * 0.5; // Slight horizontal drift
                if (particle.y > SCREEN_HEIGHT) {
                    particle.y = 0;
                    particle.x = Math.random() * SCREEN_WIDTH;
                }
            }
        }

        // Update explosion particles
        particleSystem.update();

        // Update distortion fields
        this.updateDistortionFields();

        // Update combo tracking
        this.updateComboTracking();

        // Update screen shake
        if (this.screenShake > 0) {
            this.screenShake--;
        }
    }

    checkRoundEnd() {
        if (!this.player.alive || !this.aiPlayer.alive) {
            if (!this.player.alive) {
                this.aiScore++;
            } else {
                this.playerScore++;
            }
            this.endRound();
        }
    }

    checkDemoEnd() {
        if (!this.player.alive || !this.aiPlayer.alive) {
            this.resetDemo();
        }
    }

    handlePlayerCollisions() {
        this.handleCollisions(this.player);
        this.handleCollisions(this.aiPlayer);
    }

    handleCollisions(player) {
        player.onGround = false;
        const playerRect = player.getRect();

        for (const platform of this.platforms) {
            const platformRect = platform.getRect();
            if (this.rectsOverlap(playerRect, platformRect)) {
                if (player.velY > 0 && playerRect.y < platformRect.y) {
                    player.y = platformRect.y - player.height;
                    player.velY = 0;
                    player.onGround = true;
                    player.jumpCount = 0;
                    platform.highlight(); // Visual feedback
                } else if (player.velY < 0 && playerRect.y + playerRect.height > platformRect.y + platformRect.height) {
                    player.y = platformRect.y + platformRect.height;
                    player.velY = 0;
                    platform.highlight(); // Visual feedback
                }
            }
        }
    }

    endRound() {
        // Capture the last frame for transition
        this.captureLastFrame();

        // Determine winner of the round
        if (!this.player.alive) {
            this.lastWinner = 'ai';
            this.aiScore++;
        } else {
            this.lastWinner = 'player';
            this.playerScore++;
        }

        this.currentRound++;
        if (this.currentRound > MAX_ROUNDS) {
            this.captureLastFrame();
            this.gameState = STATE_GAME_OVER;
            if (window.updateButtons) window.updateButtons();
        } else {
            this.gameState = STATE_ROUND_TRANSITION;
            this.roundTransitionTimer = 3;
        }
    }

    resetRound() {
        this.gameState = STATE_PLAYING;
        this.player = new Player(100, SCREEN_HEIGHT - 100, false);
        this.player.colorTint = this.playerColor;
        this.aiPlayer = new AIPlayer(SCREEN_WIDTH - 132, SCREEN_HEIGHT - 100);
        this.aiPlayer.colorTint = 'yellow'; // Hard coded for AI
        this.bombs = [];
        this.createRandomLevel();
        // Change background color for new round
        this.backgroundColorIndex = Math.floor(Math.random() * this.backgroundColors.length);
    }

    resetDemo() {
        this.player = new AIPlayer(100, SCREEN_HEIGHT - 100);
        this.player.colorTint = ['red', 'blue', 'green', 'yellow'][Math.floor(Math.random() * 4)]; // Random color
        this.aiPlayer = new AIPlayer(SCREEN_WIDTH - 132, SCREEN_HEIGHT - 100);
        this.aiPlayer.colorTint = ['purple', 'orange', 'cyan', 'pink'][Math.floor(Math.random() * 4)]; // Another random color
        this.bombs = [];
        this.createRandomLevel();
        this.backgroundColorIndex = Math.floor(Math.random() * this.backgroundColors.length);
    }

    captureLastFrame() {
        // Create offscreen canvas if not exists
        if (!this.offscreenCanvas) {
            this.offscreenCanvas = document.createElement('canvas');
            this.offscreenCanvas.width = SCREEN_WIDTH;
            this.offscreenCanvas.height = SCREEN_HEIGHT;
            this.offscreenCtx = this.offscreenCanvas.getContext('2d');
        }
        // Copy current canvas to offscreen
        this.offscreenCtx.drawImage(this.ctx.canvas, 0, 0);
    }

    draw() {
        if (this.gameState === STATE_GAME_OVER) {
            this.drawGameOverScreen();
            return;
        }
        if (this.gameState === STATE_ROUND_TRANSITION) {
            this.drawRoundTransition();
            return;
        }
        if (this.gameState === STATE_DEMO) {
            this.applyScreenShake();
            this.drawBackground();
            this.drawEntities();
            this.drawDemoUI();
            this.resetScreenShake();
            return;
        }

        this.applyScreenShake();
        this.drawBackground();
        this.drawEntities();
        this.drawDistortionEffects();
        this.drawUI();
        this.resetScreenShake();
    }

    applyScreenShake() {
        if (this.screenShake > 0) {
            const shakeX = (Math.random() - 0.5) * this.screenShakeIntensity;
            const shakeY = (Math.random() - 0.5) * this.screenShakeIntensity;
            this.ctx.translate(shakeX, shakeY);
            this.shakeX = shakeX;
            this.shakeY = shakeY;
        }
    }

    resetScreenShake() {
        if (this.screenShake > 0) {
            this.ctx.translate(-this.shakeX, -this.shakeY);
        }
    }

    drawBackground() {
        // Clear canvas with dynamic background
        this.ctx.fillStyle = this.backgroundColors[this.backgroundColorIndex];
        this.ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

        // Draw background particles
        this.ctx.fillStyle = WHITE;
        for (const particle of this.backgroundParticles) {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, 1, 0, Math.PI * 2);
            this.ctx.fill();
        }

        // Draw weather particles
        if (this.weather === WEATHER_RAIN) {
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            this.ctx.lineWidth = 1;
            for (const particle of this.weatherParticles) {
                this.ctx.beginPath();
                this.ctx.moveTo(particle.x, particle.y);
                this.ctx.lineTo(particle.x, particle.y + particle.length);
                this.ctx.stroke();
            }
        } else if (this.weather === WEATHER_SNOW) {
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            for (const particle of this.weatherParticles) {
                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
    }

    drawEntities() {
        // Draw platforms
        for (const platform of this.platforms) {
            platform.draw(this.ctx);
        }

        // Draw bombs
        for (const bomb of this.bombs) {
            bomb.draw(this.ctx);
        }

        // Draw players
        this.player.draw(this.ctx);
        this.aiPlayer.draw(this.ctx);

        // Draw explosion particles
        particleSystem.draw(this.ctx);
    }

    drawUI() {
        this.ctx.fillStyle = WHITE;
        this.ctx.font = '20px Arial';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`Round: ${this.currentRound}`, 10, 30);
        this.ctx.fillText(`Player: ${this.playerScore}`, 10, 60);
        this.ctx.fillText(`AI: ${this.aiScore}`, 10, 90);
        this.ctx.fillText(`Health: ${this.player.health}`, 10, 120);
        this.ctx.fillText(`AI Health: ${this.aiPlayer.health}`, 10, 150);

        // Draw combo counter if active
        if (this.explosionCombo >= 2) {
            this.ctx.fillStyle = '#ff00ff';
            this.ctx.font = '24px Arial';
            this.ctx.fillText(`Combo: ${this.explosionCombo}x`, 10, 180);
        }
    }

    drawDistortionEffects() {
        if (!this.distortionFields || this.distortionFields.length === 0) return;

        this.ctx.save();

        for (const field of this.distortionFields) {
            if (field.intensity <= 0) continue;

            this.ctx.globalAlpha = field.intensity * 0.3;
            this.ctx.strokeStyle = `rgba(255, 200, 100, ${field.intensity * 0.5})`;
            this.ctx.lineWidth = 2;

            // Draw distortion rings
            for (let i = 1; i <= 3; i++) {
                const ringRadius = field.radius * (0.5 + i * 0.3) * field.intensity;
                const waveOffset = Math.sin(Date.now() * 0.01 + i) * 5 * field.intensity;

                this.ctx.beginPath();
                this.ctx.arc(field.x + waveOffset, field.y, ringRadius, 0, Math.PI * 2);
                this.ctx.stroke();
            }

            // Draw heat lines
            this.ctx.strokeStyle = `rgba(255, 255, 200, ${field.intensity * 0.4})`;
            this.ctx.lineWidth = 1;

            for (let i = 0; i < 6; i++) {
                const angle = (i / 6) * Math.PI * 2;
                const startRadius = field.radius * 0.3;
                const endRadius = field.radius * 0.8;
                const waveOffset = Math.sin(Date.now() * 0.005 + i * 0.5) * 3 * field.intensity;

                this.ctx.beginPath();
                this.ctx.moveTo(
                    field.x + Math.cos(angle) * startRadius,
                    field.y + Math.sin(angle) * startRadius
                );
                this.ctx.lineTo(
                    field.x + Math.cos(angle) * endRadius + waveOffset,
                    field.y + Math.sin(angle) * endRadius + waveOffset
                );
                this.ctx.stroke();
            }
        }

        this.ctx.restore();
    }

    drawDemoUI() {
        this.ctx.fillStyle = WHITE;
        this.ctx.font = '24px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('JUMP BOMB BATTLE GO', SCREEN_WIDTH / 2, 30);
        this.ctx.fillText('Configure your game settings.', SCREEN_WIDTH / 2, 60);
        this.ctx.textAlign = 'left';
    }

    drawRoundTransition() {
        // Draw the frozen last frame
        if (this.offscreenCanvas) {
            this.ctx.drawImage(this.offscreenCanvas, 0, 0);
        }

        // Semi-transparent overlay
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

        // Winner sprite
        let winnerSprite, winnerName, winnerColor;
        if (this.lastWinner === 'player') {
            winnerSprite = this.player.sprites.idle;
            winnerName = 'Player Wins!';
            winnerColor = GREEN;
        } else {
            winnerSprite = this.aiPlayer.sprites.idle;
            winnerName = 'AI Wins!';
            winnerColor = RED;
        }

        // Draw winner sprite
        this.ctx.save();
        this.ctx.translate(SCREEN_WIDTH / 2 - 50, SCREEN_HEIGHT / 2 - 120);
        this.ctx.scale(2, 2); // Scale up for visibility
        this.ctx.drawImage(winnerSprite, 0, 0, PLAYER_WIDTH, PLAYER_HEIGHT);
        this.ctx.restore();

        // Winner name
        this.ctx.fillStyle = winnerColor;
        this.ctx.font = '36px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(winnerName, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2 - 10);

        // Score blurb
        this.ctx.fillStyle = WHITE;
        this.ctx.font = '24px Arial';
        const scoreText = `Score: Player ${this.playerScore} - AI ${this.aiScore}`;
        this.ctx.fillText(scoreText, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2 + 20);

        // Countdown timer
        const countdown = Math.ceil(this.roundTransitionTimer);
        this.ctx.fillStyle = YELLOW;
        this.ctx.font = '48px Arial';
        this.ctx.fillText(countdown.toString(), SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2 + 70);

        this.ctx.textAlign = 'left'; // Reset text alignment
    }

    drawGameOverScreen() {
        // Draw the frozen last frame
        if (this.offscreenCanvas) {
            this.ctx.drawImage(this.offscreenCanvas, 0, 0);
        }

        // Semi-transparent overlay
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

        // Game Over title
        this.ctx.fillStyle = WHITE;
        this.ctx.font = '48px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('GAME OVER', SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2 - 100);

        // Determine winner
        let winnerText, winnerColor;
        if (this.playerScore > this.aiScore) {
            winnerText = 'PLAYER WINS!';
            winnerColor = GREEN;
        } else if (this.aiScore > this.playerScore) {
            winnerText = 'AI WINS!';
            winnerColor = RED;
        } else {
            winnerText = 'IT\'S A TIE!';
            winnerColor = YELLOW;
        }

        // Winner announcement
        this.ctx.fillStyle = winnerColor;
        this.ctx.font = '36px Arial';
        this.ctx.fillText(winnerText, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2 - 40);

        // Final score
        this.ctx.fillStyle = WHITE;
        this.ctx.font = '24px Arial';
        const scoreText = `Final Score - Player: ${this.playerScore}  AI: ${this.aiScore}`;
        this.ctx.fillText(scoreText, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);

        // Exit button text
        this.ctx.fillStyle = YELLOW;
        this.ctx.font = '24px Arial';
        this.ctx.fillText('Press E to Exit to Menu', SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2 + 40);

        this.ctx.textAlign = 'left'; // Reset text alignment
    }

    run() {
        const gameLoop = () => {
            this.update();
            this.draw();
            if (this.running) {
                requestAnimationFrame(gameLoop);
            }
        };
        gameLoop();
    }

    loadAssets() {
        return Promise.all([
            this.loadImage(this.player.sprites.idle),
            this.loadImage(this.player.sprites.jump),
            ...this.player.sprites.walk.map(img => this.loadImage(img)),
            this.loadImage(this.aiPlayer.sprites.idle),
            this.loadImage(this.aiPlayer.sprites.jump),
            ...this.aiPlayer.sprites.walk.map(img => this.loadImage(img))
        ]);
    }

    loadImage(img) {
        return new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
        });
    }
}