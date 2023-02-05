
const Listview = ({username, avatarURL, numContributions, handleClick}) => {

    return (
        <div onClick={handleClick}>
            <h3>{username}</h3>
            <img src={avatarURL} alt="A descriptive text for the image"/>
            <p>Number of Contributions: {numContributions}</p>
        </div>
    )
}

export default Listview;