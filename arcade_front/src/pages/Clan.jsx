import { getClan } from '../api/api';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

export function Clan() {
    const params = useParams();

    console.log(params.id);

    useEffect(() => {
        async function obtenerClan() {
            const res = await getClan(params.id);
            console.log(res);
        }
        obtenerClan();
    }, [params.id])

    return <div>Clan</div>;
}
