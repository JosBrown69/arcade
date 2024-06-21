import { getClan, getPosts } from '../api/api';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ClanPostForm } from '../components/ClanPostForm';
import { ClanJoin } from '../components/ClanJoin';
import { ClanPostList } from '../components/ClanPostList';

export function Clan() {
    const params = useParams();
    const [clan, setClan] = useState();
    const [posts, setPosts] = useState();
    const { user } = useContext(AuthContext);

    const obtenerClan = async () => {
        const { data } = await getClan(params.id);
        console.log(data);
        setClan(data);
    };

    const obtenerPosts = async () => {
        const { data } = await getPosts(params.id)
        setPosts(data);
    };

    useEffect(() => {
        obtenerClan();
        obtenerPosts();
    }, []);

    return (
        <div>
            {clan && posts ? (
                <div>
                    <h1>{clan.title}</h1>
                    <p>by: {clan.creator.username}</p>
                    <ClanJoin clan={clan} user={user} update={obtenerClan}/>
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
                    {posts.map((post) => (
                        <ClanPostList
                            clan={clan}
                            user={user}
                            post={post}
                            key={post.id}
                        />
                    ))}
                    <ClanPostForm
                        clan={clan}
                        user={user}
                        obtener={obtenerPosts}
                    />
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
