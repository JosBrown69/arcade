import { useEffect, useState } from 'react';
import { getUser } from '../api/api';
import { ACCESS_TOKEN } from '../constants';
import { jwtDecode } from 'jwt-decode';

export function Profile() {

    const [user, setUser] = useState('')

    useEffect(() => {
        async function obtenerUser() {
            const jwt = localStorage.getItem(ACCESS_TOKEN);
            const decoded = jwtDecode(jwt)
            console.log(decoded);
            try {
                const res = await getUser(decoded.user_id)
                console.log('this is getUser res:', res);
                setUser(res.data)
            } catch(error) {
                console.error(error)
            }
        } 
        obtenerUser()
    }, [])

    return <div>{user.username}</div>;
}
