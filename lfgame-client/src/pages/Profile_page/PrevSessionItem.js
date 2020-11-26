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
  
  console.log("Userlist state: ", userList);
  
  return (
    <div className="session-item" onClick={populatePeople}>
      <p>
        Game: {props.game}, 
        Session ID: {props.sessionID}, 
      </p>
      <ul>
        {userList && userList.map(username => <li>{username}</li>)}
      </ul>
    </div>

  )

}

export default PrevSessionItem;