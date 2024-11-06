import { Background } from './classes/Backgrund';
import { Player } from './classes/Player';
import { Obstacles } from './classes/Obstacles';
import { ScoreBoard } from './classes/ScoreBoard';
import { TouchInput } from './classes/TouchInput';
import mapImage from './assets/map.png';
import redCarImage from './assets/RedCar.png';
import orangeCarImage from './assets/OrangeCar.png';
import brownCarImage from './assets/BrownCar.png';
import greenCarImage from './assets/GreenCar.png';
import playerImage from './assets/PoliceCar.png';

export class Game {
    constructor({ canvas, ctx }) {
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.state = 'start';
        this.backgrounds = 10;
        this.backgroundPool = [];
        this.obstacles = 5;
        this.obstaclePool = [];
        this.createBackground();
        this.getBackground();
        this.createObstacles();
        this.getObstacles();
        this.timeUpdates();
        this.keys = {
            left: false,
            right: false,
        };
        this.touchLeft = new TouchInput({
            game: this,
            position: { x: 0, y: 0 },
            width: this.width / 2,
            height: this.height,
            direction: 'left',
        });
        this.touchRight = new TouchInput({
            game: this,
            position: { x: this.width / 2, y: 0 },
            width: this.width / 2,
            height: this.height,
            direction: 'right',
        });
        this.touchRestart = new TouchInput({
            game: this,
            position: { x: 0, y: 0 },
            width: this.width,
            height: 150,
            direction: 'restart',
        });
        if (playerImage) {
            this.player = new Player({
                game: this,
                imageSrc: playerImage,
                obstacles: this.obstaclePool,
                canvas: this.canvas,
            });
        }
        this.score = new ScoreBoard();
        this.points = 0;
    }

    render(ctx, setPoints) {
        switch (this.state) {
            case 'start':
                this.start(ctx);
                this.touchRestart.detectTouch(ctx);
                break;
            case 'playing':
                this.backgroundPool.forEach((background) => {
                    background.start();
                    background.update(ctx);
                });
                this.obstaclePool.forEach((obstacle) => {
                    obstacle.start();
                    obstacle.update(ctx);
                });
                this.player.update(ctx);
                this.touchLeft.detectTouch(ctx);
                this.touchRight.detectTouch(ctx);
                this.score.draw(ctx);
                break;
            case 'gameOver':
                this.saveScore();
                this.gameOver(ctx, setPoints);
                this.touchRestart.detectTouch(ctx);
                break;
        }
    }

    start(ctx) {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.font = '50px Arial';
        ctx.fillText('Police Chase', 35, this.height / 2);
        ctx.font = '20px Arial';
        ctx.fillText('Use left & right', 120, this.height / 2 + 50);
        ctx.fillText('keys to move', 125, this.height / 2 + 80);
        ctx.fillText('Press space bar to start', 75, this.height / 2 + 200);
        ctx.font = '20px Arial';
        ctx.fillText('Touch here to start!', 95, 50);
    }

    playing() {
        this.state = 'playing';
    }

    gameOver(ctx, setPoints) {
        this.saveScore();
        setPoints(this.points);
        clearInterval(this.scoreInterval);
        clearInterval(this.speedInterval);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
        ctx.font = '50px Arial';
        ctx.fillText('Game Over', 50, this.height / 2);
        ctx.font = '40px Arial';
        ctx.fillText(`Score ${this.points}`, 50, this.height / 2 + 70);
        ctx.font = '20px Arial';
        ctx.fillText('Press space bar to start', 75, this.height / 2 + 200);
        ctx.font = '20px Arial';
        ctx.fillText('Touch here to restart!', 95, 50);
    }

    reset(ctx) {
        this.obstaclePool = [];
        this.createObstacles();
        this.score.reset();
        this.player.reset();
        this.player.obstacles = this.obstaclePool;
        ctx.fillStyle = 'black';
        this.state = 'playing';
        clearInterval(this.scoreInterval);
        clearInterval(this.speedInterval);
        this.timeUpdates();
    }

    createBackground() {
        if (mapImage) {
            for (let i = 0; i < this.backgrounds; i++) {
                let positionY = -this.height * i;
                this.backgroundPool.push(
                    new Background({
                        game: this,
                        imageSrc: mapImage,
                        position: { x: 0, y: positionY },
                        canvas: this.canvas,
                    })
                );
            }
        }
    }

    saveScore() {
        this.points = this.score.score;
    }

    timeUpdates() {
        this.scoreInterval = setInterval(() => {
            this.score.update();
        }, 1000);

        const speedUpdateInterval =
            this.obstaclePool[0].speed < 10 ? 10000 : 15000;

        this.speedInterval = setInterval(() => {
            this.obstaclePool.forEach((obstacle) => {
                obstacle.increaseSpeed();
            });
        }, speedUpdateInterval);
    }

    getBackground() {
        for (let i = 0; i < this.backgroundPool; i++) {
            if (this.backgroundPool[i].free) return this.backgroundPool[i];
        }
    }

    createObstacles() {
        if (redCarImage && brownCarImage && greenCarImage && orangeCarImage) {
            for (let i = 0; i < this.obstacles; i++) {
                let rightBorder = this.width - 75;
                let positionY = -280 * i;
                let positionX = Math.random() * (rightBorder - 30) + 30;
                let sprites = [
                    redCarImage,
                    brownCarImage,
                    greenCarImage,
                    orangeCarImage,
                ];
                const randomSprite = Math.floor(Math.random() * sprites.length);
                this.obstaclePool.push(
                    new Obstacles({
                        game: this,
                        imageSrc: sprites[randomSprite],
                        position: { x: positionX, y: positionY },
                    })
                );
            }
        }
    }
    getObstacles() {
        for (let i = 0; i < this.obstaclePool; i++) {
            if (this.obstaclePool[i].free) return this.obstaclePool[i];
        }
    }
}
