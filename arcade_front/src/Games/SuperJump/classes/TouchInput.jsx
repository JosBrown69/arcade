export class TouchInput {
    constructor({ game, position, width, height, direction }) {
        this.game = game;
        this.position = position;
        this.width = width;
        this.height = height;
        this.direction = direction;
    }

    detectTouch(ctx) {
        window.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            const rect = this.game.canvas.getBoundingClientRect();
            const touchX = touch.clientX - rect.left;
            const touchY = touch.clientY - rect.top;

            if (
                touchX >= this.position.x &&
                touchX <= this.position.x + this.width &&
                touchY >= this.position.y &&
                touchY <= this.position.y + this.height
            ) {
                if (this.direction === 'left') {
                    this.game.keys.left = true;
                } else if (this.direction === 'right') {
                    this.game.keys.right = true;
                } else if (this.direction === 'restart') {
                    this.game.reset(ctx)
                }
                
            }
        });

        window.addEventListener('touchend', () => {
            if (this.direction === 'left') {
                this.game.keys.left = false;
            } else if (this.direction === 'right') {
                this.game.keys.right = false;
            }
        });
    }

    draw(ctx) {
        ctx.fillStyle = 'rgba(0, 255, 0, 0.3)';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}
