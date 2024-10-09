import { collisions } from './Collisions';

export class Player {
    constructor({ imageSrc, game, obstacles, canvas }) {
        this.game = game;
        this.canvas = canvas;
        this.position = {
            x: canvas.width / 2 - 10,
            y: 420,
        };
        this.obstacles = obstacles;
        this.image = new Image();
        this.image.src = imageSrc;
        this.speed = 0;
        this.width = 45;
        this.height = 90;
    }

    detectCollisions() {
        for (let i = 0; i < this.obstacles.length; i++) {
            const obstacle = this.obstacles[i];
            if (collisions({ player: this, object: obstacle })) {
                this.game.state = 'gameOver'
            }
        }
    }

    keepInLane() {
        if (this.position.x < 30) {
            this.position.x = 30;
        }
        if (this.position.x + this.width > this.canvas.width - 30) {
            this.position.x = this.canvas.width - this.width - 30;
        }
    }

    update(ctx) {
        this.position.x += this.speed;
        this.draw(ctx);
        this.listeners();
        this.controls();
        this.keepInLane();
        this.detectCollisions();
    }
    reset() {
        this.position = {
            x: this.canvas.width / 2 - 10,
            y: 420,
        };
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y);
    }

    listeners() {
        window.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowLeft':
                    this.game.keys.left = true;
                    break;
                case 'ArrowRight':
                    this.game.keys.right = true;
                    break;
            }
        });
        window.addEventListener('keyup', (e) => {
            switch (e.key) {
                case 'ArrowLeft':
                    this.game.keys.left = false;
                    break;
                case 'ArrowRight':
                    this.game.keys.right = false;
                    break;
            }
        });
    }

    controls() {
        if (this.game.keys.left) {
            this.speed = -7;
        } else if (this.game.keys.right) {
            this.speed = 7;
        } else {
            this.speed = 0;
        }
    }
}
