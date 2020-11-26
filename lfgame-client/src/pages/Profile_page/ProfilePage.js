import { useEffect, useState } from 'react';
import axios from 'axios';

import './ProfilePage.scss';

import PrevSessionsList from "./PrevSessionsList";

const ProfilePage = (props) => {


  const [currentProfile, setCurrentProfile] = useState({});
  const [previousSessions, setPreviousSessions] = useState([]);
  const [showSessions, setShowSessions] = useState(false);
  const [favouriteGame, setFavouriteGame] = useState({});
  const currentUser = props.currentUser;


  useEffect(() => {
    axios.get(`/api/users/${currentUser.username}`, {
      params: {
        username: currentUser.username
      }
    }).then(res => {
      setFavouriteGame(res.data.favourite)
      setCurrentProfile(res.data.user)
      setPreviousSessions(res.data.sessionsList)
    })
    
  }, [])

  return (

    <section className="page">
      <header>Profile</header>
      <div>
        <img src={currentProfile.image}/>
        <p>Username: {currentProfile.username}</p>
        <p>Email: {currentProfile.email}</p>
      </div>
      <div>
      {/* {message && <div className="alert alert-danger">{message}</div>} */}
        {favouriteGame && 
        <div>
          <p>Favourite Game: </p>
          <img src={favouriteGame.picture_url} alt="Favourite Game"/>
        </div>
        }
      </div>
      <div>
      <p onClick={() => setShowSessions(!showSessions)}>Number of Previous Sessions: {previousSessions.length}</p>
      {showSessions && <PrevSessionsList sessionsList={previousSessions} currentUser={currentUser}/>}
      </div>
    </section>
  )

}

export default ProfilePage;