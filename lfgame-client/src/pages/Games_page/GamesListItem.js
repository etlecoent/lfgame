import "./GamesListItem.scss";

const GamesListItem = (props) => {

  const {gameID, userID} = props;
  
  return(
    <article className="gameListItem" onClick={() => props.findSession(gameID, userID)}>
      <header className="gameListName">
        {props.name}
        Game ID: {gameID}
      </header>
      <div>
        <img className="gameImage" src={props.imageSource}></img>
      </div>
      <footer className="gameListSessions">
        Number of sessions: {props.numOfSessions}
      </footer>
    </article>
  )
}

export default GamesListItem;