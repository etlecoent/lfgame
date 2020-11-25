import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";


import "./GamePage.scss";

import SearchBar from './SearchBar';
import GameList from './GamesList';

const GamesPage = (props) => {

  const [term, setTerm] = useState("");
  const [games, setGames] = useState([]);
  const [results, setResults] = useState([]);
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    if (games.length === 0) {
      axios.get("/api/games").then((res) => {
        setGames(res.data)
        setResults(res.data)
      })
    }
    
    const test = games.filter((game) => game.name.includes(term));
    setResults(test);

  }, [term])

  const findSession = (gameID, userID) => {
    // set mode to loading or something 
    // 
    axios.post("/api/sessions", {gameID, userID} ).then((res) => {
      props.setCurrentSession({session_id: res.data.session_id});
      setRedirect(true);
    })
  }

  const redirectSessions = () => {
    if (redirect) {
      return <Redirect to='/sessions'/>
    }
  }

  return (
    <div>
    { redirectSessions() ||
      <div>
        <div className="searchBar">
          <SearchBar onSearch={term => setTerm(term)}/>
        </div>
        <div className="gameList">
          <GameList currentUser={props.currentUser} games={results} findSession={findSession}/>
        </div>
      </div> 
    }
    </div>
  )
}

export default GamesPage;