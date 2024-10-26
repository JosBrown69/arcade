import { useEffect, useRef } from 'react';
import { Player } from './classes/Player';
import { Background } from './classes/Background';
import { Platform } from './classes/Platform';
import { Enemy } from './classes/Enemy';
import { ScoreBoard } from './classes/ScoreBoard';
import backgroundImage from './assets/background.jpg';
import platformImage from './assets/platform.png';

class Game {
    constructor({ canvas }) {
        this.canvas = canvas;
        this.state = 'playing';
        this.width = canvas.width;
        this.height = canvas.height;
        this.platforms = 11;
        this.platformPool = [];
        this.createPlatforms();
        this.enemies = 7;
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
        this.player = new Player({
            game: this,
            platforms: this.platformPool,
            enemies: this.enemyPool,
        });
        this.score = new ScoreBoard();
        this.points = 0
    }

    render(ctx) {
        switch (this.state) {
            case 'start':
                this.start(ctx);
                break;
            case 'playing':
                this.background.render(ctx);
                this.platformPool.forEach((platform) => {
                    platform.render(ctx);
                });
                this.enemyPool.forEach((enemy) => {
                    enemy.render(ctx);
                });
                this.player.render(ctx);
                this.score.draw(ctx);
                this.scoreUpdate()
                break;
            case 'gameOver':
                this.saveScore();
                this.gameOver(ctx);
                break;
        }
    }

    start(){
        return
    }

    gameOver(){
        return
    }

    createPlatforms() {
        if (platformImage) {
            for (let i = 0; i < this.platforms; i++) {
                let rightBorder = this.width - 44;
                let positionY;
                let spacing = 80;
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
                //let isMoving = Math.random() < 0.2;
                let isMoving = false
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
            let minimo = 500
            let positionY = Math.random() * (-spacing * i + 1 * 3 + minimo * i) - minimo * i
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

    scoreUpdate(){
        this.score.score = this.player.points
    }

    saveScore() {
        this.points = this.score.score
    }
}

export function SuperJumpMain() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const game = new Game({ canvas });
        let animationFrame;

        ctx.fillStyle = 'red';
        ctx.fillRect(50, 50, 100, 100);

        const gameLoop = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            game.render(ctx);
            animationFrame = requestAnimationFrame(gameLoop);
        };

        gameLoop();

        return () => {
            cancelAnimationFrame(animationFrame);
        };
    }, []);

    return (
        <>
            <canvas ref={canvasRef} width={360} height={540}></canvas>
        </>
    );
}
