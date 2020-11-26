import {useEffect, useState} from 'react';
import axios from 'axios';


const PrevSessionItem = (props) => {

  const currentUser = props.currentUser;
  const sessionID = props.sessionID;
  const [userList, setUserList] = useState([])


  const populatePeople = () => {
    if (userList.length > 0) {
      setUserList([]);
    } else {
      axios.get(`api/users/${currentUser.username}/${sessionID}`).then(res => {
        const parsedList = res.data.map(user => user.username);
        setUserList([...parsedList]);
      })
    }
  }


  console.log("SessionID: ", sessionID);

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
      <ul>
        {userList && userList.map(username => <li>{username}</li>)}
      </ul>
    </div>

  )

}

export default PrevSessionItem;