import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { TrophieContext } from '../context/TrophieContext';

export function Trophies() {
    const { trophies } = useContext(TrophieContext);
    const navigate = useNavigate();

    console.log(trophies);

    return (
        <div>
            {trophies.length > 0 ? (
                trophies.map((trophie) => (
                    <div key={trophie.id}
                        onClick={() => {
                            navigate(`/trophie/${trophie.id}`);
                        }}
                    >
                        {trophie.juego}, {trophie.trophie}
                    </div>
                ))
            ) : (
                <div>Loading Trophies...</div>
            )}
        </div>
    );
}
