import './App.css';
import Game from './components/Game';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import beachImage from "./images/beach_image.jpg";
import skiImage from "./images/ski_image.jpg";
import Leaderboard from "./components/Leaderboard";
import { useState } from 'react';

function App() {
  const maps = [{ "name": "beach", "image": beachImage },
                { "name": "ski", "image": skiImage }];

  const [currentMap, setCurrentMap] = useState(maps[0]);
  const formattedTime = seconds => {
    return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
  }

  const handleClick = map=> {
    setCurrentMap(map);
  }

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
