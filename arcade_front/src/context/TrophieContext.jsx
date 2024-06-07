import { createContext, useState, useEffect } from 'react';
import { getTrophies } from '../api/api';

export const TrophieContext = createContext();

export function TrophieContextProvider(props) {
    const [trophies, setTrophies] = useState([]);

    useEffect(() => {
        async function getTrofeos() {
            try {
                const res = await getTrophies();
                setTrophies(res.data);
            } catch (errors) {
                console.error(errors);
            }
        }
        getTrofeos();
    }, []);

    return (
        <TrophieContext.Provider
            value={{
                trophies
            }}
        >
            {props.children}
        </TrophieContext.Provider>
    );
}
