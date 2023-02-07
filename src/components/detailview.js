import styled from "styled-components";

const DetailDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: flex-start;
  width: 30vw;
`;

const Image = styled.img`
  width: 30vw;
  height: 30vw;
  padding-bottom: 0.5vw;
`;

const Text = styled.p`
  display: flex;
  font-size: 1.1vw;
  padding: 0.3vw;
  margin-block-start: 0px;
  margin-block-start: 0px;
  margin-block-end: 0;
  padding-left: 2vw;
`;

const InfoSpan = styled.span`
  font-size: 1.1vw;
  font-weight: bold;
  padding-left: 2vw;
`;

const WebsiteLink = styled.a`
  padding-left: 2vw;
  font-size: 1.2vw;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 10vw;
  text-align: center;
  margin-top: 0.5vw;
  padding: 0.5vw;
  font-size: 1.2vw;
  border-radius: 5px;
  background-color: purple;
  color: white;
`;

const UsernameHeader = styled.h2`
  font-size: 1.4vw;
`;

const Detailview = ({
  username,
  avatarURL,
  name,
  location,
  bio,
  followerCount,
  followingCount,
  websiteURL,
  githubURL,
  setShowModal,
}) => {
  return (
    <>
      {username && (
        <DetailDiv>
          <UsernameHeader>Username: {username}</UsernameHeader>
          <Image src={avatarURL} />
          <Text>
            Name: <InfoSpan>{name}</InfoSpan>
          </Text>
          {location && (
            <Text>
              Location: <InfoSpan>{location}</InfoSpan>
            </Text>
          )}
          {bio && (
            <Text>
              Bio: <InfoSpan>{bio}</InfoSpan>
            </Text>
          )}
          <Text>
            Number of Followers: <InfoSpan>{followerCount}</InfoSpan>
          </Text>
          <Text>
            Number of Following: <InfoSpan>{followingCount}</InfoSpan>
          </Text>
          {websiteURL && (
            <Text>
              Website: <WebsiteLink href={websiteURL}>{websiteURL}</WebsiteLink>
            </Text>
          )}
          {githubURL && (
            <Text>
              Github: <WebsiteLink href={githubURL}>{githubURL}</WebsiteLink>
            </Text>
          )}
          <Button onClick={() => setShowModal(true)}>Find Out More</Button>
        </DetailDiv>
      )}
    </>
  );
};

export default Detailview;
