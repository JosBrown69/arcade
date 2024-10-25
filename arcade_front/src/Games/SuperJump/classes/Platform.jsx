export class Platform {
    constructor({ game, position, imageSrc, moving }) {
        this.position = position;
        this.image = new Image();
        this.image.src = imageSrc;
        this.width = 60;
        this.height = 15;
        this.game = game;
        this.speed = {
            x: 0,
            y: 0,
        };
        this.moving = moving;
        this.direction = 'right';
        this.free = true;
    }

    render(ctx) {
        if (this.free) {
            this.position.x += this.speed.x;
            this.position.y += this.speed.y;
            this.draw(ctx);
            this.keepInScreen();
            this.movement();
            if (this.position.y > this.game.height) {
                this.reset();
            }
        }
    }

    draw(ctx) {
        if (this.free) {
            ctx.drawImage(this.image, this.position.x, this.position.y - 20);
        }
    }

    start() {
        this.free = false;
    }

    reset() {
        let rightBorder = this.game.width - 44
        this.free = true;
        this.position.y = Math.random() * -10;
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

    movement() {
        if (this.moving) {
            if (this.direction === 'right') {
                this.speed.x = 3;
            }
            if (this.direction === 'left') {
                this.speed.x = -3;
            }
        }
    }
}
