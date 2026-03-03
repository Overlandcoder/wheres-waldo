import { useRef, useState } from "react"

function Game({mapName, imageUrl}) {
  return(
    <div className="game-container">
      <img src={imageUrl} alt={mapName}></img>
    </div>
  )
}

export default Game
