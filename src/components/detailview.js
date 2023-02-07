import styled from "styled-components";

const DetailDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: flex-start;
  width: 30vw;
  height: 50vw;
  background-color: #ffe7e7;
  margin-top: 20px;
  border-radius: 10px;
`;

const Image = styled.img`
  width: 30vw;
  height: 30vw;
  padding-bottom: 1vw;
`;

const Text = styled.p`
  display: flex;
  font-size: 1.2vw;
  padding: 0.4vw;
  margin-block-start: 0px;
  margin-block-start: 0px;
  margin-block-end: 0;
  padding-left: 2vw;
`;

const InfoSpan = styled.span`
  font-size: 1.2vw;
  font-weight: bold;
  padding-left: 2vw;
`;

const WebsiteLink = styled.a`
  padding-left: 2vw;
  font-size: 1.2vw;
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
}) => {
  return (
    <>
      {username && (
        <DetailDiv>
          <h2>
            Username: <InfoSpan>{username}</InfoSpan>
          </h2>
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
        </DetailDiv>
      )}
    </>
  );
};

export default Detailview;
