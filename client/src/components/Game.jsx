import "./Game.css";
import { useEffect, useRef, useState } from "react";
const CHARACTERS = ["Waldo", "Odlaw", "Wizard", "Wilma"];

const formatTime = (totalSeconds) => {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

function Game({ mapName, imageUrl }) {
  const [clickPos, setClickPos] = useState(null);
  const [foundCharacters, setFoundCharacters] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const imageRef = useRef(null);

  useEffect(() => {
    if (foundCharacters.length === CHARACTERS.length) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [foundCharacters.length]);

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
        setFoundCharacters([
          ...foundCharacters,
          { name: characterName, ...clickPos },
        ]);
      }
      setClickPos(null);
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
  const remainingCharacters = CHARACTERS.filter(
    (char) => !foundCharacters.includes(char)
  );

  return (
    <div className="game-container">
      <div className="game-header">
        <div className="game-stats">
          <span className="label">TIME</span>
          <span className="value">{formatTime(seconds)}</span>
        </div>
        <div className="game-stats">
          <span className="label">FOUND</span>
          <span className="value">
            {foundCharacters.length} / {CHARACTERS.length}
          </span>
        </div>
      </div>
      <div
        className="image-wrapper"
        style={{ position: "relative", display: "inline-block" }}
      >
        <img
          ref={imageRef}
          src={imageUrl}
          className="game-image"
          alt={mapName}
          onClick={handleImageClick}
        />
        {foundCharacters.map((char) => (
          <div
            className="found-box"
            key="char"
            style={{ left: `${char.x}%`, top: `${char.y}%` }}
          ></div>
        ))}
        {clickPos && (
          <>
            <div className="target-box" style={targetBoxStyle} />
            <div className="selection-menu" style={selectionMenuStyle}>
              {remainingCharacters.map((char) => (
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
    </div>
  );
}

export default Game;
