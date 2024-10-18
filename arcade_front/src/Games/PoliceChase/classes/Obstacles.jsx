import redCarImage from '../assets/RedCar.png';
import orangeCarImage from '../assets/OrangeCar.png';
import brownCarImage from '../assets/BrownCar.png';
import greenCarImage from '../assets/GreenCar.png';

export class Obstacles {
    constructor({ position, imageSrc, game }) {
        this.game = game;
        this.position = position;
        this.width = 45;
        this.height = 90;
        this.speed = 5;
        this.image = new Image();
        this.image.src = imageSrc;
        this.free = true;
        this.rightBorder = game.width - 30;
    }
    draw(ctx) {
        if (!this.free) {
            ctx.drawImage(
                this.image,
                this.position.x,
                this.position.y,
                this.width,
                this.height
            );
        }
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
    increaseSpeed() {
        this.speed += 1;
    }
    start() {
        this.free = false;
    }
    reset() {
        this.free = true;
        this.position.y = -this.game.height - 250;
        this.position.x = Math.random() * (this.rightBorder - 75) + 30;
        let sprites = [
            brownCarImage,
            greenCarImage,
            orangeCarImage,
            redCarImage,
        ];
        const randomSprite = Math.floor(Math.random() * sprites.length);
        this.image.src = sprites[randomSprite];
    }
}