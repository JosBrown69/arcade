import { useNavigate } from 'react-router-dom';

export function UserList({ user, usuario }) {
    const navigate = useNavigate()

    return (
        <div>
            {user.id === usuario.id ? (<p onClick={() => navigate(`/profile/`)}>{usuario.username}</p>):(<p onClick={() => navigate(`/user/${usuario.id}/`)}>{usuario.username}</p>)}
        </div>
    );
}
