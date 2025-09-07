/**
 * Platform class for solid surfaces.
 */
class Platform {
    /**
     * @param {number} x - X position.
     * @param {number} y - Y position.
     * @param {number} width - Width of the platform.
     * @param {number} height - Height of the platform.
     * @param {string} color - Color of the platform.
     */
    constructor(x, y, width, height, color = GREEN) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.highlightTimer = 0;
    }

    draw(ctx) {
        let drawColor = this.color;
        if (this.highlightTimer > 0) {
            // Brighten the color when highlighted
            drawColor = this.lightenColor(this.color, 0.3);
            this.highlightTimer--;
        }
        ctx.fillStyle = drawColor;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    highlight() {
        this.highlightTimer = 15; // Highlight for 15 frames
    }

    lightenColor(color, percent) {
        // Simple color lightening for highlight effect
        if (color.startsWith('rgb')) {
            const rgb = color.match(/\d+/g);
            const r = Math.min(255, Math.floor(parseInt(rgb[0]) * (1 + percent)));
            const g = Math.min(255, Math.floor(parseInt(rgb[1]) * (1 + percent)));
            const b = Math.min(255, Math.floor(parseInt(rgb[2]) * (1 + percent)));
            return `rgb(${r}, ${g}, ${b})`;
        }
        return color;
    }

    getRect() {
        return { x: this.x, y: this.y, width: this.width, height: this.height };
    }
}