import { useEffect, useState } from "react";
import Listview from "./components/listview";
import Detailview from "./components/detailview";
import styled from "styled-components";
import Modal from "./components/modal";

import { v4 as uuid_v4 } from "uuid";

const AppDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 3vw;
  padding-bottom; 2vw;
`;

const Heading = styled.h1`
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding: 0.5em;
  padding-left: 8vw;
  font-size: 2vw;
`;

const HeadingDiv = styled.div`
  display: flex;
  align-items: center;
  background-image: linear-gradient(to left, #ffe7e7, #b393d3);
  gap: 1vw;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 10vw);
  grid-gap: 1vw;
  padding-top: 2pvw;
  overflow-y: auto;
  height: 90vh;
  width: 60%;
  padding: 1vw;
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

const SearchInput = styled.input`
  width: 30vw;
  color: purple;
  height: 3vw;
  border: 0;
  padding-left: 1vw;
  margin: 1vw;
  border-radius: 5px;
`;

function App() {
  const [contributors, setContributors] = useState(
    JSON.parse(localStorage.getItem("contributors")) || []
  );
  const [selectedUserDetail, setSelectedUserDetail] = useState(
    JSON.parse(localStorage.getItem("selectedUserDetail")) || {}
  );
  const [selectedUserRepo, setSelectedUserRepo] = useState([]);

  const [search, setSearch] = useState("");

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

  const filteredContributors = contributors.filter((user) =>
    user.login.toLowerCase().includes(search.toLowerCase())
  );

  const displayListview = () => {
    return filteredContributors.map((contributor) => {
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

  // const searchContributors = (username) => {
  //   setContributors()
  // }

  return (
    <>
      <HeadingDiv>
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for a contributor..."
        ></SearchInput>
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
