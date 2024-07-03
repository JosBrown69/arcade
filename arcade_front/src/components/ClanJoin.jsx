import { joinClan, leaveClan } from '../api/api';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

export function ClanJoin({ clan, user, members, update, update2 }) {
    const { handleSubmit } = useForm();

    const miembros = clan.member;
    const matchingMember = miembros.find((miembro) => miembro.id === user.id); // sacado del Clan 
    const todosMembers = members.filter((miembro) => //sacado de member
        miembro.clan.id === clan.id ? miembro : null
    );
    const miMember = todosMembers.find((member) => member.miembro.id === user.id)

    const params = useParams();

    const onSubmit = handleSubmit(async (data) => {
        try {
            const id = params.id;
            await joinClan(id, data);
            update();
            update2();
        } catch (errors) {
            console.error(errors);
        }
    });

    const onLeave = handleSubmit(async () => {
        try {
            const id = miMember.id;
            await leaveClan(id);
            update();
            update2();
        } catch (errors) {
            console.error(errors);
        }
    });

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
