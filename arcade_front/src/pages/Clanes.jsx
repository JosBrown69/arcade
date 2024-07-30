import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { ClanContext } from '../context/ClanContext';
import { AuthContext } from '../context/AuthContext';
import { Spinner } from '@chakra-ui/react';
import { GoodButton } from '../components/Buttons';
import { Card, CardHeader, CardBody, Stack } from '@chakra-ui/react';
import '../styles/Clanes.css';

export function Clanes() {
    const { clanes, getClans } = useContext(ClanContext);
    const { user } = useContext(AuthContext);
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
            <Stack spacing={6}>
                {clanes ? (
                    clanes.map((clan) => (
                        <Card
                            align='start'
                            variant='elevated'
                            size='sm'
                            color='brand.300'
                            bg='brand.400'
                            key={clan.id}
                        >
                            <CardHeader
                                color='brand.50'
                                fontWeight='bold'
                                className='clan-name'
                                onClick={() => {
                                    navigate(`/clan/${clan.id}`);
                                }}
                            >
                                {clan.title}
                            </CardHeader>
                            <CardBody
                                fontSize='sm'
                                className='card-body'
                                justify='space-between'
                                flexWrap='wrap'
                            >
                                <strong className='strong'>Founder:</strong>
                                {clan.creator.username != user.username ? (
                                    <span
                                        className='founder'
                                        onClick={() => {
                                            navigate(
                                                `/user/${clan.creator.id}`
                                            );
                                        }}
                                    >
                                        {clan.creator.username}
                                    </span>
                                ) : (
                                    <span
                                        className='founder'
                                        onClick={() => {
                                            navigate(
                                                `/profile/`
                                            );
                                        }}
                                    >
                                        {clan.creator.username}
                                    </span>
                                )}
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
