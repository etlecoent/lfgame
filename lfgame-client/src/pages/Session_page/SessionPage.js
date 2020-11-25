import { Fragment, useEffect, useState, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";

import GameInfo from "./GameInfo";
import GamersList from "./GamerList";
import MessagesList from "./MessagesList";

import './SessionPage.scss';

const SessionPage = (props) => {
  
  const { currentSession, currentUser } = props;

  const socketRef = useRef();
  const [gameInfo, setGameInfo] = useState({});
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
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
    
    // get the session's game infos when the page loads
    axios.get(`/api/sessions/${currentSession.session_id}/games`).then(res => {
      setGameInfo(res.data);
    })
    

    socketRef.current = io({
      path: '/socket.io',
      query: {sessionId: currentSession.session_id, username: currentUser.username, userId: currentUser.id},
    });

    
    socketRef.current.on("user has joined", ({users, joiningUser}) => {
      
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
    
    <section id="sessionPage">
      <GameInfo gameInfo={gameInfo} />

      <GamersList users={users} />
      
      <h2>
        Messages
      </h2>
      <MessagesList messages={messages} />

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

    </section>
  )

};

export default SessionPage;