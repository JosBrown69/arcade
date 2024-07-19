import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { ClanContext } from '../context/ClanContext';
import { Spinner } from '@chakra-ui/react';
import { GoodButton } from '../components/Buttons';
import { Card, CardHeader, CardBody, Stack } from '@chakra-ui/react';
import '../styles/Clanes.css';

export function Clanes() {
    const { clanes, getClans } = useContext(ClanContext);
    const navigate = useNavigate();

    useEffect(() => {
        getClans();
    }, []);

    return (
        <main id='clanes-container'>
            <section id='clanes-title'>
                <h1>Clanes</h1>
                <div onClick={() => navigate('/clan/create/')}>
                    <GoodButton>Create Clan</GoodButton>
                </div>
            </section>
            <Stack>
                {clanes ? (
                    clanes.map((clan) => (
                        <Card
                            direction={{ sm: 'row' }}
                            variant='unstyled'
                            maxW='md'
                            maxH='sm'
                            key={clan.id}
                            onClick={() => {
                                navigate(`/clan/${clan.id}`);
                            }}
                        >
                            <CardHeader className='clan-name'>
                                {clan.title}
                            </CardHeader>
                            <CardBody fontSize='sm' className='card-body'>
                                <strong className='strong'>Founder:</strong>
                                <span className='founder'>{clan.creator.username}</span>
                                <strong className='strong'>members:</strong>
                                {clan.member.length}
                            </CardBody>
                        </Card>
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
            </Stack>
            {clanes.length < 1 && <h3>No clans created</h3>}
        </main>
    );
}
