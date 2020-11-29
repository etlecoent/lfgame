import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';


import GameInfo from "./GameInfo";
import GamersList from "./GamerList";
import MessagesList from "./MessagesList";

import './SessionPage.scss';

const SessionPage = (props) => {
  
  const { currentSession, currentUser, setCurrentSession } = props;

  const socketRef = useRef();
  const [gameInfo, setGameInfo] = useState({});
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");

  const updateScroll = () => {
    const element = document.getElementById("scrollable");
    element.scrollTop = element.scrollHeight - element.clientHeight;
  }

  const sendMessage = () => {
    const outgoingMessage = {
      username: currentUser.username,
      content: msg
    }
    if (!msg) {
      return;
    }
    socketRef.current.emit("sending message", outgoingMessage);
    setMsg("");
    updateScroll();
  }

  useEffect(() => {
    // get the session's game infos when the page loads
    axios.get(`/api/sessions/${currentSession.session_id}/games`, { headers: {"Authorization" : props.token} }).then(res => {
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
      updateScroll();
    })

    return () => {
      socketRef.current.disconnect();
      setCurrentSession(null);
    };

  }, []);

  return (
    
    <section className="page">
      <GameInfo gameInfo={gameInfo} />

      <GamersList users={users} />

      <MessagesList 
        className="messages"  
        sendMessage={sendMessage} msg={msg} 
        onChange={event => setMsg(event.target.value)}
        currentUser={currentUser.username}
        messages={messages}
      />
      <Link to="/">
        <Button className="leaveSession">
          Leave session
        </Button>
      </Link>

    </section>

  )

};

export default SessionPage;