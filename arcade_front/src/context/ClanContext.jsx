import { createContext, useState, useEffect } from 'react';
import { getClanes } from '../api/api';

export const ClanContext = createContext();

export function ClanContextProvider(props) {
    const [clanes, setClanes] = useState([]);

    useEffect(() => {
        getClans();
    }, []);

    const getClans = async () => {
        try {
            const res = await getClanes();
            setClanes(res.data);
        } catch (errors) {
            console.error(errors);
        }
    };

    return (
        <ClanContext.Provider
            value={{
                clanes,
                getClans,
            }}
        >
            {props.children}
        </ClanContext.Provider>
    );
}
