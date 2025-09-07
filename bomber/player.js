/**
 * Player class representing a game character.
 */
class Player {
    /**
     * @param {number} x - Initial x position.
     * @param {number} y - Initial y position.
     * @param {boolean} isAI - Whether this is an AI player.
     */
    constructor(x, y, isAI = false) {
        this.x = x;
        this.y = y;
        this.width = PLAYER_WIDTH;
        this.height = PLAYER_HEIGHT;
        this.velX = 0;
        this.velY = 0;
        this.onGround = false;
        this.facingRight = true;
        this.isAI = isAI;
        this.colorTint = 'none';

        this.jumpCount = 0;
        this.maxJumps = 2;

        this.health = MAX_HEALTH;
        this.alive = true;

        this.bombCooldown = 0;
        this.bombCooldownMax = 1.0;
        this.maxBombs = 1;
        this.currentBombs = 0;

        this.speedMultiplier = 1.0;

        // Load sprites (simplified)
        this.sprites = {
            idle: new Image(),
            walk: [new Image(), new Image(), new Image(), new Image()],
            jump: new Image()
        };
        this.loadSprites();

        this.currentAnimation = 'idle';
        this.animationFrame = 0;
        this.animationTimer = 0;

        // Motion trail effects
        this.lastTrailX = x;
        this.lastTrailY = y;
        this.trailTimer = 0;
    }

    loadSprites() {
        this.sprites.idle.src = 'assets/sprites/mario_idle.png';
        this.sprites.jump.src = 'assets/sprites/mario_jump.png';
        const walkFiles = ['mario_walk_0.png', 'mario_walk_1.png', 'mario_walk_2.png', 'mario_walk_3.png'];
        for (let i = 0; i < 4; i++) {
            this.sprites.walk[i].src = `assets/sprites/${walkFiles[i]}`;
        }
    }

    update(bombsList = null, otherPlayer = null, keys = {}) {
        if (!this.alive) return;

        if (this.bombCooldown > 0) {
            this.bombCooldown -= 1/60;
        }

        if (!this.isAI) {
            // Handle input
            if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
                this.velX = -PLAYER_SPEED * this.speedMultiplier;
                this.facingRight = false;
            } else if (keys['ArrowRight'] || keys['d'] || keys['D']) {
                this.velX = PLAYER_SPEED * this.speedMultiplier;
                this.facingRight = true;
            } else {
                this.velX *= FRICTION;
            }

            if ((keys[' '] || keys['ArrowUp'] || keys['w'] || keys['W']) && this.jumpCount < this.maxJumps) {
                this.velY = JUMP_VELOCITY;
                this.jumpCount += 1;
                if (this.jumpCount === 1) {
                    this.onGround = false;
                }
            }

            if ((keys['x'] || keys['X'] || keys['ArrowDown'] || keys['s'] || keys['S']) && this.bombCooldown <= 0 && bombsList) {
                this.dropBomb(bombsList);
            }
        } else if (this.aiUpdate) {
            this.aiUpdate(otherPlayer, bombsList);
        }

        this.velY += GRAVITY;

        this.x += this.velX;
        this.y += this.velY;

        // Screen wrapping
        if (this.x < 0) {
            this.x = SCREEN_WIDTH - this.width;
        } else if (this.x > SCREEN_WIDTH - this.width) {
            this.x = 0;
        }

        // Create motion trail effects
        this.createMotionTrail();

        this.updateAnimation();
    }

    updateAnimation() {
        if (!this.onGround) {
            this.currentAnimation = 'jump';
        } else if (Math.abs(this.velX) > 0.1) {
            this.currentAnimation = 'walk';
        } else {
            this.currentAnimation = 'idle';
        }

        this.animationTimer += 1/60;
        if (this.currentAnimation === 'walk') {
            this.animationFrame = Math.floor(this.animationTimer / ANIMATION_SPEED) % 4;
        } else {
            this.animationFrame = 0;
        }
    }

    createMotionTrail() {
        this.trailTimer += 1/60;
        if (this.trailTimer >= 0.08) { // Create trail every 5 frames
            this.trailTimer = 0;

            // Calculate movement speed
            const speed = Math.sqrt(this.velX * this.velX + this.velY * this.velY);

            // Only create trail if moving fast enough
            if (speed > 2 || !this.onGround) {
                const trailX = this.x + this.width / 2;
                const trailY = this.y + this.height / 2;

                // Create motion trail particle
                if (window.particleSystem) {
                    // Determine trail color based on player color
                    let trailColor = '#ffffff';
                    switch (this.colorTint) {
                        case 'red': trailColor = '#ff6666'; break;
                        case 'blue': trailColor = '#6666ff'; break;
                        case 'green': trailColor = '#66ff66'; break;
                        case 'yellow': trailColor = '#ffff66'; break;
                        case 'purple': trailColor = '#ff66ff'; break;
                        case 'orange': trailColor = '#ffaa66'; break;
                        case 'cyan': trailColor = '#66ffff'; break;
                        case 'pink': trailColor = '#ff99cc'; break;
                        case 'teal': trailColor = '#66ffaa'; break;
                        default: trailColor = '#cccccc'; break;
                    }

                    // Create multiple trail particles for more effect
                    for (let i = 0; i < 2; i++) {
                        const offsetX = (Math.random() - 0.5) * this.width * 0.6;
                        const offsetY = (Math.random() - 0.5) * this.height * 0.6;

                        window.particleSystem.particles.push(new Particle(
                            trailX + offsetX, trailY + offsetY,
                            -this.velX * 0.1 + (Math.random() - 0.5) * 0.5, // Slight randomization
                            -this.velY * 0.1 + (Math.random() - 0.5) * 0.5,
                            trailColor, 20 + Math.random() * 10, 1.5 + Math.random(), 0.02
                        ));
                    }
                }

                this.lastTrailX = this.x;
                this.lastTrailY = this.y;
            }
        }
    }

    dropBomb(bombsList) {
        const bombX = this.x + this.width / 2 - BOMB_WIDTH / 2;
        const bombY = this.y + this.height - BOMB_HEIGHT;
        bombsList.push(new Bomb(bombX, bombY, this));
        this.bombCooldown = this.bombCooldownMax;
    }

    aiUpdate(otherPlayer, bombsList) {
        if (!otherPlayer || !otherPlayer.alive) return;

        const playerCenter = otherPlayer.x + otherPlayer.width / 2;
        const aiCenter = this.x + this.width / 2;

        if (playerCenter < aiCenter - 50) {
            this.velX = -PLAYER_SPEED;
            this.facingRight = false;
        } else if (playerCenter > aiCenter + 50) {
            this.velX = PLAYER_SPEED;
            this.facingRight = true;
        } else {
            this.velX *= FRICTION;
        }

        if (this.onGround && otherPlayer.y < this.y - 20) {
            this.velY = JUMP_VELOCITY;
            this.onGround = false;
        }

        if (this.bombCooldown <= 0 && bombsList) {
            const distance = Math.abs(playerCenter - aiCenter);
            if (distance < 100) {
                this.dropBomb(bombsList);
            }
        }
    }



    draw(ctx) {
        if (!this.alive) return;

        let sprite;
        if (this.currentAnimation === 'walk') {
            sprite = this.sprites.walk[this.animationFrame];
        } else if (this.currentAnimation === 'jump') {
            sprite = this.sprites.jump;
        } else {
            sprite = this.sprites.idle;
        }

        ctx.save();
        // Apply color tint
        if (this.colorTint !== 'none') {
            switch (this.colorTint) {
                case 'blue':
                    ctx.filter = 'hue-rotate(240deg)';
                    break;
                case 'green':
                    ctx.filter = 'hue-rotate(120deg)';
                    break;
                case 'red':
                    ctx.filter = 'hue-rotate(0deg)';
                    break;
                case 'yellow':
                    ctx.filter = 'hue-rotate(60deg)';
                    break;
                case 'purple':
                    ctx.filter = 'hue-rotate(270deg)';
                    break;
                case 'orange':
                    ctx.filter = 'hue-rotate(30deg)';
                    break;
                case 'cyan':
                    ctx.filter = 'hue-rotate(180deg)';
                    break;
                case 'pink':
                    ctx.filter = 'hue-rotate(300deg)';
                    break;
                case 'teal':
                    ctx.filter = 'hue-rotate(150deg)';
                    break;
            }
        }
        if (!this.facingRight) {
            ctx.scale(-1, 1);
            ctx.drawImage(sprite, -this.x - this.width, this.y, this.width, this.height);
        } else {
            ctx.drawImage(sprite, this.x, this.y, this.width, this.height);
        }
        ctx.restore();
    }

    takeDamage(damage) {
        this.health -= damage;
        if (this.health <= 0) {
            this.alive = false;
            this.health = 0;
        }

        // Add screen flash effect
        if (window.gameInstance) {
            window.gameInstance.addScreenShake(3, 8);
        }

        // Create damage particles
        if (window.particleSystem) {
            for (let i = 0; i < 8; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 3 + 1;
                const vx = Math.cos(angle) * speed;
                const vy = Math.sin(angle) * speed - Math.random() * 2;

                const colors = ['#ff0000', '#ff4444', '#ff8888'];
                const color = colors[Math.floor(Math.random() * colors.length)];

                window.particleSystem.particles.push(
                    new Particle(this.x + this.width/2, this.y + this.height/2, vx, vy, color, 30, 2)
                );
            }
        }
    }

    getRect() {
        return { x: this.x, y: this.y, width: this.width, height: this.height };
    }
}