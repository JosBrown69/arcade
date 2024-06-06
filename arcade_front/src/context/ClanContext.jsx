import { createContext, useState, useEffect } from 'react';
import { getClanes } from '../api/api';

export const ClanContext = createContext();

export function ClanContextProvider(props) {
    const [clanes, setClanes] = useState([]);

    useEffect(() => {
        async function getClans() {
            try {
                const res = await getClanes();
                setClanes(res.data);
            } catch (errors) {
                console.error(errors);
            }
        }
        getClans();
    }, []);

    return (
        <ClanContext.Provider
            value={{
                clanes
            }}
        >
            {props.children}
        </ClanContext.Provider>
    );
}
