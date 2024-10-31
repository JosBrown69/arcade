import { Player } from './Player';
import { Background } from './Background';
import { Ground } from './Ground';
import { Platform } from './Platform';
import { Enemy } from './Enemy';
import { ScoreBoard } from './ScoreBoard';
import { TouchInput } from './TouchInput';
import backgroundImage from '../assets/background.jpg';
import platformImage from '../assets/platform.png';

export class Game {
    constructor({ canvas }) {
        this.canvas = canvas;
        this.state = 'start';
        this.width = canvas.width;
        this.height = canvas.height;
        this.platforms = 11;
        this.platformPool = [];
        this.createPlatforms();
        this.enemies = 3;
        this.enemyPool = [];
        this.createEnemies();
        this.keys = {
            left: false,
            right: false,
        };
        this.background = new Background({
            game: this,
            imageSrc: backgroundImage,
        });
        this.ground = new Ground({
            game: this,
        });
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
        this.touchLeft.detectTouch();
        this.touchRight.detectTouch();
        this.player = new Player({
            game: this,
            platforms: this.platformPool,
            ground: this.ground,
            enemies: this.enemyPool,
        });
        this.score = new ScoreBoard();
        this.points = 0;
    }

    render(ctx, setPoints) {
        switch (this.state) {
            case 'start':
                this.start(ctx);
                break;
            case 'playing':
                this.background.render(ctx);
                this.ground.render(ctx);
                this.platformPool.forEach((platform) => {
                    platform.render(ctx);
                });
                this.enemyPool.forEach((enemy) => {
                    enemy.render(ctx);
                });
                this.player.render(ctx);
                this.score.draw(ctx);
                this.scoreUpdate();
                break;
            case 'gameOver':
                this.saveScore();
                this.gameOver(ctx, setPoints);
                break;
        }
    }

    start(ctx) {
        ctx.fillStyle = 'rgba(0, 200, 0, 0.8)';
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.font = '50px Arial';
        ctx.fillText('Super Jump', 35, this.height / 2);
        ctx.font = '20px Arial';
        ctx.fillText('Use left & right', 120, this.height / 2 + 50);
        ctx.fillText('keys to move', 125, this.height / 2 + 80);
        ctx.fillText('Press space bar to start', 75, this.height / 2 + 200);
    }

    gameOver(ctx, setPoints) {
        this.saveScore();
        setPoints(this.points);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
        ctx.font = '50px Arial';
        ctx.fillText('Game Over', 50, this.height / 2);
        ctx.font = '40px Arial';
        ctx.fillText(`Score ${this.points}`, 50, this.height / 2 + 70);
        ctx.font = '20px Arial';
        ctx.fillText('Press space bar to start', 75, this.height / 2 + 200);
    }

    reset(ctx) {
        this.platformPool = [];
        this.createPlatforms();
        this.enemyPool = [];
        this.createEnemies();
        this.player.reset();
        this.ground.reset();
        this.player.platforms = this.platformPool;
        this.player.enemies = this.enemyPool;
        ctx.fillStyle = 'black';
        this.state = 'playing';
    }

    createPlatforms() {
        if (platformImage) {
            for (let i = 0; i < this.platforms; i++) {
                let rightBorder = this.width - 44;
                let positionY;
                let spacing = 100;
                if (i === 0 || i === 1 || i === 10) {
                    positionY = Math.random() * (spacing - 20) + 20;
                }
                if (i === 2 || i === 3 || i === 12) {
                    positionY = Math.random() * (spacing * 2 - 108) + 108;
                }
                if (i === 4 || i === 5 || i === 13) {
                    positionY = Math.random() * (spacing * 3 - 216) + 216;
                }
                if (i === 6 || i === 7 || i === 14) {
                    positionY = Math.random() * (spacing * 4 - 324) + 324;
                }
                if (i === 8 || i === 9 || i === 15) {
                    positionY = Math.random() * (spacing * 5 - 432) + 432;
                }
                let positionX = Math.random() * (rightBorder - 4) + 4;
                let isMoving = Math.random() < 0.1;
                if (isMoving) {
                    this.platformPool.push(
                        new Platform({
                            game: this,
                            imageSrc: platformImage,
                            moving: true,
                            position: { x: positionX, y: positionY },
                        })
                    );
                }
                if (!isMoving) {
                    this.platformPool.push(
                        new Platform({
                            game: this,
                            imageSrc: platformImage,
                            moving: false,
                            position: { x: positionX, y: positionY },
                        })
                    );
                }
            }
        }
    }

    getPlatforms() {
        for (let i = 0; i < this.platformPool; i++) {
            if (this.platformPool[i]) return this.obstaclePool[i];
        }
    }

    createEnemies() {
        for (let i = 0; i < this.enemies; i++) {
            let rightBorder = this.width - 44;
            let spacing = 500;
            let minimo = 500;
            let positionY =
                Math.random() * (-spacing * i + 1 * 3 + minimo * i) -
                minimo * i;
            let positionX = Math.random() * (rightBorder - 4) + 4;
            this.enemyPool.push(
                new Enemy({
                    game: this,
                    position: { x: positionX, y: positionY },
                })
            );
        }
    }

    getEnemies() {
        for (let i = 0; i < this.enemyPool; i++) {
            if (this.platformPool[i]) return this.platformPool[i];
        }
    }

    scoreUpdate() {
        this.score.score = this.player.points;
    }

    saveScore() {
        this.points = this.score.score;
    }
}
