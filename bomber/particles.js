class Particle {
    constructor(x, y, vx, vy, color, lifetime, size = 3, gravity = 0.1) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.lifetime = lifetime;
        this.maxLifetime = lifetime;
        this.size = size;
        this.gravity = gravity;
        this.alpha = 1.0;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity; // Apply gravity
        this.lifetime--;
        this.alpha = Math.max(0, this.lifetime / this.maxLifetime);
    }

    draw(ctx) {
        if (this.lifetime > 0) {
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1.0;
        }
    }

    isDead() {
        return this.lifetime <= 0;
    }
}

class ParticleSystem {
    constructor() {
        this.particles = [];
    }

    createExplosion(x, y) {
        const centerX = x;
        const centerY = y;
        const MAX_PARTICLES = 200; // Increased limit for more dramatic effects

        // Performance check - don't create too many particles
        if (this.particles.length > MAX_PARTICLES - 80) {
            return; // Skip creating new particles if we're near the limit
        }

        // Create fire particles (orange/red) - increased count and size
        for (let i = 0; i < 20; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5 + 1.5;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed - Math.random() * 2.5;

            const colors = ['#ff6600', '#ff3300', '#ffaa00', '#ff0000', '#ff8800'];
            const color = colors[Math.floor(Math.random() * colors.length)];

            this.particles.push(new Particle(centerX, centerY, vx, vy, color, 50 + Math.random() * 20, 3 + Math.random() * 3));
        }

        // Create smoke particles (gray) - increased count and size
        for (let i = 0; i < 12; i++) {
            const angle = (Math.random() - 0.5) * Math.PI * 0.7; // Slightly wider upward cone
            const speed = Math.random() * 2 + 0.8;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed - Math.random() * 1.5;

            const colors = ['#666666', '#888888', '#aaaaaa', '#bbbbbb'];
            const color = colors[Math.floor(Math.random() * colors.length)];

            this.particles.push(new Particle(centerX, centerY, vx, vy, color, 70 + Math.random() * 40, 4 + Math.random() * 3, -0.015));
        }

        // Create debris particles (dark) - increased count and size
        for (let i = 0; i < 15; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 4 + 1.5;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed - Math.random() * 2.5;

            const colors = ['#333333', '#222222', '#444444', '#111111'];
            const color = colors[Math.floor(Math.random() * colors.length)];

            this.particles.push(new Particle(centerX, centerY, vx, vy, color, 35 + Math.random() * 25, 1.5 + Math.random() * 2));
        }

        // Create spark particles (bright) - increased count and size
        for (let i = 0; i < 20; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 8 + 3;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed - Math.random() * 4;

            const colors = ['#ffffff', '#ffff00', '#ffdd00', '#ffaa00', '#ffffff'];
            const color = colors[Math.floor(Math.random() * colors.length)];

            this.particles.push(new Particle(centerX, centerY, vx, vy, color, 25 + Math.random() * 20, 1.5 + Math.random() * 2));
        }

        // Create shockwave particles (expanding rings)
        for (let i = 0; i < 8; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 3 + 1;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed;

            this.particles.push(new Particle(centerX, centerY, vx, vy, 'rgba(255, 255, 255, 0.8)', 40 + Math.random() * 20, 0.5, 0));
        }

        // Create ember particles (glowing hot spots)
        for (let i = 0; i < 10; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 2 + 0.5;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed - Math.random() * 1;

            const colors = ['#ff4400', '#ff6600', '#ff8800'];
            const color = colors[Math.floor(Math.random() * colors.length)];

            this.particles.push(new Particle(centerX, centerY, vx, vy, color, 80 + Math.random() * 40, 2 + Math.random() * 2, -0.01));
        }
    }

    update() {
        this.particles = this.particles.filter(particle => !particle.isDead());
        this.particles.forEach(particle => particle.update());
    }

    draw(ctx) {
        this.particles.forEach(particle => particle.draw(ctx));
    }

    getParticleCount() {
        return this.particles.length;
    }
}

// Global particle system instance
const particleSystem = new ParticleSystem();
window.particleSystem = particleSystem;