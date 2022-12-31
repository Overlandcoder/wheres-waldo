import './App.css';
import Game from './components/Game';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import beachImage from "./images/beach_image.jpg";
import skiImage from "./images/ski_image.jpg";
import spaceImage from "./images/space_image.jpg";
import Leaderboard from "./components/Leaderboard";
import { useEffect, useState } from 'react';

function App() {
  const maps = [{ "name": "beach", "image": beachImage },
                { "name": "ski", "image": skiImage },
                { "name": "space", "image": spaceImage }];

  const [currentMap, setCurrentMap] = useState(maps[0]);
  const handleClick = map => setCurrentMap(map);
  const formattedTime = seconds => {
    return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
  }

  useEffect(() => {
    const data = window.localStorage.getItem("currentMapName");
    const findMapByName = maps.find(map => map.name === data);
    console.log(`data: ${data}`)
    console.log(findMapByName)
    console.log("current")
    console.log(currentMap.name)
    if ( currentMap === undefined ) setCurrentMap(findMapByName);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("currentMapName", currentMap.name);
  }, [currentMap.name]);

  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" exact element={<Home maps={maps} handleClick={handleClick} />} />
          <Route path={`/${currentMap.name}`} element={<Game map={currentMap} formattedTime={formattedTime} />} />
          <Route path="/leaderboard" element={<Leaderboard maps={maps} formattedTime={formattedTime} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
