import { useState, useEffect, useContext } from 'react';
import { following } from '../api/api';
import { AuthContext } from '../context/AuthContext';
import { FollowingList } from '../components/FollowingList';

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
        <div>
            <h1>Following</h1>
            {user && followers ? (
                <div>
                    {followers.map((follower) => (
                        <FollowingList
                            key={follower.id}
                            follower={follower}
                            user={user}
                        />
                    ))}
                    <div>
                        {followers.length < 1 && (
                            <h2>Start following people to see them here!</h2>
                        )}
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}
