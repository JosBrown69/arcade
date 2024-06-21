import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createPosts } from '../api/api';

export function ClanPostForm({ clan, user, obtener }) {
    const params = useParams();

    const {
        register,
        handleSubmit,
    } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        try {
            const id = params.id;
            const res = await createPosts(id, data);
            obtener()
            console.log(res);
        } catch (errors) {
            console.error(errors);
        }
    });

    if (clan) {
        const miembros = clan.member;
        const matchingMember = miembros.find(
            (miembro) => miembro.id === user.id
        );
        return (
            <div>
                {matchingMember && (
                    <div>
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
                    </div>
                )}
            </div>
        );
    }
}
