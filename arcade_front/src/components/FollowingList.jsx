import { useNavigate } from 'react-router-dom';

export function FollowingList({ follower, user }) {
    const navigate = useNavigate();

    const follow = follower.seguidor.id;
    const following = follower.siguiendo.username;
    const followingId = follower.siguiendo.id;

    return (
        <div>
            {follow === user.id && (
                <p onClick={() => navigate(`/user/${followingId}`)}>
                    {following}
                </p>
            )}
        </div>
    );
}
