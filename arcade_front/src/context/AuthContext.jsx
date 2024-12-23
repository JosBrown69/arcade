import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { api, getUser } from '../api/api';
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants';

export const AuthContext = createContext();

export function AuthContextProvider(props) {
    const [isAuthorized, setIsAuthorized] = useState(null);
    const [user, setUser] = useState('');

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false));
        obtenerUser();
    }, []);

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post('/api/token/refresh/', {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (errors) {
            console.error(errors);
            setIsAuthorized(false);
        }
    };

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    };

    const obtenerUser = async () => {
        const jwt = localStorage.getItem(ACCESS_TOKEN);
        const decoded = jwtDecode(jwt);
        try {
            const { data } = await getUser(decoded.user_id);
            setUser(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthorized,
                user,
                obtenerUser,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}
