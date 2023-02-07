import styled from "styled-components";
import { v4 as uuid_v4 } from "uuid";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalDiv = styled.div`
  background-color: #ffe7e7;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);
  padding: 1rem;
  width: 50vw;
  height: 50vw;
  overflow: scroll;
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

const RepoDiv = styled.div`
  font-size: 1.4vw;
  display: flex;
  flex-direction: column;
  padding: 0.7vw;
  background-color: white;
  border: 1px solid gray;
  border-radius: 10px;
  margin: 0.5vw;
`;

const Heading = styled.h2`
  text-align: center;
`;

const Button = styled.button`
  width: 5vw;
  height: 2vw;
  background-color: red;
  color: white;
  border: 0;
  border-radius: 5px;
`;

const Modal = ({ name, toggleModal, createdOn, updatedOn, repoDetails }) => {
  const displayRepoDetails = () => {
    return repoDetails.map((repo) => {
      return (
        <RepoDiv key={uuid_v4()}>
          <div>{repo.name}</div>
          <a href={repo.url}>{repo.url}</a>
          {repo.description && <div>"{repo.description}"</div>}
        </RepoDiv>
      );
    });
  };

  return (
    <>
      <ModalOverlay className="modal">
        <ModalDiv className="modal-body">
          <Button onClick={toggleModal}>Close</Button>
          <Heading>{name}'s Github Repositories</Heading>
          <Text>Created on: {createdOn.slice(0, 10)}</Text>
          <Text>Last Updated on: {updatedOn.slice(0, 10)}</Text>
          {displayRepoDetails()}
        </ModalDiv>
      </ModalOverlay>
    </>
  );
};

export default Modal;
