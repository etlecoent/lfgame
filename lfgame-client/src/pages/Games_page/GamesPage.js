import GamelistItem from './GamesListItem';

const GamesPage = (props) => {
  const gameName = "Among Us";
  const imageURL = 'https://preview.redd.it/w0lmb8i7odo51.png?width=960&crop=smart&auto=webp&s=94f47357a899ebb7be0fb9f655ca71cef3f53edc';
  const sessionsNum = 100000;

  return(
    <GamelistItem 
    name={gameName}
    imageSource={imageURL}
    numOfSessions={sessionsNum}
    />
  )


  
}

export default GamesPage;

// #SearchBar 
// #GameList
// #GamelistItem