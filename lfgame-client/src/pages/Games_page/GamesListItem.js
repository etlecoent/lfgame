import "./GamesListItem.scss";

const GamesListItem = (props) => {

  return(
    <article className="gameListItem" >
      <header className="gameListName">
        {props.name}
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