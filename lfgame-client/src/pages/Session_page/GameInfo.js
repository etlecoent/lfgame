
const GameInfo = (props) => {

  return(
    <article className="gameInfo" >
      <header className="gameListName">
        <h2 className="game-name">
          {props.gameInfo.name}:
        </h2>
        <p className="difficulty">{props.gameInfo.difficulty_level}</p>
      </header>
      <div className="game-image-container">
        <img className="gameInfoImage" alt={props.gameInfo.id} src={props.gameInfo.picture_url}></img>
      </div>
    </article>
  )
}

export default GameInfo;