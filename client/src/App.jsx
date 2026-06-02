import "./App.css";
import Game from "./components/Game";

function App() {
  return (
    <div className="App">
      <h1>Where's Waldo?</h1>
      <Game mapName="Beach" imageUrl={`${import.meta.env.BASE_URL}beach.jpg`} />
    </div>
  );
}

export default App;
