import "./Game.css";
import { useRef, useState } from "react";
const CHARACTERS = ["Waldo", "Odlaw", "Wizard", "Wilma"];

function Game({ mapName, imageUrl }) {
  const [clickPos, setClickPos] = useState(null);
  // const [charsFound, setCharsFound] = useState([]);
  const imageRef = useRef(null);

  const handleImageClick = async (event) => {
    const rect = imageRef.current.getBoundingClientRect();
    const xPixel = event.clientX - rect.left;
    const yPixel = event.clientY - rect.top;
    const xPercent = (xPixel / rect.width) * 100;
    const yPercent = (yPixel / rect.height) * 100;
    setClickPos({ x: xPercent, y: yPercent });
  };

  const handleCharSelection = async (characterName) => {
    try {
      const response = await fetch("http://localhost:3000/api/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          x: clickPos.x,
          y: clickPos.y,
          characterName,
        }),
      });

      if (!response.ok) throw new Error(`Status: ${response.status}`);

      const data = await response.json();
      console.log("Backend response:", data);
      if (data.found) {
        alert("Waldo found");
      }
    } catch (error) {
      console.error("Server error:", error.message);
    }
  };

  const targetBoxStyle = clickPos
    ? { left: `${clickPos.x}%`, top: `${clickPos.y}%` }
    : {};
  const selectionMenuStyle = clickPos
    ? { left: `${clickPos.x + 2}%`, top: `${clickPos.y}%` }
    : {};

  return (
    <div className="game-container">
      <img
        ref={imageRef}
        src={imageUrl}
        className="game-image"
        alt={mapName}
        onClick={handleImageClick}
      />
      {clickPos && (
        <>
          <div className="target-box" style={targetBoxStyle} />
          <div className="selection-menu" style={selectionMenuStyle}>
            {CHARACTERS.map((char) => (
              <button key={char} onClick={() => handleCharSelection(char)}>
                {char}
              </button>
            ))}
            <button
              onClick={() => setClickPos(null)}
              style={{ color: "#999", fontSize: "0.8rem" }}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Game;
