// import "./GameInfo.scss";

const GameInfo = (props) => {

  return(
    <article className="gameListItem" >
      <header className="gameListName">
        {props.gameInfo.name}
      </header>
      <div>
        <img className="gameImage" src={props.imageSource}></img>
      </div>
    </article>
  )
}

export default GameInfo;