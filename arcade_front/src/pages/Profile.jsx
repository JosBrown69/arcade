import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ClanContext } from '../context/ClanContext';
import { TrophieContext } from '../context/TrophieContext';
import { UserClanes } from '../components/UserClanes';
import { UserTrophies } from '../components/UserTrophies';
import { FollowCount } from '../components/FollowCount';
import { following } from '../api/api';

export function Profile() {
    const { user, obtenerUser } = useContext(AuthContext);
    const { clanes, getClans } = useContext(ClanContext);
    const { trophies, getTrofeos } = useContext(TrophieContext);
    const [followers, setFollowing] = useState();

    const getFollowing = async () => {
        const { data } = await following();
        setFollowing(data);
    };

    useEffect(() => {
        getClans();
        getTrofeos();
        obtenerUser();
        getFollowing();
    }, []);

    return (
        <div>
            {user && followers ? (
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
                        {user.username}
                    </h1>
                    <FollowCount user={user} follows={followers}/>
                    <div>
                        <h2>Clanes</h2>
                        <UserClanes user={user} clanes={clanes} />
                    </div>
                    <div>
                        <h2>Trophies</h2>
                        <UserTrophies user={user} trophies={trophies} />
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}
