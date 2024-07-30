import { useNavigate } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

export function ClanesList({ user, clan }) {
    const navigate = useNavigate();

    const miembros = clan.member;

    return (
        <Box marginBottom='0.9rem'>
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
        </Box>
    );
}
