import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createPosts } from '../api/api';
import { GoodButton } from './Buttons';
import { Textarea, Box } from '@chakra-ui/react';

export function ClanPostForm({ clan, user, obtener }) {
    const params = useParams();

    const { register, handleSubmit } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        try {
            const id = params.id;
            await createPosts(id, data);
            obtener();
        } catch (errors) {
            console.error(errors);
        }
    });

    const miembros = clan.member;
    const matchingMember = miembros.find((miembro) => miembro.id === user.id);

    return (
        <main>
            {clan && matchingMember && (
                <Box>
                    <form onSubmit={onSubmit}>
                        <Textarea
                            variant='flushed'
                            type='text'
                            id='content'
                            name='content'
                            padding='0.5rem'
                            maxWidth='100%'
                            color='brand.300'
                            marginBottom='2rem'
                            marginTop='2rem'
                            placeholder='Writte something... ;*'
                            {...register('content', {
                                required: true,
                            })}
                        />
                        <GoodButton>Post</GoodButton>
                    </form>
                </Box>
            )}
        </main>
    );
}
