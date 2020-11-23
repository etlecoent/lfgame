import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

import './SessionPage.scss'

const SessionPage = (props) => {
  
  const NEW_USER_EVENT = "newUser"; // Name of the event

  const [users, setUsers] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    
    socketRef.current = io({
      path: '/socket.io',  
      query: {sessionId: 1},
      // auth: { token: "abc" }
    });

    // Listens for incoming users
    socketRef.current.on("Hello", (data) => {
      console.log(data);
    });

    socketRef.current.on("users", (users) => {
      console.log(users);
      const newUsers = JSON.parse(users);
      setUsers([...newUsers]);
    });

    socketRef.current.on("user has left", (users) => {
      console.log(users);
      const newUsers = JSON.parse(users);
      setUsers([...newUsers]);
    });

  }, []);

  
  // Destroys the socket reference
  // when the connection is closed
  
  const leaveSession = () => {
    socketRef.current.disconnect();
  };
  

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
      <button onClick={() => leaveSession()}>
        Leave session
      </button>
    </div>
  )

};

export default SessionPage;