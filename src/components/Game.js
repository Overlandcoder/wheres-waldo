import { useEffect, useState } from "react";
import beachWallpaper from "../images/waldo_beach.jpg";
import waldo from "../images/waldo.jpg";
import wizard from "../images/wizard.jpg";
import odlaw from "../images/odlaw.jpg";
import wilma from "../images/wilma.jpg";
import Stopwatch from "./Stopwatch";

const Game = () => {
  const [seconds, setSeconds] = useState(0);
  const [charsFound, setCharsFound] = useState({
    waldo: false, wizard: false, odlaw: false, wilma: false
  });
  const [gameOver, setGameOver] = useState(false);
  let wallpaper;
  let imgHeight;
  let imgWidth;

  useEffect(() => {
    const isGameOver = () => charsFound.waldo && charsFound.wizard && charsFound.odlaw && charsFound.wilma;
    if (isGameOver()) setGameOver(true);

    return () => setGameOver(false);
  }, [charsFound.waldo, charsFound.wizard, charsFound.odlaw, charsFound.wilma])

  useEffect(() => {
    let interval;
    if (!gameOver) {
      interval = setInterval(() => {
        setSeconds(seconds + 1);
      }, 1000)
    }

    return () => clearInterval(interval);
  })

  const handleClick = async event => {
    wallpaper = document.querySelector(".wallpaper");
    imgHeight = wallpaper.height;
    imgWidth = wallpaper.width;
    const x = (event.pageX / imgWidth).toFixed(4);
    const y = (event.pageY / imgHeight).toFixed(4);

    const response = await fetch(`http://localhost:3000/api/check_guess?x=${x}&y=${y}&map=beach`);
    const data = await response.json();
    if (data["found"] !== "none") setCharsFound({ ...charsFound, [data["found"]]: true });
    if (gameOver) console.log("you won")
  }

  return (
    <div className="game">
      <div className="sidebar">
        <div className="stopwatch">
          <Stopwatch seconds={seconds} />
        </div>
        <div className="characters">
          <div className={charsFound.waldo ? "green-border Zoom" : ""}>
            <img src={waldo} alt="waldo" className={charsFound.waldo ? "found" : ""}></img>
          </div>
          <div className={charsFound.wizard ? "green-border Zoom" : ""}>
            <img src={wizard} alt="wizard" className={charsFound.wizard ? "found" : ""}></img>
          </div>
          <div className={charsFound.odlaw ? "green-border Zoom" : ""}>
            <img src={odlaw} alt="odlaw" className={charsFound.odlaw ? "found" : ""}></img>
          </div>
          <div className={charsFound.wilma ? "green-border Zoom" : ""}>
            <img src={wilma} alt="wilma" className={charsFound.wilma ? "found" : ""}></img>
          </div>
        </div>
        {gameOver ? <div>You won in <Stopwatch seconds={seconds} /></div> : null}
      </div>
      <img src={beachWallpaper} onClick={handleClick} alt="beach wallpaper for a game of where's waldo" className="wallpaper"></img>
    </div>
  )
}

export default Game;
