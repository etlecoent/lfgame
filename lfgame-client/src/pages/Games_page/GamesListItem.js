import "./GamesListItem.scss";

const GamesListItem = (props) => {

  return(
    <article className="gameListItem" onClick={() => props.setModalState(state => ({...state, show:true, gameID:props.gameID}))}>
      <header className="gameListName">
        <h1>{props.name}</h1>
      </header>
      <div>
        <img className="gameImage" alt={"Game"} src={props.imageSource}></img>
      </div>
      <footer className="gameListSessions">
        Current gamers: {props.numCurrentGamers}
      </footer>
    </article>
  )
}

export default GamesListItem;