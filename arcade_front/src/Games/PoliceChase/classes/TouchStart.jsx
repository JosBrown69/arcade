export class TouchStart {
    constructor({ game, width, height }) {
        this.game = game;
        this.position = {
            x: 0,
            y: 0,
        };
        this.width = width;
        this.height = height;
    }

    update(ctx) {
        this.draw(ctx);
    }

    draw(ctx) {
        ctx.fillStyle = 'rgba(0, 0, 255, 0.4)';
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}
