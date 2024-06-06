import { useEffect, useState } from 'react';
import { getClanes } from '../api/api';
import { ClanesList } from './ClanesList';

export function UserClanes({ user }) {

    const [clanes, setClanes] = useState([])

    //console.log('usuario:', user.username);

    useEffect(() => {
        async function getClans() {
            try {
                const res = await getClanes();
                //console.log('clanes :', res.data);
                setClanes(res.data)
            } catch (errors) {
                console.error(errors);
            }
        }
        getClans();
    }, []);

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
