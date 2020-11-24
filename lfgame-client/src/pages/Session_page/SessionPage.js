import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

import GamersList from "./GamerList";

import './SessionPage.scss'

const SessionPage = (props) => {
  
  const { currentSession, currentUser } = props;

  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();
  const [msg, setMsg] = useState("");

  const leaveSession = () => {
    socketRef.current.disconnect();
  };

  const sendMessage = () => {
    const outgoingMessage = {
      username: currentUser.username,
      content: msg
    }
    socketRef.current.emit("sending message", outgoingMessage);
    setMsg("");
  } 

  useEffect(() => {
    
    socketRef.current = io({
      path: '/socket.io',
      query: {sessionId: currentSession.session_id, username: currentUser.username, userId: currentUser.id},
    });

    
    socketRef.current.on("user has joined", ({users, joiningUser}) => {
      console.log(users)
      console.log(joiningUser)
      setMessages(messages => [...messages, {username: "System", content: `User ${joiningUser} has joined the channel`}])
    
      setUsers([...users]);
    });

    socketRef.current.on("user has left", ({users , leavingUser}) => {
      
      setMessages(messages => [...messages, {username: "System", content: `User ${leavingUser} has left the channel`}])
      
      setUsers([...users]);
    });

    socketRef.current.on("incoming message", (message) => {
      setMessages(messages => [...messages, message])
    })

    return () => {
      socketRef.current.disconnect();
    };

  }, []);

  return (
    <div>
      <h1>
        This is the sessions page.
      </h1>

      <h2>
        Users
      </h2>
        <GamersList users={users} />
      <h2>
        Messages
      </h2>
      <div>
        {messages.map((message, i) => (
        <div>
          <p key={i}>
            {message.username} says: {message.content}
          </p>
        </div>)
        )}
      </div>
      <button onClick={() => leaveSession()}>
        Leave session
      </button>
      <form onSubmit={event => event.preventDefault()}>
        <div>
          <input type="text" placeholder="Enter message" value={msg} onChange={event => setMsg(event.target.value)} />
        </div>
        <button onClick={sendMessage}>
          Send Message
        </button>
      </form>
    </div>
  )

};

export default SessionPage;