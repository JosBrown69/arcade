import { getClan, getPosts, getMembers } from '../api/api';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ClanPostForm } from '../components/ClanPostForm';
import { ClanJoin } from '../components/ClanJoin';
import { ClanPostList } from '../components/ClanPostList';
import { useNavigate } from 'react-router-dom';
import { ClanMemberList } from '../components/ClanMemberList';
import { Spinner, Divider, Flex, Box } from '@chakra-ui/react';
import '../styles/Clan.css';

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

    const localPosts = posts?.find((post) => post.clan.id === clan.id) || null;

    return (
        <main id='clan-container'>
            {clan && posts && members ? (
                <div>
                    <section id='clan-header'>
                        <h1 id='clan-title'>{clan.title}</h1>
                        {clan.creator.id != user.id && (
                            <span className='botton'>
                                <ClanJoin
                                    clan={clan}
                                    user={user}
                                    members={members}
                                    update={obtenerClan}
                                    update2={obtenerMiembros}
                                />
                            </span>
                        )}
                    </section>
                    <section className='creator'>
                        {clan.creator.id === user.id ? (
                            <p onClick={() => navigate(`/profile/`)}>
                                <strong>Founder </strong>
                                <span className='clan-creator'>
                                    {clan.creator.username}
                                </span>
                            </p>
                        ) : (
                            <p
                                onClick={() =>
                                    navigate(`/user/${clan.creator.id}`)
                                }
                            >
                                <strong>Founder</strong>{' '}
                                <span className='clan-creator'>
                                    {clan.creator.username}
                                </span>
                            </p>
                        )}
                        <i>{clan.description}</i>
                    </section>
                    <Divider />
                    <h2 className='titles'>Members</h2>
                    <Flex overflow='scroll' h='100px' marginBottom='1rem'>
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
                    </Flex>
                    <section>
                        <h2 className='titles'>Social</h2>
                        <Box
                            marginBottom='2rem'
                            overflow='scroll'
                            h='300px'
                            border='1px'
                            borderColor='brand.300'
                            borderRadius='10px'
                        >
                            <>
                                {localPosts ? (
                                    posts.map((post) => (
                                        <ClanPostList
                                            clan={clan}
                                            user={user}
                                            post={post}
                                            key={post.id}
                                        />
                                    ))
                                ) : (
                                    <p className='no-posts'>No interactions yet!</p>
                                )}
                            </>
                        </Box>
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
