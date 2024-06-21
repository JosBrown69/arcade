import { ClanesList } from './ClanesList';

export function UserClanes({ user, clanes }) {

    return (
        <div>
            {clanes.length > 0 ? (
                clanes.map((clan) => (
                    <ClanesList key={clan.id} user={user} clan={clan} />
                ))
            ) : (
                <div>Loading clanes...</div>
            )}
        </div>
    );
}
