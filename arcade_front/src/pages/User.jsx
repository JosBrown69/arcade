import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ClanContext } from '../context/ClanContext';
import { TrophieContext } from '../context/TrophieContext';
import { getUser } from '../api/api';
import { UserClanes } from '../components/UserClanes';
import { UserTrophies } from '../components/UserTrophies';
import { FollowButton } from '../components/FollowButton';
import { following } from '../api/api';
import { FollowCount } from '../components/FollowCount';

export function User() {
    const { clanes, getClans } = useContext(ClanContext);
    const { trophies, getTrofeos } = useContext(TrophieContext);
    const [usuario, setUser] = useState();
    const params = useParams();
    const [followers, setFollowing] = useState();

    const getFollowing = async () => {
        const { data } = await following();
        setFollowing(data);
    };

    const getUsuario = async () => {
        const { data } = await getUser(params.id);
        setUser(data);
    };

    useEffect(() => {
        getUsuario();
        getFollowing();
        getClans();
        getTrofeos();
    }, []);

    return (
        <div>
            {usuario && followers ? (
                <div>
                    <h1>
                        <span>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='80'
                                height='80'
                                fill='currentColor'
                                className='bi bi-person-square'
                                viewBox='0 0 16 16'
                            >
                                <path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0' />
                                <path d='M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z' />
                            </svg>
                        </span>
                        {usuario.username}
                    </h1>
                    <FollowCount follows={followers} user={usuario}/>
                    <FollowButton
                        perfil={usuario}
                        isFollowing={followers}
                        update={getUsuario}
                        update2={getFollowing}
                    />
                    <div>
                        <h2>Clanes</h2>
                        <UserClanes user={usuario} clanes={clanes} />
                    </div>
                    <div>
                        <h2>Trophies</h2>
                        <UserTrophies user={usuario} trophies={trophies} />
                    </div>
                </div>
            ) : (
                <div>
                    <p>Loading...</p>
                </div>
            )}
        </div>
    );
}
