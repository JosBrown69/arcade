import { useEffect, useRef } from 'react';
import { Player } from './classes/Player';
import { Background } from './classes/Background';
import { Platform } from './classes/Platform'
import steadyRight from './assets/steadyRight.png';
import backgroundImage from './assets/background.jpg';
import platformImage from './assets/platform.png'

class Game {
    constructor({ canvas }) {
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.platforms = 10,
        this.platformPool = []
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
            imageSrc: steadyRight,
        });
        this.obstacles = new Platform({
            game: this,
            imageSrc: platformImage,
            position: {
                x: this.width / 2,
                y: this.height / 2
            }
        })
    }

    render(ctx) {
        this.background.render(ctx);
        this.obstacles.render(ctx);
        this.player.render(ctx);
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
