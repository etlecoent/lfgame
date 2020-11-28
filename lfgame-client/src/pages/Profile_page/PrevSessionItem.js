import {useState} from 'react';
import axios from 'axios';


const PrevSessionItem = (props) => {

  const currentUser = props.currentUser;
  const sessionID = props.sessionID;
  const {setCurrentProfile, setFavouriteGame, setPreviousSessions, setShowSessions, showSessions} = props;
  const [userList, setUserList] = useState([]);


  const populatePeople = () => {
    if (userList.length > 0) {
      setUserList([]);
    } else {
      axios.get(`api/users/${currentUser.username}/${sessionID}`, { headers: {"Authorization" : currentUser.token} }).then(res => {
        const parsedList = res.data.map(user => user.username);
        setUserList([...parsedList]);
      })
    }
  }

  const goToFriend = (username) => {
    axios.get(`/api/users/${username}`, { headers: {"Authorization" : currentUser.token} })
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
        {userList && userList.map((username, i) => 
          <li key={i} className="userlist-item" onClick={() => {
            setShowSessions(!showSessions);
            goToFriend(username)
          }}>
          <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-person-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0        0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
          <path fill-rule="evenodd" d="M2 15v-1c0-1 1-4 6-4s6 3 6 4v1H2zm6-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
          </svg>

          <p className="username">{username}</p>
          </li>)}
      </ul>
    </div>

  )

}

export default PrevSessionItem;