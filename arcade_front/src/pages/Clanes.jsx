import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { ClanContext } from '../context/ClanContext';

export function Clanes() {
    const { clanes, getClans } = useContext(ClanContext);
    const navigate = useNavigate();

    console.log('Tilin');

    useEffect(()=>{
        getClans()
    }, [])

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
                <div>Loading Clanes...</div>
            )}
        </div>
    );
}
