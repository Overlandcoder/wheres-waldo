import "./Game.css"
import { useRef, useState } from "react"

function Game({ mapName, imageUrl }) {
  const imageRef = useRef(null);

  const handleClick = (event) => {
    const rect = imageRef.current.getBoundingClientRect();
    const xPixel = event.clientX - rect.left;
    const yPixel = event.clientY - rect.top;
    const xPercent = (xPixel / rect.width) * 100;
    const yPercent = (yPixel / rect.height) * 100;
    console.log(xPercent, yPercent)
  }

  return (
    <div className="game-container">
      <img
        ref={imageRef}
        src={imageUrl}
        className="game-image"
        alt={mapName}
        onClick={handleClick}
      />
    </div>
  )
}

export default Game
