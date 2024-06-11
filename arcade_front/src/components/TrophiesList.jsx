import { useNavigate } from 'react-router-dom';

export function TrophiesList({ user, trophie }) {
    const navigate = useNavigate();

    console.log(trophie);

    const ganadores = trophie.achiever

    for (const ganador of ganadores){
        const winner = ganador.id

        //console.log(winner);

        if (user.id === winner) {
            return (
                <div
                    onClick={() => {
                        navigate(`/trophie/${trophie.id}`);
                    }}
                >
                    {trophie.juego.game}: {trophie.description}
                </div>
            );
        }
    }
}


