import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ClanContext } from '../context/ClanContext';
import { AuthContext } from '../context/AuthContext';
import { TrophieContext } from '../context/TrophieContext';
import { getUser } from '../api/api';
import { UserClanes } from '../components/UserClanes';
import { UserTrophies } from '../components/UserTrophies';
import { FollowButton } from '../components/FollowButton';
import { following } from '../api/api';
import { FollowCount } from '../components/FollowCount';
import { Spinner, Avatar, Heading } from '@chakra-ui/react';
import '../styles/User.css';

export function User() {
    const { clanes, getClans } = useContext(ClanContext);
    const { trophies, getTrofeos } = useContext(TrophieContext);
    const { user } = useContext(AuthContext);
    const [usuario, setUser] = useState();
    const params = useParams();
    const [followers, setFollowing] = useState();
    const navigate = useNavigate();

    const getFollowing = async () => {
        const { data } = await following();
        setFollowing(data);
    };

    const getUsuario = async () => {
        try {
            const { data } = await getUser(params.id);
            setUser(data);
        } catch (errors) {
            console.error(errors);
            navigate('/NotFound/');
        }
    };

    useEffect(() => {
        getUsuario();
        getFollowing();
        getClans();
        getTrofeos();
    }, []);

    const userGender =
        usuario?.gender === 'Male'
            ? '#4982ff'
            : usuario?.gender === 'Female'
            ? '#e752ae'
            : 'Filipino' || null;

    return (
        <div>
            {usuario && followers && clanes ? (
                <div id='user-container'>
                    <section className='user-box'>
                        {userGender != 'Filipino' ? (
                            <div className={`user-title`}>
                                <Avatar boxSize={75} bg={userGender} />
                                <Heading color={userGender} marginLeft='1rem'>
                                    {usuario.username}
                                </Heading>
                            </div>
                        ) : (
                            <div className={`user-title`}>
                                <Avatar boxSize={75} bgColor='#0039B3' />
                                <Heading
                                    color='#DC0505'
                                    fontSize='6xl'
                                    marginLeft='1rem'
                                >
                                    {usuario.username}
                                </Heading>
                            </div>
                        )}
                        <FollowButton
                            className='follow-button'
                            perfil={usuario}
                            isFollowing={followers}
                            update={getUsuario}
                            update2={getFollowing}
                            user={user}
                        />
                    </section>
                    <FollowCount follows={followers} user={usuario} />
                    <div className='clanes-width'>
                        <h2 className='titles'>Clanes</h2>
                        <UserClanes user={usuario} clanes={clanes} />
                    </div>
                    <div className='width'>
                        <h2 className='titles'>Trophies</h2>
                        <UserTrophies user={usuario} trophies={trophies} />
                    </div>
                </div>
            ) : (
                <>
                    <div>Loading...</div>
                    <Spinner
                        size='xl'
                        speed='0.5s'
                        emptyColor='gray.200'
                        thickness='3px'
                        color='yellow.500'
                    />
                </>
            )}
        </div>
    );
}
