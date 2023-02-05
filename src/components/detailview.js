
const Detailview = ({username, avatarURL, name, location, bio, followerCount, followingCount }) => {

    return (
        <div>
            <h2>Username: {username}</h2>
            <img src={avatarURL} />
            <p>Name: {name}</p>
            <p>Location: {location}</p>
            <p>Bio: {bio}</p>
            <p>Number of Followers: {followerCount}</p>
            <p>Number of Following: {followingCount}</p>
        </div>
    )
}

export default Detailview;