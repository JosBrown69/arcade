import { getClan, getPosts, getMembers } from '../api/api';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ClanPostForm } from '../components/ClanPostForm';
import { ClanJoin } from '../components/ClanJoin';
import { ClanPostList } from '../components/ClanPostList';
import { useNavigate } from 'react-router-dom';
import { ClanMemberList } from '../components/ClanMemberList';
import { Spinner } from '@chakra-ui/react';

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
        try {
            const { data } = await getClan(params.id);
            setClan(data);
        } catch (errors) {
            console.error(errors);
            navigate('/NotFound/');
        }
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
                            Founder {clan.creator.username}
                        </p>
                    )}
                    {clan.creator.id != user.id && (
                        <ClanJoin
                            clan={clan}
                            user={user}
                            members={members}
                            update={obtenerClan}
                            update2={obtenerMiembros}
                        />
                    )}
                    <h2>Members</h2>
                    {clan.member && clan.member.length > 0 ? (
                        <ul>
                            {clan.member.map((usuario) => (
                                <ClanMemberList
                                    key={usuario.id}
                                    usuario={usuario}
                                    user={user}
                                />
                            ))}
                        </ul>
                    ) : (
                        <div>
                            <p>No members yet</p>
                        </div>
                    )}
                    <section>
                        {posts.map((post) => (
                            <ClanPostList
                                clan={clan}
                                user={user}
                                post={post}
                                key={post.id}
                            />
                        ))}
                        <div>{posts.length < 1 && <h3>No posts yet</h3>}</div>
                    </section>
                    <ClanPostForm
                        clan={clan}
                        user={user}
                        obtener={obtenerPosts}
                    />
                </div>
            ) : (
                <>
                    <p>Loading...</p>
                    <Spinner
                        size='xl'
                        speed='0.5s'
                        emptyColor='gray.200'
                        thickness='3px'
                        color='yellow.500'
                    />
                </>
            )}
        </main>
    );
}
