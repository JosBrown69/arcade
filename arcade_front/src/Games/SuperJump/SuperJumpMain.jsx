import { useEffect, useRef } from 'react';
import { Player } from './classes/Player';
import { Background } from './classes/Background';
import { Platform } from './classes/Platform';
import backgroundImage from './assets/background.jpg';
import platformImage from './assets/platform.png';

class Game {
    constructor({ canvas }) {
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.platforms = 15;
        this.platformPool = [];
        this.createPlatforms();
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
        });
    }

    render(ctx) {
        this.background.render(ctx);
        this.platformPool.forEach((platform) => {
            platform.render(ctx);
        });
        this.player.render(ctx);
    }

    createPlatforms() {
        if (platformImage) {
            for (let i = 0; i < this.platforms; i++) {
                let rightBorder = this.width - 44
                let positionY
                let spacing = 108
                if(i === 1 || i === 2 || i === 11){
                    positionY = Math.random() * (spacing - 20) + 20;
                }
                if(i === 3 || i === 4 || i === 12){
                    positionY = Math.random() * (spacing * 2 - 108) + 108;
                }
                if(i === 5 || i === 6 || i === 13){
                    positionY = Math.random() * (spacing * 3 - 216) + 216;
                }
                if(i === 7 || i === 8 || i === 14){
                    positionY = Math.random() * (spacing * 4 - 324) + 324;
                }
                if(i === 9 || i === 10 || i === 15){
                    positionY = Math.random() * (spacing * 5 - 432) + 432;
                }
                let positionX = Math.random() * (rightBorder - 4) + 4;
                this.platformPool.push(
                    new Platform({
                        game: this,
                        imageSrc: platformImage,
                        position: { x: positionX, y: positionY },
                    })
                );
            }
        }
    }

    getPlatforms() {
        for (let i = 0; i < this.platformPool; i++) {
            if (this.platformPool[i]) return this.obstaclePool[i];
        }
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
