import { useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { clanCreate, joinClan } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { ClanContext } from '../context/ClanContext';
import { GoodButton } from '../components/Buttons';
import '../styles/Create.css';
import {
    Spinner,
    Alert,
    AlertIcon,
    AlertTitle,
    Stack,
    Input,
    Textarea,
} from '@chakra-ui/react';

export function ClanCreate() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { clanes, getClans } = useContext(ClanContext);
    const navigate = useNavigate();

    useEffect(() => {
        getClans();
    }, []);

    const onSubmit = handleSubmit(async (data) => {
        try {
            const res = await clanCreate(data);
            navigate(`/clan/${res.data.id}`);
            await joinClan(res.data.id, data);
            getClans();
        } catch (errors) {
            console.error(errors);
        }
    });

    return (
        <main id='create-body'>
            {clanes ? (
                <section>
                    <header>
                        <h1 className='create-title'>Create a Clan</h1>
                        <p className='create-text'>
                            Share tips, tricks and hacks with friends!
                        </p>
                    </header>
                    <section>
                        <form onSubmit={onSubmit}>
                            <Stack spacing={10}>
                                <Input
                                    variant='flushed'
                                    size='md'
                                    id='name'
                                    name='title'
                                    placeholder='Clan name'
                                    {...register('title', { required: true })}
                                />
                                {errors.name && (
                                    <Alert
                                        status='error'
                                        variant='solid'
                                        borderRadius='md'
                                    >
                                        <AlertIcon />
                                        <AlertTitle>
                                            Name is required
                                        </AlertTitle>
                                    </Alert>
                                )}
                                <Textarea
                                    variant='flushed'
                                    type='text'
                                    id='content'
                                    name='content'
                                    placeholder='Writte a small description'
                                    {...register('description', {
                                        required: true,
                                    })}
                                />
                                {errors.description && (
                                    <Alert
                                        status='error'
                                        variant='solid'
                                        borderRadius='md'
                                    >
                                        <AlertIcon />
                                        <AlertTitle>
                                            Descriptions is required
                                        </AlertTitle>
                                    </Alert>
                                )}
                                <GoodButton>Create</GoodButton>
                            </Stack>
                        </form>
                    </section>
                </section>
            ) : (
                <>
                    <p>Loading...</p>
                    <Spinner
                        size='xl'
                        speed='0.5s'
                        emptyColor='gray.200'
                        thickness='3px'
                        color='yellow.500'
                    />
                </>
            )}
        </main>
    );
}
