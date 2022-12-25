import './App.css';
import Game from './components/Game';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/beach" element={<Game />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
