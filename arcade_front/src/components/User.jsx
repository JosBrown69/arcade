import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUser } from '../api/api';

export function User() {
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const params = useParams();

    const getUsuario = async () => {
        const { data } = await getUser(params.id);
        setUser(data);
    };

    useEffect(() => {
        getUsuario();
    }, []);

    return (
        <div>
            {user ? (
                <div>Usuario X</div>
            ) : (
                <div>
                    <p>Loading...</p>
                </div>
            )}
        </div>
    );
}
