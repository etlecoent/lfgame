import { useState, useEffect } from "react";

import "./GamePage.scss";

import SearchBar from './SearchBar';
import GameList from './GamesList';

const imageURL = 'https://preview.redd.it/w0lmb8i7odo51.png?width=960&crop=smart&auto=webp&s=94f47357a899ebb7be0fb9f655ca71cef3f53edc';

const games = [
  { name: "Among Us", imageURL: imageURL, sessionsNum: 100},
  { name: "Monster Hunter World", imageURL: imageURL, sessionsNum: 80},
  { name: "Final Fanatasy 14", imageURL: imageURL, sessionsNum: 100},
  { name: "Team Fortress 2", imageURL: imageURL, sessionsNum: 100},
  { name: "Destiny 2", imageURL: imageURL, sessionsNum: 100},
  { name: "draw.io", imageURL: imageURL, sessionsNum: 1},
  { name: "League of Legends", imageURL: imageURL, sessionsNum: 100}
];

const GamesPage = () => {

  const [term, setTerm] = useState("");
  const [results, setResults] = useState(games);
  
  useEffect(() => {
    
    const test = games.filter((game) => game.name.includes(term));
    setResults(test);
  }, [term])

  return(
    <div>
      <div className="searchBar">
        <SearchBar onSearch={term => setTerm(term)}/>
      </div>
      <div className="gameList">
        <GameList games={results}/>
      </div>
    </div>
  )
}

export default GamesPage;