import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createPosts } from '../api/api';

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
                <section>
                    <form onSubmit={onSubmit}>
                        <textarea
                            type='text'
                            id='content'
                            name='content'
                            placeholder='Writte something... ;*'
                            {...register('content', {
                                required: true,
                            })}
                        />
                        <button>Post</button>
                    </form>
                </section>
            )}
        </main>
    );
}
