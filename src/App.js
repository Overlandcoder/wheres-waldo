import './App.css';
import Game from './components/Game';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Game />
      </div>
    </Router>
  );
}

export default App;
