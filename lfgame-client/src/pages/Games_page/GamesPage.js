import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";


import "./GamesPage.scss";

import SearchBar from './SearchBar';
import GameList from './GamesList';
import DifficultyLevel from './DifficultyLevel';

const GamesPage = (props) => {

  const [term, setTerm] = useState("");
  const [games, setGames] = useState([]);
  const [results, setResults] = useState([]);
  const [modalState, setModalState] = useState({
    show: false,
    gameID: null,
    userID: props.currentUser.id
  });
  let history = useHistory();


  useEffect(() => {
    if (games.length === 0) {
      axios.get("/api/games", { headers: {"Authorization" : props.token} }).then((res) => {
        setGames(res.data)
        setResults(res.data)
      })
    }
    
    const test = games.filter((game) => game.name.toLowerCase().includes(term.toLowerCase()));
    setResults(test);

  }, [term])

  const findSession = (difficultyLevel) => {
    axios.post("/api/sessions", {
      gameID: modalState.gameID,
      userID: modalState.userID,
      difficultyLevel
    }, { headers: {"Authorization" : props.token} }).then((res) => {
      props.setCurrentSession({session_id: res.data.session_id});
      history.push("/sessions");
    })
  }

  return (
  
    <section className="page">
      <SearchBar onSearch={term => setTerm(term)}/>
      <div className="gameList">
        <GameList games={results} setModalState={setModalState}/>
      </div>
      <DifficultyLevel
      show={modalState.show}
      onHide={() => setModalState(state => ({...state, show:false}))}
      animation={false}
      findSession={findSession}
      />
    </section> 
  )
}

export default GamesPage;