import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";


import "./GamePage.scss";

import SearchBar from './SearchBar';
import GameList from './GamesList';

const imageURL = 'https://preview.redd.it/w0lmb8i7odo51.png?width=960&crop=smart&auto=webp&s=94f47357a899ebb7be0fb9f655ca71cef3f53edc';

const gamesArray = [
  { name: "Among Us", imageURL: imageURL, sessionsNum: 100 },
  { name: "Monster Hunter World", imageURL: imageURL, sessionsNum: 80 },
  { name: "Final Fanatasy 14", imageURL: imageURL, sessionsNum: 100 },
  { name: "Team Fortress 2", imageURL: imageURL, sessionsNum: 100 },
  { name: "Destiny 2", imageURL: imageURL, sessionsNum: 100 },
  { name: "draw.io", imageURL: imageURL, sessionsNum: 1 },
  { name: "League of Legends", imageURL: imageURL, sessionsNum: 100 },
  { name: "Monopoly", imageURL: imageURL, sessionsNum: 150 }
];

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
    console.log(gameID, userID);
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