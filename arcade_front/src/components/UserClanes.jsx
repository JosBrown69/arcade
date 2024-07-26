import { ClanesList } from './ClanesList';
import { Box } from '@chakra-ui/react';

export function UserClanes({ user, clanes }) {
    return (
        <Box marginBottom='2rem' overflow='scroll' h='150px'>
            {clanes.length > 0 &&
                clanes.map((clan) => (
                    <ClanesList key={clan.id} user={user} clan={clan} />
                ))}
        </Box>
    );
}
