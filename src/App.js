import { useEffect, useState } from "react";
import Listview from "./components/listview";
import Detailview from "./components/detailview";
import styled from "styled-components";
import Modal from "./components/modal";

import { v4 as uuid_v4 } from "uuid";

const AppDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 20px;
`;

const Heading = styled.h1`
  text-align: center;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding: 0.5em;
  background-image: linear-gradient(to left, #ffe7e7, #b393d3);
`;

const HeadingDiv = styled.div``;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-gap: 10px;
  padding-top: 10px;
  overflow-y: auto;
  height: 90vh;
  width: 60%;
`;

const DetailDiv = styled.div`
  display: flex;
  height: 90%;
  background: #ffe7e7;
  margin-top: 1vw;
  margin-bottom: 1vw;
  padding-bottom: 1vw;
  border-radius: 10px;
`;

function App() {
  const [contributors, setContributors] = useState(
    JSON.parse(localStorage.getItem("contributors")) || []
  );
  const [selectedUserDetail, setSelectedUserDetail] = useState(
    JSON.parse(localStorage.getItem("selectedUserDetail")) || {}
  );
  const [selectedUserRepo, setSelectedUserRepo] = useState([]);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (contributors.length === 0) {
      fetch("https://api.github.com/repos/facebook/react/contributors")
        .then((response) => response.json())
        .then((contributors) => {
          console.log("fetched contributors", contributors);
          setContributors(contributors);
          fetchUserData(contributors[0].login);
          localStorage.setItem("contributors", JSON.stringify(contributors));
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      fetchUserData(selectedUserDetail.login);
    }
  }, []);

  useEffect(() => {
    setSelectedUserRepo([]);
    if (showModal) {
      fetch(`https://api.github.com/users/${selectedUserDetail.login}/repos`)
        .then((response) => response.json())
        .then((data) => {
          setSelectedUserRepo(
            data.map((repo) => {
              return {
                name: repo.name,
                description: repo.description,
                url: repo.html_url,
              };
            })
          );
        });
    }
  }, [showModal]);

  const fetchUserData = (username) => {
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to retrieve user details");
        }
      })
      .then((detail) => {
        setSelectedUserDetail(detail);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleClick = (contributor) => {
    const username = contributor.login;
    fetchUserData(username);
    localStorage.setItem("selectedUserDetail", JSON.stringify(contributor));
  };

  const displayListview = () => {
    return contributors.map((contributor) => {
      return (
        <Listview
          key={uuid_v4()}
          handleClick={() => handleClick(contributor)}
          username={contributor.login}
          avatarURL={contributor.avatar_url}
          numContributions={contributor.contributions}
        />
      );
    });
  };

  return (
    <>
      <HeadingDiv>
        <Heading>Top Contributors of React</Heading>
      </HeadingDiv>
      {showModal && (
        <Modal
          toggleModal={() => setShowModal(!showModal)}
          createdOn={selectedUserDetail.created_at}
          updatedOn={selectedUserDetail.updated_at}
          name={selectedUserDetail.name}
          repoDetails={selectedUserRepo}
        />
      )}
      <AppDiv className="App">
        <Grid>{contributors && displayListview()}</Grid>
        <DetailDiv>
          <Detailview
            username={selectedUserDetail.login}
            avatarURL={selectedUserDetail.avatar_url}
            name={selectedUserDetail.name}
            location={selectedUserDetail.location}
            followingCount={selectedUserDetail.following}
            followerCount={selectedUserDetail.followers}
            websiteURL={selectedUserDetail.blog}
            githubURL={selectedUserDetail.html_url}
            setShowModal={setShowModal}
          />
        </DetailDiv>
      </AppDiv>
    </>
  );
}

export default App;
