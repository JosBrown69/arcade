import { useRef, useEffect, useState } from 'react';
import { Heading, Box } from '@chakra-ui/react';
import { Game } from './Game';

export function JuegoGratis() {
    const canvasRef = useRef(null);
    const [points, setPoints] = useState();
    const [juego, setJuego] = useState();

    const manualRestart = () => {
        console.log('gallo');
        console.log(juego.state);
        if (juego.state === 'start' || juego.state === 'gameOver') {
            juego.reset(ctx);
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const game = new Game({ canvas });
        setJuego(game)
        let animationFrame;

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
            <div id='moreGames'>
                <Box p={4}>
                    <Heading>
                        <span>Log in to </span>
                        <span>play more </span>
                        <span>games!</span>
                    </Heading>
                </Box>
            </div>
            <canvas ref={canvasRef} width={360} height={540} onClick={() => manualRestart()}></canvas>
        </>
    );
}
