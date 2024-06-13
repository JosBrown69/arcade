import { getClan } from '../api/api';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function Clan() {
    const params = useParams();
    const [clan, setClan] = useState();

    useEffect(() => {
        async function obtenerClan() {
            const res = await getClan(params.id);
            console.log(res.data);
            setClan(res.data);
        }
        obtenerClan();
    }, [params.id]);

    return (
        <div>
            {clan ? (
                <div>
                    <h1>{clan.title}</h1>
                    <p>by: {clan.creator.username}</p>
                    <h2>Members</h2>
                    {clan.member && clan.member.length > 0 ? (
                        <ul>
                            {clan.member.map((member) => (
                                <li key={member.id}>
                                    {member.username}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No members yet.</p>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
