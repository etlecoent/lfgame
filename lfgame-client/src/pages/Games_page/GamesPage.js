import { Fragment, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import axios from "axios";


import "./GamesPage.scss";

import SearchBar from './SearchBar';
import GameList from './GamesList';
import DifficultyLevel from './DifficultyLevel';

const GamesPage = (props) => {

  const [term, setTerm] = useState("");
  const [games, setGames] = useState([]);
  const [results, setResults] = useState([]);
  const [redirect, setRedirect] = useState(null);
  const [modalState, setModalState] = useState({
    show: false,
    gameID: null,
    userID: props.currentUser.id
  });

  // pass the setModal to the gameListItem for it to show on click
  // pass the findSession event to the modal 

  useEffect(() => {
    if (games.length === 0) {
      axios.get("/api/games", { headers: {"Authorization" : props.currentUser.token} }).then((res) => {
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
    }, { headers: {"Authorization" : props.currentUser.token} }).then((res) => {
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
    <Fragment>
    { redirectSessions() ||
      <section className="page">
        <SearchBar onSearch={term => setTerm(term)}/>
        <div className="gameList">
          <GameList currentUser={props.currentUser} games={results} setModalState={setModalState}/>
        </div>
        <DifficultyLevel
        show={modalState.show}
        onHide={() => setModalState(state => ({...state, show:false}))}
        animation={false}
        findSession={findSession}
        />
      </section> 
    }
    </Fragment>
  )
}

export default GamesPage;