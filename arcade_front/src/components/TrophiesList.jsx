import { useNavigate } from 'react-router-dom';

export function TrophiesList({ user, trophie }) {
    const navigate = useNavigate();

    if (trophie.achiever.includes(user.id)) {
        return (
            <div
                onClick={() => {
                    navigate(`/trophie/${trophie.id}`);
                }}
            >
                {trophie.trophie}
            </div>
        );
    }
}


