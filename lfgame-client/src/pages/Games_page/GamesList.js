import GamesListItem from "./GamesListItem";

const GamesList = (props) => {

  return props.games.map(game => {
    return (

      <GamesListItem 
        key={game.id}
        gameID={game.id}
        name={game.name}
        imageSource={game.picture_url} 
        numCurrentGamers={game.number_current_gamers}
        setModalState={props.setModalState}
      />
    );
  });
}

export default GamesList;