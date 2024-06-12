import { useContext } from 'react';
import { TrophieContext } from '../context/TrophieContext';
import { TrophiesList } from '../components/TrophiesList';

export function UserTrophies({ user }) {
    const { trophies } = useContext(TrophieContext);

    return (
        <div>
            {trophies.length > 0 ? (
                trophies.map((trophie) => (
                    <TrophiesList
                        key={trophie.id}
                        user={user}
                        trophie={trophie}
                    />
                ))
            ) : (
                <div>Loading Trophies...</div>
            )} 
        </div>
    );
}
