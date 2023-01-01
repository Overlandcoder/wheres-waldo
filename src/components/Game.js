import { useEffect, useState } from "react";
import waldo from "../images/waldo.jpg";
import wizard from "../images/wizard.jpg";
import odlaw from "../images/odlaw.jpg";
import wilma from "../images/wilma.jpg";
import Popup from "./Popup";

const Game = props => {
  const { map, formattedTime } = props;
  const [seconds, setSeconds] = useState(0);
  const [charsFound, setCharsFound] = useState({
    waldo: false, wizard: false, odlaw: false, wilma: false
  });
  const [gameOver, setGameOver] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [name, setName] = useState("");
  let [scoreSubmitted, setScoreSubmitted] = useState(false);

  useEffect(() => {
    const isGameOver = () => charsFound.waldo && charsFound.wizard && charsFound.odlaw && charsFound.wilma;
    if (isGameOver()) setGameOver(true);

    return () => setGameOver(false);
  }, [charsFound.waldo, charsFound.wizard, charsFound.odlaw, charsFound.wilma]);

  useEffect(() => {
    let interval;
    if (!gameOver) {
      interval = setInterval(() => {
        setSeconds(seconds + 1);
      }, 1000)
    }

    return () => clearInterval(interval);
  });

  useEffect(() => {
    if (gameOver) setPopupOpen(true);

    return () => setPopupOpen(false);
  }, [gameOver, seconds]);

  const saveScore = async () => {
    const response = await fetch(`https://wheres-waldo-service.onrender.com/api/save_score?name=${name}&seconds=${seconds}&map_name=${map.name}`,
      { method: "post" });
    const data = await response.json();
    if (data["message"] === `Score saved for ${name}`) {
      setScoreSubmitted(true);
      setName("");
    }
  }

  const handleClick = async event => {
    if (gameOver) return;
    const wallpaper = document.querySelector(".wallpaper");
    const imgHeight = wallpaper.height;
    const imgWidth = wallpaper.width;
    const x = (event.pageX / imgWidth).toFixed(4);
    const y = (event.pageY / imgHeight).toFixed(4);

    const response = await fetch(`https://wheres-waldo-service.onrender.com/api/check_guess?x=${x}&y=${y}&map_name=${map.name}`);
    console.log(response)
    
    const data = await response.json();
    if (data["found"] !== "none") setCharsFound({ ...charsFound, [data["found"]]: true });
  }

  const togglePopup = () => setPopupOpen(!popupOpen);
  const handleChange = event => setName(event.target.value);

  return (
    <div className="game">
      <div className="sidebar">
        <div className="stopwatch">{formattedTime(seconds)}</div>
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
        {gameOver && popupOpen ?
          <Popup time={formattedTime(seconds)}
            handleClose={togglePopup}
            handleChange={handleChange}
            saveScore={saveScore}
            scoreSubmitted={scoreSubmitted}
          />
          : null
        }
      </div>
      <img src={map.image} onClick={handleClick} alt="beach wallpaper for a game of where's waldo" className="wallpaper"></img>
    </div>
  )
}

export default Game;
