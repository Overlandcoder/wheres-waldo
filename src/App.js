import './App.css';
import Game from './components/Game';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Leaderboard from "./components/Leaderboard";

function App() {
  const mapNames = ["beach"];

  const formattedTime = seconds => {
    return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
  }

  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/beach" element={<Game mapName="beach" formattedTime={formattedTime} />} />
          <Route path="/leaderboard" element={<Leaderboard mapNames={mapNames} formattedTime={formattedTime} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
