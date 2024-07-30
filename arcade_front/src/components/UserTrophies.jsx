import { TrophiesList } from '../components/TrophiesList';
import { Box } from '@chakra-ui/react';

export function UserTrophies({ user, trophies }) {
    return (
        <Box marginBottom='2rem' overflow='scroll' h='250px' className='trophies-width'>
            {trophies.length > 0 &&
                trophies.map((trophie) => (
                    <div>
                        <TrophiesList
                            key={trophie.id}
                            user={user}
                            trophie={trophie}
                        />
                    </div>
                ))}
        </Box>
    );
}
