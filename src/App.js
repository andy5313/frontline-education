import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Listview from './components/listview';
import Detailview from './components/detailview';

import { v4 as uuid_v4 } from 'uuid';

function App() {
  const [contributors, setContributors] = useState([]);
  const [selectedContributor, setSelectedContributor] = useState({});
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
      setContributors(contributors)
    })
    .catch(error => {
      console.error(error);
    });
  }, []);

  useEffect(() => {
    console.log("selectedUSERdetail", selectedUserDetail);
  }, [selectedUserDetail])

  const handleClick = (contributor) => {
    setSelectedContributor(contributor);
    const username = contributor.login;

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

  const displayListview = () => {
    return contributors.map((contributor) => {
      return (<Listview key={uuid_v4()} handleClick={() => handleClick(contributor)} username={contributor.login} avatarURL={contributor.avatar_url} numContributions={contributor.contributions}/>)
    })
  }
  

  return (
    <div className="App">
      <div>
        {contributors && displayListview()}
      </div>
      {selectedUserDetail && <Detailview 
        username={selectedUserDetail.login} 
        avatarURL={selectedUserDetail.avatar_url}
        name={selectedUserDetail.name}
        location={selectedUserDetail.location}
        followingCount={selectedUserDetail.following}
        followerCount={selectedUserDetail.followers}
      />}
    </div>
  );
}

export default App;
