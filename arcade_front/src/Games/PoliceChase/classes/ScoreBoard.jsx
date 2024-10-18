export class ScoreBoard {
    constructor() {
        this.position = {
            x: 50,
            y: 50,
        };
        this.score = 0;
    }

    update() {
        this.score += 1;
    }

    draw(ctx) {
        ctx.font = '50px Arial';
        ctx.fillText(`${this.score}`, this.position.x, this.position.y);
    }

    reset() {
        this.score = 0;
    }
}
