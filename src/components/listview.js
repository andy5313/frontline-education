import styled from "styled-components";

const ListDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background-color: #ffe7e7;
  width: 10vw;
  height: 15vw;
  padding-top: 1vw;
  padding-bottom: 1vw;
`;

const Image = styled.img`
  width: 100%;
`;

const Text = styled.p`
  font-size: 1vw;
  padding-bottom: 1vw;
`;
const UsernameText = styled.h3`
  font-size: 1vw;
  font-weight: bold;
  padding-top: 1vw;
`;

const BoldSpan = styled.span`
  font-weight: bold;
`;

const Listview = ({ username, avatarURL, numContributions, handleClick }) => {
  return (
    <ListDiv onClick={handleClick}>
      <UsernameText>{username}</UsernameText>
      <Image src={avatarURL} alt="photo" />
      <Text>
        Number of Contributions: <BoldSpan>{numContributions}</BoldSpan>
      </Text>
    </ListDiv>
  );
};

export default Listview;
