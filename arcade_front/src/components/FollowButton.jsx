import { useForm } from 'react-hook-form';
import { follow } from '../api/api';

export function FollowButton({ perfil, user, update, update2, isFollowing }) {
    const { handleSubmit } = useForm();

    const iFollowId =
        isFollowing?.find((follower) => follower.siguiendo.id === perfil.id)
            ?.seguidor.id || null;

    const seguir = handleSubmit(async () => {
        try {
            await follow(perfil.id);
            update();
            update2();
        } catch (errors) {
            console.error(errors);
        }
    });

    return (
        <div>
            {iFollowId ? (
                <form>
                    <button>Unfollow</button>
                </form>
            ) : (
                <form onSubmit={seguir}>
                    <button>Follow</button>
                </form>
            )}
        </div>
    );
}
