import "./Game.css";
import { useEffect, useRef, useState } from "react";
const CHARACTERS = ["Waldo", "Odlaw", "Wizard", "Wilma"];

const formatTime = (totalSecondsElapsed) => {
  const mins = Math.floor(totalSecondsElapsed / 60);
  const secs = totalSecondsElapsed % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

function Game({ mapName, imageUrl }) {
  const [clickPos, setClickPos] = useState(null);
  const [foundCharacters, setFoundCharacters] = useState([]);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [clickFeedback, setClickFeedback] = useState({
    message: "",
    type: "",
    visible: false,
  });
  const [isGameWon, setIsGameWon] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    if (foundCharacters.length === CHARACTERS.length) return;

    const interval = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
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
        if (foundCharacters.length + 1 === CHARACTERS.length) {
          setIsGameWon(true);
        }
        showClickFeedback(`${characterName} has been found!`, "success");
      } else {
        showClickFeedback("Nope, try again!", "failure");
      }
      setClickPos(null);
    } catch (error) {
      console.error("Server error:", error.message);
    }
  };

  const showClickFeedback = (message, type) => {
    setClickFeedback({ message, type, visible: true });

    setTimeout(() => {
      setClickFeedback((prev) => ({ ...prev, visible: false }));
    }, 2500);
  };

  const targetBoxStyle = clickPos
    ? { left: `${clickPos.x}%`, top: `${clickPos.y}%` }
    : {};
  const selectionMenuStyle = clickPos
    ? { left: `${clickPos.x + 2}%`, top: `${clickPos.y}%` }
    : {};
  const remainingCharacters = CHARACTERS.filter(
    (char) => !foundCharacters.some((foundChar) => foundChar.name === char)
  );

  return (
    <div className="game-container">
      <div className="game-header">
        <div className="game-stats">
          <span className="label">TIME</span>
          <span className="value">{formatTime(secondsElapsed)}</span>
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
            key={char.name}
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
      {clickFeedback.visible && (
        <div className={`feedback-notification ${clickFeedback.type}`}>
          {clickFeedback.message}
        </div>
      )}
      {isGameWon && (
        <div className="game-won-overlay">
          <div className="game-won-modal">
            <h2>You did it!</h2>
            <p>You found 'em all in {formatTime(secondsElapsed)}</p>

            <div className="game-won-footer">
              <button
                className="play-again-btn"
                onClick={() => window.location.reload()}
              >
                Play Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Game;
