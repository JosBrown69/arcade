import { getClan, getPosts, getMembers } from '../api/api';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ClanPostForm } from '../components/ClanPostForm';
import { ClanJoin } from '../components/ClanJoin';
import { ClanPostList } from '../components/ClanPostList';
import { useNavigate } from 'react-router-dom';
import { UserList } from '../components/UserList';

export function Clan() {
    const params = useParams();
    const [clan, setClan] = useState();
    const [posts, setPosts] = useState();
    const [members, setMembers] = useState();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const obtenerMiembros = async () => {
        const { data } = await getMembers();
        setMembers(data);
    };

    const obtenerClan = async () => {
        const { data } = await getClan(params.id);
        setClan(data);
    };

    const obtenerPosts = async () => {
        const { data } = await getPosts(params.id);
        setPosts(data);
    };

    useEffect(() => {
        obtenerClan();
        obtenerPosts();
        obtenerMiembros();
    }, []);

    //console.log(members);

    return (
        <main>
            {clan && posts && members ? (
                <div>
                    <h1>{clan.title}</h1>
                    {clan.creator.id === user.id ? (
                        <p onClick={() => navigate(`/profile/`)}>
                            Founder {clan.creator.username}
                        </p>
                    ) : (
                        <p onClick={() => navigate(`/user/${clan.creator.id}`)}>
                            by: {clan.creator.username}
                        </p>
                    )}
                    <ClanJoin
                        clan={clan}
                        user={user}
                        members={members}
                        update={obtenerClan}
                        update2={obtenerMiembros}
                    />
                    <h2>Members</h2>
                    {clan.member && clan.member.length > 0 ? (
                        <ul>
                            {clan.member.map((usuario) => (
                                <UserList
                                    key={usuario.id}
                                    usuario={usuario}
                                    user={user}
                                />
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
        </main>
    );
}
