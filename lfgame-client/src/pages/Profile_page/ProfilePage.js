import { useEffect, useState } from 'react';
import axios from 'axios';

import './ProfilePage.scss';

const ProfilePage = (props) => {


  const [currentProfile, setCurrentProfile] = useState({});
  const currentUser = props.currentUser;


  useEffect(() => {
    axios.get(`/api/users/${currentUser.username}`, {
      params: {
        data: currentUser.username
      }
    }).then(res => {
      setCurrentProfile(res.data)
    })
    
  }, [])
  
  console.log(currentProfile);

  return (

    <div>
      <header>Profile</header>
      <div>
        <p>Username: {currentProfile.username}</p>
        <p>Email: {currentProfile.email}</p>
      </div>
    </div>
  )

}

export default ProfilePage;