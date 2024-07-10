import { useNavigate } from 'react-router-dom';

export function ClanPostList({ clan, post, user }) {
    const navigate = useNavigate();

    if (post) {
        return (
            <div>
                <div key={post.id}>
                    {clan.id === post.clan.id && (
                        <div>
                            {user.id === post.person.id ? (
                                <h3 onClick={() => navigate(`/profile/`)}>
                                    {post.person.username}
                                </h3>
                            ) : (
                                <h3
                                    onClick={() =>
                                        navigate(`/user/${post.person.id}`)
                                    }
                                >
                                    {post.person.username}
                                </h3>
                            )}
                            <p>{post.content}</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

