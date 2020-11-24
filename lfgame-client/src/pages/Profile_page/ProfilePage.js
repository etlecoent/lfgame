import { useEffect, useState } from 'react';
import axios from 'axios';

import './ProfilePage.scss';

const ProfilePage = (props) => {


  const [currentProfile, setCurrentProfile] = useState({});
  const [previousSessions, setPreviousSessions] = useState([]);
  const currentUser = props.currentUser;


  useEffect(() => {
    axios.get(`/api/users/${currentUser.username}`, {
      params: {
        data: currentUser.username
      }
    }).then(res => {
      setCurrentProfile(res.data.user)
      setPreviousSessions(res.data.sessionsList)
    })
    
  }, [])
  
  console.log(currentProfile);
  console.log(previousSessions);

  return (

    <div>
      <header>Profile</header>
      <div>
        <p>Username: {currentProfile.username}</p>
        <p>Email: {currentProfile.email}</p>
      </div>
      <div>
      <p>Number of Previous Sessions: {previousSessions.length}</p>
      </div>
    </div>
  )

}

export default ProfilePage;