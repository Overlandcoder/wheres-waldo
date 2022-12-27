import { useState } from "react";
import beachWallpaper from "../images/waldo_beach.jpg";
import waldo from "../images/waldo.jpg";
import wizard from "../images/wizard.jpg";
import odlaw from "../images/odlaw.jpg";
import wilma from "../images/wilma.jpg";
import Stopwatch from "./Stopwatch";

const Game = () => {
  const [charsFound, setCharsFound] = useState({
    waldo: false, wizard: false, odlaw: false, wilma: false
  });
  const originalHeight = 1109;
  const originalWidth = 1728;
  let wallpaper;
  let imgHeight;
  let imgWidth;

  const handleClick = async event => {
    wallpaper = document.querySelector(".wallpaper");
    imgHeight = wallpaper.height;
    imgWidth = wallpaper.width;
    const x = Math.floor((event.pageX / originalWidth) * imgWidth);
    const y = Math.floor((event.pageY / originalHeight) * imgHeight);

    const response = await fetch(`http:localhost:3000/api/check_guess?x=${x}&y=${y}&map=beach`)
    console.log(response)
    const data = await response.json();
    console.log(data)
    // then(response => {
    //   response.json()
    // })
    // .then(data => setCharsFound({...charsFound, waldo: true}))
  }

  // const checkWaldoCoords = (x, y) => {
  //   if ((x >= .721 * imgWidth && x <= .734 * imgWidth) &&
  //     (y >= .366 * imgHeight && y <= .403 * imgHeight)) return true;
  //   return false;
  // }

  // const checkWilmaCoords = (x, y) => {
  //   if ((x >= .877 * imgWidth && x <= .887 * imgWidth) &&
  //     (y >= .399 * imgHeight && y <= .418 * imgHeight)) return true;
  //   return false;
  // }

  // const checkOdlawCoords = (x, y) => {
  //   if ((x >= .211 * imgWidth && x <= .226 * imgWidth) &&
  //     (y >= .344 * imgHeight && y <= .393 * imgHeight)) return true;
  //   return false;
  // }

  // const checkWizardCoords = (x, y) => {
  //   if ((x >= .373 * imgWidth && x <= .395 * imgWidth) &&
  //     (y >= .343 * imgHeight && y <= .38 * imgHeight)) return true;
  //   return false;
  // }

  return (
    <div className="game">
      <div className="sidebar">
        <div className="stopwatch">
          <Stopwatch />
        </div>
        <div className="characters">
          <div className={charsFound[waldo] ? "green-border Zoom" : ""}>
            <img src={waldo} alt="waldo" className={charsFound[waldo] ? "found" : ""}></img>
          </div>
          <div className={charsFound[wizard] ? "green-border Zoom" : ""}>
            <img src={wizard} alt="wizard" className={charsFound[wizard] ? "found" : ""}></img>
          </div>
          <div className={charsFound[odlaw] ? "green-border Zoom" : ""}>
            <img src={odlaw} alt="odlaw" className={charsFound[odlaw] ? "found" : ""}></img>
          </div>
          <div className={charsFound[wilma] ? "green-border Zoom" : ""}>
            <img src={wilma} alt="wilma" className={charsFound[wilma] ? "found" : ""}></img>
          </div>
        </div>
      </div>
      <img src={beachWallpaper} onClick={handleClick} alt="beach wallpaper for a game of where's waldo" className="wallpaper"></img>
    </div>
  )
}

export default Game;
