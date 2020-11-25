import "./GameInfo.scss";

const GameInfo = (props) => {

  return(
    <article className="gameInfo" >
      <header className="gameListName">
        <h1>
          {props.gameInfo.name}
        </h1>
      </header>
      <div>
        <img className="gameInfoImage" alt={props.gameInfo.id} src={props.gameInfo.picture_url}></img>
      </div>
    </article>
  )
}

export default GameInfo;