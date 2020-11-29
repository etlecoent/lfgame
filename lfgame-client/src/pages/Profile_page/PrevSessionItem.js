import {useState} from 'react';
import axios from 'axios';


const PrevSessionItem = (props) => {

  const sessionID = props.sessionID;
  const {setCurrentProfile, setFavouriteGame, setPreviousSessions, setShowSessions, showSessions, token} = props;
  const [userList, setUserList] = useState([]);


  const populatePeople = () => {
    if (userList.length > 0) {
      setUserList([]);
    } else {
      axios.get(`api/sessions/${sessionID}`, { headers: {"Authorization" : token} }).then(res => {
        setUserList(res.data);
      })
    }
  }

  const goToFriend = (username) => {
    axios.get(`/api/users/${username}`, { headers: {"Authorization" : token} })
    .then(res => {
      setCurrentProfile(res.data.user)
      setFavouriteGame(res.data.favourite)
      setPreviousSessions(res.data.sessionsList)
    })
  }

  const dateString = new Date(props.date);
  
  return (
    <div className="session-component">
      <div className="session-item" onClick={populatePeople}>
        <div className="prev-session-text">
          <span className="prev-session-name">
            Game: {props.game}
          </span>
          <span className="prev-session-date">
            Date: {dateString.toDateString()}
          </span>
          <span className="prev-session-difficulty">
            Difficulty: {props.difficulty}
          </span>
        </div>
        <span className="game-logo">
          <img className="game-logo-img" src={props.gameLogo} alt="Game Logo"/>
        </span>
      </div>
      <ul className="userlist">
        {userList && userList.map((user) => 
          <li key={user.id} className="userlist-item" onClick={() => {
            setShowSessions(!showSessions);
            goToFriend(user.id)
          }}>
          
          <img className="prev-user-avatar" alt={"User Avatar"} src={user.image}/>

          <p className="username">{user.username}</p>
          </li>)}
      </ul>
    </div>

  )

}

export default PrevSessionItem;