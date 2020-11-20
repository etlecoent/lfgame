import "./GamesListItem.scss";

const GamesListItem = (props) => {
  // const name = "Among Us";
  // const imageSource = 'https://preview.redd.it/w0lmb8i7odo51.png?width=960&crop=smart&auto=webp&s=94f47357a899ebb7be0fb9f655ca71cef3f53edc';
  // const numOfSessions = 100000

  return(
    <article>
      <header>
        {props.name}
      </header>
      <div>
        <img class="game_image" src={props.imageSource}></img>
      </div>
      <footer>
        Number of sessions: {props.numOfSessions}
      </footer>
    </article>
  )
}

export default GamesListItem;





// export default function Album(props) {
//   const albumInfoClass = classnames("album__info", {
//     "album__info--explicit": props.collectionExplicitness === "explicit"
//   });

//   return (
//     <article className="album">
//       <img className="album__thumbnail" src={props.artworkUrl100} alt="Album" />
//       <div className={albumInfoClass}>
//         <div className="album__name">{props.collectionName}</div>
//         <div className="album__artist">{props.artistName}</div>
//       </div>
//     </article>
//   );
// }