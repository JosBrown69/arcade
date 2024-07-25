import { useNavigate } from 'react-router-dom';

export function ClanMemberList({ user, usuario }) {
    const navigate = useNavigate();

    return (
        <>
            {user.id === usuario.id ? (
                <li onClick={() => navigate(`/profile/`)}>{usuario.username}</li>
            ) : (
                <li onClick={() => navigate(`/user/${usuario.id}/`)}>
                    {usuario.username}
                </li>
            )}
        </>
    );
}
