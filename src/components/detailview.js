import styled from "styled-components";

const DetailDiv = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: flex-start;
    align-items: center;
    padding-right: 15px;
`

const Image = styled.img`
    width: 400px;
`

const Text = styled.p`
    display: flex;
    font-size: 15px;
    padding: 0px
    margin-block-start: 0px;
    margin-block-start: 0px; 
    margin-block-end: 0; 
`

const Detailview = ({username, avatarURL, name, location, bio, followerCount, followingCount }) => {

    return (
        <DetailDiv>
            <h2>Username: {username}</h2>
            <Image src={avatarURL} />
            <Text>Name: {name}</Text>
            <Text>Location: {location}</Text>
            <Text>Bio: {bio}</Text>
            <Text>Number of Followers: {followerCount}</Text>
            <Text>Number of Following: {followingCount}</Text>
        </DetailDiv>
    )
}

export default Detailview;