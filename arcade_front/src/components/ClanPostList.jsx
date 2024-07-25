import { useNavigate } from 'react-router-dom';
import { Avatar, Flex } from '@chakra-ui/react';

export function ClanPostList({ clan, post, user }) {
    const navigate = useNavigate();

    return (
        <section key={post.id} className='post-box'>
            {clan.id === post.clan.id && (
                <div className='post-text'>
                    <section className='comment-user'>
                        <Avatar bg='brand.50' boxSize={6} />
                        {user.id === post.person.id ? (
                            <>
                                <h3
                                    className='comment-name'
                                    onClick={() => navigate(`/profile/`)}
                                >
                                    {post.person.username}
                                </h3>
                            </>
                        ) : (
                            <h3
                                className='comment-name'
                                onClick={() =>
                                    navigate(`/user/${post.person.id}`)
                                }
                            >
                                {post.person.username}
                            </h3>
                        )}
                    </section>
                    <section>
                        <p>{post.content}</p>
                    </section>
                </div>
            )}
        </section>
    );
}
