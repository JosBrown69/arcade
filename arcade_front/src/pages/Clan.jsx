import { getClan } from '../api/api';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ClanPostForm } from '../components/ClanPostForm';
import { ClanJoin } from '../components/ClanJoin';
import { ClanPostList } from '../components/ClanPostList';

export function Clan() {
    const params = useParams();
    const [clan, setClan] = useState();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        async function obtenerClan() {
            const res = await getClan(params.id);
            setClan(res.data);
        }
        obtenerClan();
    }, );

    return (
        <div>
            {clan ? (
                <div>
                    <h1>{clan.title}</h1>
                    <p>by: {clan.creator.username}</p>
                    <ClanJoin clan={clan} user={user} />
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
            <ClanPostList clan={clan} user={user}/>
            <ClanPostForm clan={clan} user={user} />
        </div>
    );
}
