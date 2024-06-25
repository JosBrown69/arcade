import { TrophiesList } from '../components/TrophiesList';

export function UserTrophies({ user, trophies }) {

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
