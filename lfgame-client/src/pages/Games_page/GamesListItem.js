import "./GamesListItem.scss";

const GamesListItem = (props) => {

  return(
    <article>
      <header>
        {props.name}
      </header>
      <div>
        <img className="game_image" src={props.imageSource}></img>
      </div>
      <footer>
        Number of sessions: {props.numOfSessions}
      </footer>
    </article>
  )
}

export default GamesListItem;