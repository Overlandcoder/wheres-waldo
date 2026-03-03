import "./Game.css"
import { useRef, useState } from "react"

function Game({ mapName, imageUrl }) {
  const [clickPos, setClickPos] = useState(null);
  const imageRef = useRef(null);

  const handleClick = (event) => {
    const rect = imageRef.current.getBoundingClientRect();
    const xPixel = event.clientX - rect.left;
    const yPixel = event.clientY - rect.top;
    const xPercent = (xPixel / rect.width) * 100;
    const yPercent = (yPixel / rect.height) * 100;
    setClickPos({ x: xPercent, y: yPercent });
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
      {clickPos && (
        <div
          className="target-box"
          style={{
            left: `${clickPos.x}%`,
            top: `${clickPos.y}%`
          }}
        />
      )}
    </div>
  )
}

export default Game
