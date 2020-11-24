import GamesListItem from "./GamesListItem";

const GamesList = (props) => {

  return props.games.map(game => {
    return (

      <GamesListItem 
        key={game.id}
        gameID={game.id}
        name={game.name} 
        userID={props.currentUser.id}
        imageSource={game.picture_url} 
        numOfSessions={game.sessionsNum}
        findSession={props.findSession}
      />
    );
  });
}

export default GamesList;