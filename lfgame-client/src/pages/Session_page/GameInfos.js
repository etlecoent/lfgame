// import "./GameInfo.scss";

const GameInfo = (props) => {

  return(
    <article className="gameListItem" >
      <header className="gameListName">
        {props.gameInfo.name}
      </header>
      <div>
        <img className="gameImage" src={props.gameInfo.picture_url}></img>
      </div>
    </article>
  )
}

export default GameInfo;