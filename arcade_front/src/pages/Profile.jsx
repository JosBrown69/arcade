import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ClanContext } from '../context/ClanContext';
import { TrophieContext } from '../context/TrophieContext';
import { UserClanes } from '../components/UserClanes';
import { UserTrophies } from '../components/UserTrophies';
import { FollowCount } from '../components/FollowCount';
import { following } from '../api/api';
import { Spinner, Avatar, Heading } from '@chakra-ui/react';
import '../styles/Profile.css';

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

    const userGender =
        user.gender === 'Male'
            ? '#4982ff'
            : user.gender === 'Female'
            ? '#e752ae'
            : 'Filipino';

    return (
        <div id='profile-container'>
            {user && followers && clanes ? (
                <div>
                    {userGender != 'Filipino' ? (
                        <div className={`profile-title`}>
                            <Avatar boxSize={75} bg={userGender} />
                            <Heading color={userGender}>
                                {user.username}
                            </Heading>
                        </div>
                    ) : (
                        <div className={`profile-title`}>
                            <Avatar boxSize={75} bgColor='#0039B3' />
                            <Heading
                                color='#DC0505'
                                fontSize='6xl'
                                marginLeft='1rem'
                            >
                                {user.username}
                            </Heading>
                        </div>
                    )}
                    <FollowCount user={user} follows={followers} />
                    <div className='clanes-width'>
                        <h2 className='titles'>Clanes</h2>
                        <UserClanes user={user} clanes={clanes} />
                    </div>
                    <div>
                        <h2 className='titles'>Trophies</h2>
                        <UserTrophies user={user} trophies={trophies} />
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

