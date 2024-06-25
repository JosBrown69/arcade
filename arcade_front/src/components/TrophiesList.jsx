import { useNavigate } from 'react-router-dom';

export function TrophiesList({ user, trophie }) {
    const navigate = useNavigate();

    const ganadores = trophie.achiever;

    console.log(trophie);

    return (
        <div>
            {ganadores.map((ganador) => (
                <div
                    key={ganador.id}
                    onClick={() => navigate(`/trophie/${trophie.id}`)}
                >
                    {ganador.id === user.id ? (
                        <>
                            {trophie.trophie}
                        </>
                    ) : null}
                </div>
            ))}
        </div>
    );
}
