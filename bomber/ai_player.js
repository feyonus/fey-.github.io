/**
 * AI Player class extending Player with AI behavior.
 */
class AIPlayer extends Player {
    /**
     * @param {number} x - Initial x position.
     * @param {number} y - Initial y position.
     * @param {string} difficulty - AI difficulty level.
     */
    constructor(x, y, difficulty = "medium") {
        super(x, y, true); // Green tint
        this.targetX = x;
        this.decisionTimer = 0;
        this.difficulty = difficulty;
        this.setDifficultyParams();
    }

    setDifficultyParams() {
        if (this.difficulty === "easy") {
            this.decisionInterval = 0.6;
            this.aggressionChance = 0.4;
            this.defensiveRange = 100;
        } else if (this.difficulty === "medium") {
            this.decisionInterval = 0.3;
            this.aggressionChance = 0.6;
            this.defensiveRange = 120;
        } else if (this.difficulty === "hard") {
            this.decisionInterval = 0.15;
            this.aggressionChance = 0.9;
            this.defensiveRange = 150;
        }
    }

    aiUpdate(otherPlayer, bombsList) {
        if (!otherPlayer || !otherPlayer.alive) return;

        this.decisionTimer += 1/60;
        if (this.decisionTimer >= this.decisionInterval) {
            this.makeDecision(otherPlayer, bombsList);
            this.decisionTimer = 0;
        }

        this.executeMovement();
    }

    makeDecision(otherPlayer, bombsList) {
        const playerCenter = otherPlayer.x + otherPlayer.width / 2;
        const aiCenter = this.x + this.width / 2;
        const distance = Math.abs(playerCenter - aiCenter);

        if (distance > this.defensiveRange + 50) {
            if (Math.random() < this.aggressionChance) {
                this.targetX = playerCenter < aiCenter ? otherPlayer.x - 50 : otherPlayer.x + otherPlayer.width + 50;
            } else {
                this.targetX = this.x;
            }
        } else if (distance < this.defensiveRange - 30) {
            this.targetX = playerCenter < aiCenter ? this.x + 120 : this.x - 120;
        } else {
            this.targetX = this.x + (Math.random() - 0.5) * 40;
        }

        if (this.onGround && otherPlayer.y < this.y - 20 && this.jumpCount < this.maxJumps) {
            this.velY = JUMP_VELOCITY;
            this.jumpCount += 1;
            if (this.jumpCount === 1) {
                this.onGround = false;
            }
        }

        if (this.bombCooldown <= 0 && bombsList && distance < 100) {
            this.dropBomb(bombsList);
        }
    }

    executeMovement() {
        if (this.targetX < this.x - 10) {
            this.velX = -PLAYER_SPEED;
            this.facingRight = false;
        } else if (this.targetX > this.x + 10) {
            this.velX = PLAYER_SPEED;
            this.facingRight = true;
        } else {
            this.velX *= FRICTION;
        }
    }

    // takeDamage is inherited from Player class
}