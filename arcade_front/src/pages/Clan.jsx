import { getClan } from '../api/api';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ClanPostForm } from '../components/ClanPostForm';

export function Clan() {
    const params = useParams();
    const [clan, setClan] = useState();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        async function obtenerClan() {
            const res = await getClan(params.id);
            //console.log(res.data);
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
                                <li key={member.id}>{member.username}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No members yet.</p>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <ClanPostForm clan={clan} user={user} />
        </div>
    );
}
