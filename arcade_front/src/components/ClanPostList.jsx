import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPosts } from '../api/api';

export function ClanPostList({ clan, user }) {
    const [posts, setPosts] = useState([]);
    const params = useParams()

    useEffect(() => {
        async function clanes() {
            try {
                //const res = await getPosts(params.id);
                setPosts(res)
            } catch (errors) {
                console.error(errors);
            }
        }
        clanes();
    }, []);

    return <div></div>
}
