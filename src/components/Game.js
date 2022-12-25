import { useState } from "react";
import beachWallpaper from "../images/waldo_beach.jpg";
import waldo from "../images/waldo.jpg";
import wizard from "../images/wizard.jpg";
import odlaw from "../images/odlaw.jpg";
import wilma from "../images/wilma.jpg";
import Stopwatch from "./Stopwatch";

const Game = () => {
  const [foundWaldo, setFoundWaldo] = useState(false);
  const [foundWilma, setFoundWilma] = useState(false);
  const [foundOdlaw, setFoundOdlaw] = useState(false);
  const [foundWizard, setFoundWizard] = useState(false);
  const [imgHeight, setImgHeight] = useState(0);
  const [imgWidth, setImgWidth] = useState(0);

  window.onload = () => {
    const wallpaper = document.querySelector(".wallpaper");
    setImgHeight(wallpaper.height);
    setImgWidth(wallpaper.width);
  }

  const handleClick = event => {
    const x = event.pageX;
    const y = event.pageY;

    if (!foundWaldo) setFoundWaldo(checkWaldoCoords(x, y));
    if (!foundWilma) setFoundWilma(checkWilmaCoords(x, y));
    if (!foundOdlaw) setFoundOdlaw(checkOdlawCoords(x, y));
    if (!foundWizard) setFoundWizard(checkWizardCoords(x, y));
  }

  const checkWaldoCoords = (x, y) => {
    if ((x >= .721 * imgWidth && x <= .734 * imgWidth) &&
      (y >= .366 * imgHeight && y <= .403 * imgHeight)) return true;
    return false;
  }

  const checkWilmaCoords = (x, y) => {
    if ((x >= .877 * imgWidth && x <= .887 * imgWidth) &&
      (y >= .399 * imgHeight && y <= .418 * imgHeight)) return true;
    return false;
  }

  const checkOdlawCoords = (x, y) => {
    if ((x >= .211 * imgWidth && x <= .226 * imgWidth) &&
      (y >= .344 * imgHeight && y <= .393 * imgHeight)) return true;
    return false;
  }

  const checkWizardCoords = (x, y) => {
    if ((x >= .373 * imgWidth && x <= .395 * imgWidth) &&
      (y >= .343 * imgHeight && y <= .38 * imgHeight)) return true;
    return false;
  }

  return (
    <div className="game">
      <div className="sidebar">
        <div className="stopwatch">
          <Stopwatch />
        </div>
        <div className="characters">
          <div className={foundWaldo ? "green-border Zoom" : ""}>
            <img src={waldo} alt="waldo" className={foundWaldo ? "found" : ""}></img>
          </div>
          <div className={foundWizard ? "green-border Zoom" : ""}>
            <img src={wizard} alt="wizard" className={foundWizard ? "found" : ""}></img>
          </div>
          <div className={foundOdlaw ? "green-border Zoom" : ""}>
            <img src={odlaw} alt="odlaw" className={foundOdlaw ? "found" : ""}></img>
          </div>
          <div className={foundWilma ? "green-border Zoom" : ""}>
            <img src={wilma} alt="wilma" className={foundWilma ? "found" : ""}></img>
          </div>
        </div>
      </div>
      <img src={beachWallpaper} onClick={handleClick} alt="beach wallpaper for a game of where's waldo" className="wallpaper"></img>
    </div>
  )
}

export default Game;
