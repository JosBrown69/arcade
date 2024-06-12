import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ClanContext } from '../context/ClanContext';

export function Clanes() {
    const { clanes } = useContext(ClanContext);
    const navigate = useNavigate();

    return (
        <div>
            {clanes.length > 0 ? (
                clanes.map((clan) => (
                    <div
                        key={clan.id}
                        onClick={() => {
                            navigate(`/clan/${clan.id}`);
                        }}
                    >
                        <div>
                            <h3>
                                {clan.title} {clan.creator.username} members: {clan.member.length}
                            </h3>
                        </div>
                    </div>
                ))
            ) : (
                <div>Loading Trophies...</div>
            )}
        </div>
    );
}
