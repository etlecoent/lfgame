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
      <div className="profile-page">
        <header className="profile-header">Profile</header>
        <img className="avatar" src={currentProfile.image}/>
        <div className="user-info">
          <span className="profile-user-info">Username: {currentProfile.username}</span>
          <span className="profile-user-info">Email: {currentProfile.email}</span>
        </div>
          {favouriteGame && 
          <div className="favourite-game">
            <span>Favourite Game: </span>
            <img className="favourite-game-img" src={favouriteGame.picture_url} alt="Favourite Game"/>
          </div>
          }
        <div className="previous-sessions">
          <span className="session-num" onClick={() => setShowSessions(!showSessions)}>Number of Previous Sessions: {previousSessions.length}</span>
          {showSessions && <PrevSessionsList sessionsList={previousSessions}    currentUser={currentUser}/>}
        </div>
      </div>
    </section>
  )

}

export default ProfilePage;