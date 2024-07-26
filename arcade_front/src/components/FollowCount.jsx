export function FollowCount({ user, follows }) {

    const followers = follows.filter((follower) => follower.siguiendo.id === user.id)

    return (
        <div>
            {user && follows && (
                <section className="following-box">
                    <p><strong>Following</strong> {user.following.length}</p>
                    <p><strong>Followers</strong> {followers.length}</p>
                </section>
            )}
        </div>
    );
}
