import GamesListItem from "./GamesListItem";

const GamesList = (props) => {

  return props.games.map(game => {
    return (

      <GamesListItem 
        name={game.name} 
        imageSource={game.imageURL} 
        numOfSessions={game.sessionsNum}
      />
    );
  });
}

export default GamesList;