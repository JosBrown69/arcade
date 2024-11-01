export class TouchInput {
    constructor({ game, position, width, height, direction }) {
        this.game = game;
        this.position = position;
        this.width = width;
        this.height = height;
        this.direction = direction;
    }

    detectTouch() {
        window.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            const touchX = touch.clientX;
            const touchY = touch.clientY;

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
