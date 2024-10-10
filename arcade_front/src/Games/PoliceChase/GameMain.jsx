import { useEffect, useRef, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useParams } from 'react-router-dom';
import { getGame, updateRecord } from '../../api/api';
import { Heading, Box, useToast } from '@chakra-ui/react';
import { Game } from './Game';

export function MainGame() {
    const params = useParams();
    const { user } = useContext(AuthContext);
    const [points, setPoints] = useState();
    const [juego, setJuego] = useState();
    const [record, setRecord] = useState();
    const [jugador, setJugador] = useState();
    const toast = useToast();

    const canvasRef = useRef(null);

    const actualizarRecord = async () => {
        try {
            await updateRecord(params.id, { game: juego.game, record: points });
            toast({
                title: 'New Record!',
                description: `You make ${points} points`,
                position:'bottom-left',
                status: 'success',
                duration: 4000,
                isClosable: true,
            });
            obtenerJuego();
        } catch (errors) {
            console.error(errors);
        }
    };

    const obtenerJuego = async () => {
        try {
            const { data } = await getGame(params.id);
            if (data?.player?.username) {
                setJugador(data.player.username);
            }
            if (data?.record) {
                setRecord(data.record);
            }
            setJuego(data);
        } catch (errors) {
            console.error(errors);
        }
    };

    useEffect(() => {
        if (points > 0 && points > record && user) {
            actualizarRecord();
        }
    }, [points]);

    useEffect(() => {
        obtenerJuego();
    }, []);

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
            {juego && jugador ? (
                <>
                    <Box p={4}>
                        <Heading>
                            Record:{' '}
                            <div>
                                {jugador} {juego.record}
                            </div>
                        </Heading>
                    </Box>
                </>
            ) : (
                juego && (
                    <>
                        <Box p={4}>
                            <Heading>Record: {juego.record}</Heading>
                        </Box>
                    </>
                )
            )}
            <canvas ref={canvasRef} width={360} height={540}></canvas>
        </>
    );
}
