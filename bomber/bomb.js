/**
 * Bomb class for explosive projectiles.
 */
class Bomb {
    /**
     * @param {number} x - Initial x position.
     * @param {number} y - Initial y position.
     * @param {Player} owner - The player who dropped the bomb.
     */
    constructor(x, y, owner) {
        this.x = x;
        this.y = y;
        this.owner = owner;
        this.width = BOMB_WIDTH;
        this.height = BOMB_HEIGHT;
        this.velX = 0;
        this.velY = 0;
        this.onGround = false;
        this.fuseTimer = BOMB_FUSE_TIME;
        this.explosionRadius = EXPLOSION_RADIUS;
        this.exploded = false;
        this.explosionTimer = 0;
        this.sprite = new Image();
        this.sprite.src = 'assets/sprites/bomb.png';

        // Bomb trail effects
        this.trailParticles = [];
        this.lastTrailX = x;
        this.lastTrailY = y;
        this.trailTimer = 0;
    }

    update(platforms) {
        if (this.exploded) {
            this.explosionTimer -= 1/60;
            this.updateTrailParticles();
            return;
        }

        this.fuseTimer -= 1/60;
        if (this.fuseTimer <= 0) {
            this.explode();
            return;
        }

        // Create trail particles
        this.createTrailParticles();

        this.velY += GRAVITY;

        this.x += this.velX;
        this.y += this.velY;

        // Screen wrapping
        if (this.x < 0) {
            this.x = SCREEN_WIDTH - this.width;
        } else if (this.x > SCREEN_WIDTH - this.width) {
            this.x = 0;
        }

        // Platform collision
        this.onGround = false;
        const bombRect = this.getRect();

        for (const platform of platforms) {
            const platformRect = platform.getRect();
            if (this.rectsOverlap(bombRect, platformRect)) {
                if (this.velY > 0 && bombRect.y + bombRect.height > platformRect.y && bombRect.y < platformRect.y) {
                    this.explode();
                    break;
                } else if (this.velY < 0 && bombRect.y < platformRect.y + platformRect.height && bombRect.y + bombRect.height > platformRect.y + platformRect.height) {
                    this.explode();
                    break;
                } else if (this.velX > 0 && bombRect.x + bombRect.width > platformRect.x && bombRect.x < platformRect.x) {
                    this.explode();
                    break;
                } else if (this.velX < 0 && bombRect.x < platformRect.x + platformRect.width && bombRect.x + bombRect.width > platformRect.x + platformRect.width) {
                    this.explode();
                    break;
                }
            }
        }
    }

    rectsOverlap(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }

    createTrailParticles() {
        this.trailTimer += 1/60;
        if (this.trailTimer >= 0.05) { // Create trail every 3 frames
            this.trailTimer = 0;

            // Calculate distance moved
            const dx = this.x - this.lastTrailX;
            const dy = this.y - this.lastTrailY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > 2) { // Only create trail if moved enough
                const trailX = this.x + this.width / 2;
                const trailY = this.y + this.height / 2;

                // Create fire trail particle
                if (window.particleSystem) {
                    window.particleSystem.particles.push(new Particle(
                        trailX, trailY,
                        -dx * 0.1, -dy * 0.1, // Opposite direction of movement
                        '#ff6600', 15, 2, 0.05
                    ));
                }

                this.lastTrailX = this.x;
                this.lastTrailY = this.y;
            }
        }
    }

    updateTrailParticles() {
        // Trail particles are managed by the global particle system
    }

    explode() {
        this.exploded = true;
        this.explosionTimer = EXPLOSION_DURATION;

        // Create explosion particles
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;
        particleSystem.createExplosion(centerX, centerY);

        // Add weather interaction effects
        if (window.gameInstance) {
            this.addWeatherEffects(centerX, centerY);
            // Create distortion field for heat effects
            window.gameInstance.createDistortionField(centerX, centerY, this.explosionRadius);
        }

        // Apply knockback to owner
        if (this.owner) {
            const ownerCenterX = this.owner.x + this.owner.width / 2;
            const ownerCenterY = this.owner.y + this.owner.height / 2;
            const dx = ownerCenterX - centerX;
            const dy = ownerCenterY - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance > 0) {
                const normalizedDx = dx / distance;
                const normalizedDy = dy / distance;
                this.owner.velX += normalizedDx * KNOCKBACK_FORCE;
                this.owner.velY += normalizedDy * KNOCKBACK_FORCE;
            }
        }

        // Trigger screen shake (will be handled by game)
        if (window.gameInstance) {
            window.gameInstance.addScreenShake(10, 20); // Increased intensity
            window.gameInstance.trackExplosionCombo(); // Track combo for rapid explosions
        }
    }

    addWeatherEffects(centerX, centerY) {
        if (!window.gameInstance || !window.particleSystem) return;

        const game = window.gameInstance;

        if (game.weather === WEATHER_RAIN) {
            // Create steam particles in rain
            for (let i = 0; i < 8; i++) {
                const angle = (Math.random() - 0.5) * Math.PI * 0.8; // Upward cone
                const speed = Math.random() * 1.5 + 0.5;
                const vx = Math.cos(angle) * speed;
                const vy = Math.sin(angle) * speed - Math.random() * 1;

                window.particleSystem.particles.push(new Particle(
                    centerX, centerY, vx, vy, 'rgba(200, 200, 255, 0.7)', 45 + Math.random() * 15, 3 + Math.random() * 2, -0.01
                ));
            }
        } else if (game.weather === WEATHER_NONE) {
            // Create floating embers in clear weather
            for (let i = 0; i < 6; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 1 + 0.3;
                const vx = Math.cos(angle) * speed;
                const vy = Math.sin(angle) * speed - Math.random() * 0.8;

                const colors = ['#ff4400', '#ff6600', '#ff8800'];
                const color = colors[Math.floor(Math.random() * colors.length)];

                window.particleSystem.particles.push(new Particle(
                    centerX, centerY, vx, vy, color, 90 + Math.random() * 30, 2 + Math.random(), -0.005
                ));
            }
        }
    }

    isExplosionFinished() {
        return this.exploded && this.explosionTimer <= 0;
    }

    getExplosionRect() {
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height / 2;
        return {
            x: centerX - this.explosionRadius,
            y: centerY - this.explosionRadius,
            width: this.explosionRadius * 2,
            height: this.explosionRadius * 2
        };
    }

    draw(ctx) {
        if (!this.exploded) {
            // Draw bomb sprite or fallback to drawn
            if (this.sprite.complete && this.sprite.naturalHeight !== 0) {
                ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
            } else {
                // Fallback: Draw bomb as circle
                ctx.fillStyle = BLACK;
                ctx.fillRect(this.x, this.y, this.width, this.height);
                ctx.fillStyle = RED;
                ctx.beginPath();
                ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2 - 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = YELLOW;
                ctx.beginPath();
                ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 4, 0, Math.PI * 2);
                ctx.fill();
            }
        } else {
            // Draw enhanced explosion with multiple visual effects
            const centerX = this.x + this.width / 2;
            const centerY = this.y + this.height / 2;
            const progress = 1 - (this.explosionTimer / EXPLOSION_DURATION);
            const currentRadius = this.explosionRadius * progress;

            // Save context for restoration
            ctx.save();

            // Brief white flash at start of explosion
            if (progress < 0.1) {
                ctx.globalAlpha = 1 - (progress * 10);
                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.arc(centerX, centerY, this.explosionRadius * 2, 0, Math.PI * 2);
                ctx.fill();
            }

            // Multi-layer glow effects
            // Outer glow (largest, most diffuse)
            ctx.shadowColor = 'rgb(255, 100, 0)';
            ctx.shadowBlur = 40;
            ctx.globalAlpha = Math.max(0, 0.3 - progress * 0.5);
            ctx.strokeStyle = 'rgba(255, 150, 0, 0.5)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(centerX, centerY, currentRadius * 1.5, 0, Math.PI * 2);
            ctx.stroke();

            // Middle glow
            ctx.shadowColor = 'rgb(255, 150, 0)';
            ctx.shadowBlur = 25;
            ctx.globalAlpha = Math.max(0, 0.5 - progress * 0.8);
            ctx.strokeStyle = 'rgba(255, 200, 0, 0.7)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(centerX, centerY, currentRadius * 1.2, 0, Math.PI * 2);
            ctx.stroke();

            // Inner glow (brightest, sharpest)
            ctx.shadowColor = 'rgb(255, 200, 100)';
            ctx.shadowBlur = 15;
            ctx.globalAlpha = Math.max(0, 0.8 - progress * 1.2);
            ctx.strokeStyle = 'rgb(255, 255, 150)';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(centerX, centerY, currentRadius, 0, Math.PI * 2);
            ctx.stroke();

            // Bright inner core
            ctx.shadowColor = 'rgb(255, 255, 200)';
            ctx.shadowBlur = 10;
            ctx.globalAlpha = Math.max(0, 1 - progress * 2);
            ctx.fillStyle = 'rgb(255, 255, 200)';
            ctx.beginPath();
            ctx.arc(centerX, centerY, currentRadius * 0.4, 0, Math.PI * 2);
            ctx.fill();

            // Shockwave ring (fast-expanding transparent ring)
            const shockwaveProgress = Math.max(0, progress - 0.1);
            const shockwaveRadius = this.explosionRadius * (1 + shockwaveProgress * 3);
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            ctx.globalAlpha = Math.max(0, 0.6 - shockwaveProgress * 2);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(centerX, centerY, shockwaveRadius, 0, Math.PI * 2);
            ctx.stroke();

            // Multiple expanding rings for layered effect
            for (let i = 1; i <= 5; i++) {
                const ringProgress = Math.max(0, progress - (i * 0.15));
                const ringRadius = this.explosionRadius * ringProgress;
                const ringAlpha = Math.max(0, 1 - ringProgress * 2.5);

                ctx.globalAlpha = ringAlpha * 0.4;
                ctx.strokeStyle = i % 3 === 0 ? 'rgb(255, 255, 100)' : (i % 3 === 1 ? 'rgb(255, 150, 0)' : 'rgb(255, 100, 50)');
                ctx.lineWidth = i === 1 ? 4 : (i === 2 ? 3 : 2);
                ctx.beginPath();
                ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
                ctx.stroke();
            }

            // Heat distortion effect (subtle wavy lines)
            if (progress < 0.7) {
                ctx.globalAlpha = Math.max(0, 0.3 - progress);
                ctx.strokeStyle = 'rgba(255, 200, 100, 0.5)';
                ctx.lineWidth = 1;

                for (let i = 0; i < 8; i++) {
                    const angle = (i / 8) * Math.PI * 2;
                    const startRadius = currentRadius * 0.5;
                    const endRadius = currentRadius * 1.5;
                    const waveOffset = Math.sin(progress * 20 + i) * 10;

                    ctx.beginPath();
                    ctx.moveTo(
                        centerX + Math.cos(angle) * startRadius,
                        centerY + Math.sin(angle) * startRadius
                    );
                    ctx.lineTo(
                        centerX + Math.cos(angle) * endRadius + waveOffset,
                        centerY + Math.sin(angle) * endRadius + waveOffset
                    );
                    ctx.stroke();
                }
            }

            // Reset all effects
            ctx.restore();
        }
    }

    getRect() {
        return { x: this.x, y: this.y, width: this.width, height: this.height };
    }
}