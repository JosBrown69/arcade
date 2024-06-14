import { useNavigate } from 'react-router-dom';

export function ClanesList({ user, clan }) {
    const navigate = useNavigate();

    const miembros = clan.member;

    return (
        <div>
            {miembros.map((miembro) => (
                <div
                    key={miembro.id}
                    onClick={() => navigate(`/clan/${clan.id}`)}
                >
                    {miembro.id === user.id ? (
                        <>
                            {clan.title}: {clan.member.length}
                        </>
                    ) : null}
                </div>
            ))}
        </div>
    );
}
