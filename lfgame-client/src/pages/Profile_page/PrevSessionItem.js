import {useEffect, useState} from 'react';
import axios from 'axios';


const PrevSessionItem = (props) => {

  const currentUser = props.currentUser;
  const sessionID = props.sessionID;
  const [userList, setUserList] = useState([])

  // useEffect(() => {
  //   axios.get(`api/users/${currentUser.username}/${sessionID}`).then(res => {
  //     console.log("Nonsense ", res)
  //     setUserList(["Jason", "Jeremy"]);
  //   })
  // }, [])

  const populatePeople = () => {
    if (userList.length > 0) {
      setUserList([]);
    } else {
      axios.get(`api/users/${currentUser.username}/${sessionID}`).then(res => {
        console.log("Nonsense ", res.data[0])
        const parsedList = res.data.map(user => user.username);
        setUserList([...parsedList]);

      })
    }
  }

  
  return (
    <div onClick={populatePeople}>
      <p>
        Game: {props.game}, 
        Session ID: {props.sessionID}, 
        Players: 
      </p>
      <ul>
        {userList && userList.map(username => <li>{username}</li>)}
      </ul>
    </div>

  )

}

export default PrevSessionItem;