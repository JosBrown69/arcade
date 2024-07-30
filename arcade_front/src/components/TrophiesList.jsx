import { useNavigate } from 'react-router-dom';
import { TrophieMiniatura } from './TrophieMiniatura';

export function TrophiesList({ user, trophie }) {
    const navigate = useNavigate();

    const ganadores = trophie.achiever;

    return (
        <div className='trophie'>
            {ganadores.map((ganador) => (
                <div
                    key={ganador.id}
                    onClick={() => navigate(`/trophie/${trophie.id}`)}
                >
                    {ganador.id === user.id ? <TrophieMiniatura trophie={trophie} /> : null}
                </div>
            ))}
        </div>
    );
}
