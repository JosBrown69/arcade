export function FollowCount({ user, follows }) {

    const followers = follows.filter((follower) => follower.siguiendo.id === user.id)

    return (
        <div>
            {user && follows && (
                <section>
                    <p>Following {user.following.length}</p>
                    <p>Followers {followers.length}</p>
                </section>
            )}
        </div>
    );
}
