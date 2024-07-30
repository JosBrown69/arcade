import { useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { TrophieContext } from '../context/TrophieContext';
import { TrophieMiniatura } from '../components/TrophieMiniatura';
import { Spinner } from '@chakra-ui/react';
import { getGames } from '../api/api';
import '../styles/Trophies.css';

export function Trophies() {
    const { trophies } = useContext(TrophieContext);
    const [games, setGames] = useState('');
    const navigate = useNavigate();

    const obtenerJuegos = async () => {
        const { data } = await getGames();
        setGames(data);
    };

    useEffect(() => {
        obtenerJuegos();
    }, []);

    return (
        <div id='trophies-container'>
            {trophies.length > 0 && games ? (
                <section>
                    {games.map((game) => (
                        <div>
                            <h2  className='titles'>{game.game}</h2>
                            {trophies.map((trophie) => (
                                <>
                                {game.game === trophie.juego.game && (<div
                                    className='trophies'
                                    key={trophie.id}
                                    onClick={() =>
                                        navigate(`/trophie/${trophie.id}`)
                                    }
                                >
                                    <TrophieMiniatura trophie={trophie} />
                                </div>)}
                                </>
                            ))}
                        </ div>
                    ))}
                </section>
            ) : (
                <>
                    <div>Loading...</div>
                    <Spinner
                        size='xl'
                        speed='0.5s'
                        emptyColor='gray.200'
                        thickness='3px'
                        color='yellow.500'
                    />
                </>
            )}
        </div>
    );
}
