import { useRef, useEffect, useState } from 'react';
import { Heading, Box } from '@chakra-ui/react';
import { Game } from './Game';

export function JuegoGratis() {
    const canvasRef = useRef(null);
    const [points, setPoints] = useState()

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const game = new Game({ canvas });
        let animationFrame;

        ctx.fillStyle = 'red';
        ctx.fillRect(50, 50, 100, 100);

        const handleKeydown = (e) => {
            if (e.code === 'Space') {
                if (game.state === 'start' || game.state === 'gameOver') {
                    game.reset(ctx);
                }
            }
        };

        window.addEventListener('keydown', handleKeydown);

        const gameLoop = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            game.render(ctx, setPoints);
            animationFrame = requestAnimationFrame(gameLoop);
        };

        gameLoop();

        return () => {
            cancelAnimationFrame(animationFrame);
            window.removeEventListener('keydown', handleKeydown);
        };
    }, []);

    return (
        <>
            <Box p={4}>
                <Heading>
                    <p>Log in to</p>
                    <p>play more</p>
                    <p>games!</p>
                </Heading>
            </Box>
            <canvas ref={canvasRef} width={360} height={540}></canvas>
        </>
    );
}
