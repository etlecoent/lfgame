import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

import './SessionPage.scss'

const SessionPage = (props) => {
  
  const NEW_USER_EVENT = "newUser"; // Name of the event
  const SOCKET_SERVER_URL = "http://localhost:3001/sessions";

  const [users, setUsers] = useState([]);
  // const socketRef = useRef();

  useEffect(() => {
    
    const socket = io({
      path: '/socket.io',  
      query: {sessionId: 1}
    });

    // Listens for incoming users
    socket.on("Hello", (data) => {
      console.log(data);
    });

    socket.on("users", (users) => {
      console.log(users);
      const newUsers = JSON.parse(users);
      setUsers(users => [...users, ...newUsers]);
    });

  }, []);

  
  // Destroys the socket reference
  // when the connection is closed
  
  // const leaveSession = () => {
  //   socketRef.current.disconnect();
  // };
  

  return (
    <div>
      <h1>
        This is the sessions page.
      </h1>

      <h2>
        Users
      </h2>
      <ul>
        {users.map(user => <li>{user.username}</li>)}
        {/* <GamerList users={users}/> */}
      </ul>
    </div>
  )

};

export default SessionPage;