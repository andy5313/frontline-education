import { useEffect, useState } from 'react';
import Listview from './components/listview';
import Detailview from './components/detailview';
import styled from 'styled-components';

import { v4 as uuid_v4 } from 'uuid';

const AppDiv = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 20px;
  padding-left: 30px;
`

const Heading = styled.h1`
  text-align: center;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-gap: 10px;
  overflow-y: auto;
  height: 80vh;
  width: 60%;
`


function App() {
  const [contributors, setContributors] = useState([]);
  const [selectedUserDetail, setSelectedUserDetail] = useState({});

  useEffect(() => {

    fetch("https://api.github.com/repos/facebook/react/contributors")
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to retrieve contributors");
      }
    })
    .then(contributors => {
      console.log("fetched contributors", contributors);
      setContributors(contributors);
      fetchUserData(contributors[0].login);
    })
    .catch(error => {
      console.error(error);
    });
  }, []);


  useEffect(() => {
    console.log(Object.keys(selectedUserDetail).length !== 0)
    console.log("selectedUSERdetail", selectedUserDetail);
  }, [selectedUserDetail])

  const fetchUserData = (username) => {
    fetch(`https://api.github.com/users/${username}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to retrieve user details");
      }
    })
    .then(detail => {
      setSelectedUserDetail(detail)
    })
    .catch(error => {
      console.error(error);
    });
  }

  const handleClick = (contributor) => {
    const username = contributor.login;
    fetchUserData(username);
  }

  const displayListview = () => {
    return contributors.map((contributor) => {
      return (<Listview key={uuid_v4()} handleClick={() => handleClick(contributor)} username={contributor.login} avatarURL={contributor.avatar_url} numContributions={contributor.contributions}/>)
    })
  }
  

  return (
    <>
      <Heading>Top Contributors of React</Heading>
      <AppDiv className="App">
        <Grid>
          {contributors && displayListview()}
        </Grid>
        {
          contributors.length && 
            <Detailview 
              username={selectedUserDetail.login} 
              avatarURL={selectedUserDetail.avatar_url}
              name={selectedUserDetail.name}
              location={selectedUserDetail.location}
              followingCount={selectedUserDetail.following}
              followerCount={selectedUserDetail.followers}
           />
        }
        
      </AppDiv>
    </>
    
  );
}

export default App;
