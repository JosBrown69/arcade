import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { ClanContext } from '../context/ClanContext';
import { Spinner } from '@chakra-ui/react';

export function Clanes() {
    const { clanes, getClans } = useContext(ClanContext);
    const navigate = useNavigate();

    useEffect(() => {
        getClans();
    }, []);

    return (
        <main>
            <h1>Clanes</h1>
            <button onClick={() => navigate('/clan/create/')}>
                Create Clan
            </button>
            {clanes ? (
                clanes.map((clan) => (
                    <div
                        key={clan.id}
                        onClick={() => {
                            navigate(`/clan/${clan.id}`);
                        }}
                    >
                        <div>
                            <h3>
                                {clan.title} {clan.creator.username} members:
                                {clan.member.length}
                            </h3>
                        </div>
                    </div>
                ))
            ) : (
                <>
                    <div>Loading...</div>
                    <Spinner
                        size='xl'
                        speed='0.5s'
                        emptyColor='gray.200'
                        thickness='3px'
                        color='yellow.500'
                    />
                </>
            )}
            {clanes.length < 1 && <h3>No clans created</h3>}
        </main>
    );
}
