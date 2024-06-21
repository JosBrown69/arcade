import { useNavigate } from 'react-router-dom';

export function ClanPostList({ clan, post }) {
    const navigate = useNavigate();

    if (post) {
        return (
            <div>
                    <div key={post.id}>
                        {clan.id === post.clan.id && (
                            <div>
                                <h3
                                    onClick={() =>
                                        navigate(`/user/${post.person.id}`)
                                    }
                                >
                                    {post.person.username}
                                </h3>
                                <p>{post.content}</p>
                            </div>
                        )}
                    </div>
            </div>
        );
    }
}

