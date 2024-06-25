import { createContext, useState, useEffect } from 'react';
import { getTrophies } from '../api/api';

export const TrophieContext = createContext();

export function TrophieContextProvider(props) {
    const [trophies, setTrophies] = useState([]);

    const getTrofeos = async () => {
        try {
            const { data } = await getTrophies();
            setTrophies(data);
        } catch (errors) {
            console.error(errors);
        }
    };

    useEffect(() => {
        getTrofeos();
    }, []);

    return (
        <TrophieContext.Provider
            value={{
                trophies,
                getTrofeos,
            }}
        >
            {props.children}
        </TrophieContext.Provider>
    );
}
