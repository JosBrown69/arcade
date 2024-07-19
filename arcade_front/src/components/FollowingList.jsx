import { useNavigate } from 'react-router-dom';
import { ListItem, Avatar } from '@chakra-ui/react';
import '../styles/Following.css'

export function FollowingList({ follower, user }) {
    const navigate = useNavigate();

    const follow = follower.seguidor.id;
    const following = follower.siguiendo.username;
    const followingId = follower.siguiendo.id;

    return (
        <div className='following-list'>
            <ListItem onClick={() => navigate(`/user/${followingId}`)}>
                <Avatar
                    bg='brand.50'
                    boxSize={6}
                />
                <span className='following-name'>{following}</span>
            </ListItem>
        </div>
    );
}
