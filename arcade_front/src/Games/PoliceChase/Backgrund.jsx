export class Background {
    constructor({ imageSrc, position, game, canvas }) {
        this.game = game;
        this.canvas = canvas
        this.image = new Image();
        this.image.src = imageSrc;
        this.position = position;
        this.speed = 2;
        this.free = true;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y);
    }
    update(ctx) {
        if (!this.free) {
            this.position.y += this.speed;
            this.draw(ctx);
            if (this.position.y > this.game.height) {
                this.reset();
            }
        }
    }
    start() {
        this.free = false;
    }
    reset() {
        this.free = true;
        this.position.y = -this.game.height;
    }
}