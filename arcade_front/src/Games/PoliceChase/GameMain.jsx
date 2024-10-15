import { useEffect, useRef, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { TrophieContext } from '../../context/TrophieContext';
import { useParams } from 'react-router-dom';
import { getGame, updateRecord, winTrophie } from '../../api/api';
import { Heading, Box, useToast } from '@chakra-ui/react';
import { Game } from './Game';

export function MainGame() {
    const params = useParams();
    const { user } = useContext(AuthContext);
    const { trophies } = useContext(TrophieContext);
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
                position: 'bottom-left',
                status: 'success',
                duration: 4000,
                isClosable: true,
            });
            obtenerJuego();
        } catch (errors) {
            console.error(errors);
        }
    };

    const ganarTrophie = async () => {
        if (points >= 15) {
            try {
                await winTrophie(9);
                toast({
                    title: 'New Trophy',
                    description: `200 puntos!`,
                    position: 'bottom-left',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                });
                await winTrophie(8);
                toast({
                    title: 'New Trophy',
                    description: `150 puntos!`,
                    position: 'bottom-left',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                });
                await winTrophie(7);
                toast({
                    title: 'New Trophy',
                    description: `100 puntos!`,
                    position: 'bottom-left',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                });
                await winTrophie(10);
                toast({
                    title: 'New Trophy',
                    description: `10 puntos!`,
                    position: 'bottom-left',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                });
            } catch (errors) {
                console.error(errors);
            }
        } else if (points >= 10) {
            try {
                await winTrophie(8);
                toast({
                    title: 'New Trophy',
                    description: `150 puntos!`,
                    position: 'bottom-left',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                });
                await winTrophie(7);
                toast({
                    title: 'New Trophy',
                    description: `100 puntos!`,
                    position: 'bottom-left',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                });
                await winTrophie(10);
                toast({
                    title: 'New Trophy',
                    description: `10 puntos!`,
                    position: 'bottom-left',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                });
            } catch (errors) {
                console.error(errors);
            }
        } else if (points >= 5) {
            try {
                await winTrophie(7);
                toast({
                    title: 'New Trophy',
                    description: `100 puntos!`,
                    position: 'bottom-left',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                });
                await winTrophie(10);
                toast({
                    title: 'New Trophy',
                    description: `10 puntos!`,
                    position: 'bottom-left',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                });
            } catch (errors) {
                console.error(errors);
            }
        } else if (points >= 1) {
            try {
                await winTrophie(10);
                toast({
                    title: 'New Trophy',
                    description: `10 puntos!`,
                    position: 'bottom-left',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                });
            } catch (errors) {
                console.error(errors);
            }
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
        if (points > 0) {
            ganarTrophie();
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
