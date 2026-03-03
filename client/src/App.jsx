import { useState } from "react"
import "./App.css"
import Game from "./components/Game"

function App() {
  return (
    <div className="App">
      <h1>Where's Waldo?</h1>
      <Game mapName="Beach" imageUrl="/beach.jpg" />
    </div>
  )
}

export default App
