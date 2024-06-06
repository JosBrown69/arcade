import { useNavigate } from 'react-router-dom';

export function ClanesList({ user, clan }) {
    const navigate = useNavigate();

    if (clan.member.includes(user.id)) {
        return (
            <div
                onClick={() => {
                    navigate(`/clan/${clan.id}`);
                }}
            >
                {clan.title}
            </div>
        );
    }
}
