import { useEffect, useState } from 'react';
import axios from 'axios';

import './ProfilePage.scss';

import PrevSessionsList from "./PrevSessionsList";

const ProfilePage = (props) => {


  const [previousSessions, setPreviousSessions] = useState([]);
  const [favouriteGame, setFavouriteGame] = useState({});
  const [showSessions, setShowSessions] = useState(false);
  const [currentProfile, setCurrentProfile] = useState({})

  useEffect(() => {
    
    axios.get(`/api/users/${props.currentUser.id}`, { headers: {"Authorization" : props.token} })
    .then(res => {
      setCurrentProfile(res.data.user)
      setFavouriteGame(res.data.favourite)
      setPreviousSessions(res.data.sessionsList)
    })
    
  }, [])

  return (

    <section className="page">
      <div className="profile-page">
        <header className="profile-header">Profile</header>
        <div className="profile-user">
          <img className="avatar" alt="User Avatar" src={currentProfile.image}/>
          <div className="user-info">
            <span className="profile-user-header">
              Username:
            </span>
            <span className="profile-user-info">
              {currentProfile.username}
            </span>
            <span className="profile-user-header">
              Steam ID:
            </span>
            <span className="profile-user-info">
              {currentProfile.steam_id || "N/A"}
            </span>
          </div>
        </div>
          {favouriteGame && 
          <div className="favourite-game">
            <span>Favourite Game: </span>
            <img className="favourite-game-img" src={favouriteGame.picture_url} alt="Favourite Game"/>
          </div>
          }
        <div className="previous-sessions">
          <span 
            className="session-num" 
            onClick={() => setShowSessions(!showSessions)}>
            Previous Sessions
          </span>
          {showSessions && 
            <PrevSessionsList 
              sessionsList={previousSessions}
              setCurrentProfile={setCurrentProfile}
              setFavouriteGame={setFavouriteGame}
              setPreviousSessions={setPreviousSessions}
              showSessions={showSessions}
              setShowSessions={setShowSessions}
              token={props.token}
            />
          }
        </div>
      </div>
    </section>
  )

}

export default ProfilePage;