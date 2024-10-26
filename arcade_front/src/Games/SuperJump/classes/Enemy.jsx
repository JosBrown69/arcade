import enemyLeft from '../assets/enemyLeft.png';
import enemyRight from '../assets/enemyRight.png';

export class Enemy {
    constructor({ game, position }) {
        this.game = game;
        this.image = new Image();
        this.width = 50;
        this.height = 50;
        this.position = position;
        this.direction = 'right';
        this.speed = {
            x: 0,
            y: 0,
        };
        this.free = true;
    }

    render(ctx) {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        this.draw(ctx);
        this.keepInScreen();
        this.changeSprite();
        this.movement();
        if (this.position.y > this.game.height) {
            this.reset();
        }
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y);
    }

    start(){
        this.free = false
    }

    reset() {
        let rightBorder = this.game.width - 44
        this.free = true;
        this.position.y = Math.random() * (-1500 * 3 + 1000) - 1000;
        this.position.x = Math.random() * (rightBorder - 4) + 4;
    }

    keepInScreen() {
        if (this.position.x < 4) {
            this.direction = 'right';
        }
        if (this.position.x + this.width > this.game.width - 4) {
            this.direction = 'left';
        }
    }

    changeSprite() {
        if (this.direction === 'right') {
            this.image.src = enemyRight;
        }
        if (this.direction === 'left') {
            this.image.src = enemyLeft;
        }
    }

    keepInScreen() {
        if (this.position.x < 4) {
            this.direction = 'right';
        }
        if (this.position.x + this.width > this.game.width - 4) {
            this.direction = 'left';
        }
    }

    movement() {
        if (this.direction === 'right') {
            this.speed.x = 0;
        }
        if (this.direction === 'left') {
            this.speed.x = -0;
        }
    }
}
