import { TrophiesList } from '../components/TrophiesList';
import { Box } from '@chakra-ui/react';

export function UserTrophies({ user, trophies }) {

    if (trophies) {
        console.log(trophies);
    }

    return (
        <Box
            marginBottom='2rem'
            overflow='scroll'
            h='250px'
        >
            {trophies.length > 0 && (
                trophies.map((trophie) => (
                    <TrophiesList
                        key={trophie.id}
                        user={user}
                        trophie={trophie}
                    />
                ))
            )}
        </Box>
    );
}
