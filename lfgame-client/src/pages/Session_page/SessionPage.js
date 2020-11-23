import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

import './SessionPage.scss'

const SessionPage = (props) => {
  
  const NEW_USER_EVENT = "newUser"; // Name of the event

  const messageExample = {
    username: 'XSlayerX',
    content: 'fast BOIZZZZZZZZZ'
  }

  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();


  const leaveSession = () => {
    socketRef.current.disconnect();
  };

  const sendMessage = (username, content) => {
    const outgoingMessage = {
      username: 'XSlayerX',
      content: 'fast BOIZZZZZZZZZ'
    }
    socketRef.current.emit("sending message", outgoingMessage)
  } 

  useEffect(() => {
    
    socketRef.current = io({
      path: '/socket.io',
      query: {sessionId: 1},
      // auth: { token: "abc" }
    });

    
    socketRef.current.on("user has joined", (users) => {
      setMessages(messages => [...messages, {username: "System", content: "User X has joined the channel"}])
      
      const newUsers = JSON.parse(users);
      setUsers([...newUsers]);
    });

    socketRef.current.on("user has left", (users) => {
      console.log(users);

      setMessages(messages => [...messages, {username: "System", content: "User X has left the channel"}])

      const newUsers = JSON.parse(users);
      setUsers([...newUsers]);
    });

    socketRef.current.on("incoming message", (message) => {
      setMessages(messages => [...messages, message])
    })

  }, []);

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
      <h2>
        Messages
      </h2>
      <ul>
        {messages.map(message => <li>{message.content}</li>)}
        {/* <GamerList users={users}/> */}
      </ul>
      <button onClick={() => leaveSession()}>
        Leave session
      </button>
      <button onClick={() => sendMessage()}>
        Send Message
      </button>
    </div>
  )

};

export default SessionPage;