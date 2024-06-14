import { joinClan, leaveClan } from '../api/api';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

export function ClanJoin({ clan, user }) {
    const { handleSubmit } = useForm();

    const params = useParams();

    const onSubmit = handleSubmit(async (data) => {
        try {
            const id = params.id;
            await joinClan(id, data);
        } catch (errors) {
            console.error(errors);
        }
    });

    const onLeave = handleSubmit(async (data) => {
        try {
            const id = params.id;
            await leaveClan(id, data);
        } catch (errors) {
            console.error(errors);
        }
    });

    const miembros = clan.member;
    const matchingMember = miembros.find((miembro) => miembro.id === user.id);

    return (
        <div>
            {clan && !matchingMember ? (
                <form onSubmit={onSubmit}>
                    <button>Join</button>
                </form>
            ) : (
                <div>
                    <form onSubmit={onLeave}>
                        <button>Leave Group</button>
                    </form>
                </div>
            )}
        </div>
    );
}
