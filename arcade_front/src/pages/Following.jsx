import { useState, useEffect, useContext } from 'react';
import { following } from '../api/api';
import { AuthContext } from '../context/AuthContext';
import { FollowingList } from '../components/FollowingList';
import { Spinner } from '@chakra-ui/react';
import { List } from '@chakra-ui/react';
import '../styles/Following.css';

export function Following() {
    const [followers, setFollowing] = useState();
    const { user } = useContext(AuthContext);

    const getFollowing = async () => {
        const { data } = await following();
        setFollowing(data);
    };

    useEffect(() => {
        getFollowing();
    }, []);

    return (
        <section id='following-container'>
            <h1 id='follow-title'>Following</h1>
            {user && followers ? (
                <div>
                    {followers.map((follower) => (
                        <List spacing={6}>
                            <FollowingList
                                key={follower.id}
                                follower={follower}
                                user={user}
                            />
                        </List>
                    ))}
                    <div>
                        {followers.length < 1 && (
                            <h2>Start following people to see them here!</h2>
                        )}
                    </div>
                </div>
            ) : (
                <section className='Loading'>
                    <div className='loading-text'>Loading...</div>
                    <Spinner
                        size='xl'
                        speed='0.5s'
                        emptyColor='gray.200'
                        thickness='3px'
                        color='yellow.500'
                    />
                </section>
            )}
        </section>
    );
}
