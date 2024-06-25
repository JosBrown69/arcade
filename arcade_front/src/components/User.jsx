import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../api/api';

export function User() {
    const [user, setUser] = useState();
    const params = useParams();

    const getUsuario = async () => {
        const { data } = await getUser(params.id);
        console.log(data);
        setUser(data);
    };

    useEffect(() => {
        getUsuario();
    }, []);

    return (
        <div>
            {user ? (
                <h1>{user.username}</h1>
                
            ) : (
                <div>
                    <p>Loading...</p>
                </div>
            )}
        </div>
    );
}
