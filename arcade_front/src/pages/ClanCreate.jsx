import { useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { clanCreate, joinClan } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { ClanContext } from '../context/ClanContext';
import { Spinner } from '@chakra-ui/react';

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
        <main>
            {clanes ? (
                <section>
                    <header>
                        <h1>Create a Clan</h1>
                        <p>Share tips, tricks, hacks and share with friends</p>
                    </header>
                    <section>
                        <form onSubmit={onSubmit}>
                            <input
                                type='text'
                                placeholder='Name your Clan'
                                {...register('title', { required: true })}
                            />
                            {errors.title && <span>Title is required</span>}
                            <textarea
                                placeholder='Writte a small description'
                                {...register('description', { required: true })}
                            />
                            {errors.description && (
                                <span>Description is required</span>
                            )}
                            <button>Create</button>
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
