import { useForm } from 'react-hook-form';
import { follow, unfollow } from '../api/api';
import { GoodButton, BadButton } from '../components/Buttons';

export function FollowButton({ perfil, update, update2, isFollowing, user }) {
    const { handleSubmit } = useForm();

    const iFollowId = isFollowing?.find(
        (follower) =>
            follower.siguiendo.id === perfil.id &&
            follower.seguidor.id === user.id
    );

    const deleteId =
        isFollowing?.find(
            (follower) =>
                follower.siguiendo.id === perfil.id &&
                follower.seguidor.id === user.id
        )?.id || null;

    const seguir = handleSubmit(async () => {
        try {
            await follow(perfil.id);
            update();
            update2();
        } catch (errors) {
            console.error(errors);
        }
    });

    const unSeguir = handleSubmit(async () => {
        try {
            await unfollow(deleteId);
            update();
            update2();
        } catch (errors) {
            console.error(errors);
        }
    });

    return (
        <div>
            {iFollowId ? (
                <form onSubmit={unSeguir}>
                    <BadButton>Unfollow</BadButton>
                </form>
            ) : (
                <form onSubmit={seguir}>
                    <GoodButton>Follow</GoodButton>
                </form>
            )}
        </div>
    );
}
