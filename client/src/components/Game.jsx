import "./Game.css"
import { useRef, useState } from "react"

function Game({ mapName, imageUrl }) {
  const [clickPos, setClickPos] = useState(null);
  const imageRef = useRef(null);

  const handleClick = async (event) => {
    const rect = imageRef.current.getBoundingClientRect();
    const xPixel = event.clientX - rect.left;
    const yPixel = event.clientY - rect.top;
    const xPercent = (xPixel / rect.width) * 100;
    const yPercent = (yPixel / rect.height) * 100;
    setClickPos({ x: xPercent, y: yPercent });

    try {
      const response = await fetch("http://localhost:3000/api/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          x: xPercent,
          y: yPercent,
          characterName: "waldo"
        })
      })

      if (!response.ok) throw new Error(`Status: ${response.status}`);
      
      const data = await response.json();
      console.log("Backend response:", data)
      if (data.found) {
        alert("Waldo found")
      }
    } catch (error) {
      console.error("Server error:", error.message);
    }
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
