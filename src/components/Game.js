import { useState } from "react";
import beachWallpaper from "../images/waldo_beach.jpg";
import waldo from "../images/waldo.jpg";
import wizard from "../images/wizard.jpg";
import odlaw from "../images/odlaw.jpg";
import wilma from "../images/wilma.jpg";

const Game = () => {
  const [foundWaldo, setFoundWaldo] = useState(false);
  const [foundWilma, setFoundWilma] = useState(false);
  const [foundOdlaw, setFoundOdlaw] = useState(false);
  const [foundWizard, setFoundWizard] = useState(false);

  const handleClick = event => {
    const x = event.pageX;
    const y = event.pageY;

    if (!foundWaldo) setFoundWaldo(checkWaldoCoords(x, y));
    if (!foundWilma) setFoundWilma(checkWilmaCoords(x, y));
    if (!foundOdlaw) setFoundOdlaw(checkOdlawCoords(x, y));
    if (!foundWizard) setFoundWizard(checkWizardCoords(x, y));
  }

  const checkWaldoCoords = (x, y) => {
    if ((x >= 1247 && x <= 1270) && (y >= 407 && y <= 448)) return true;
    return false;
  }

  const checkWilmaCoords = (x, y) => {
    if ((x >= 1516 && x <= 1533) && (y >= 443 && y <= 464)) return true;
    return false;
  }

  const checkOdlawCoords = (x, y) => {
    if ((x >= 366 && x <= 391) && (y >= 382 && y <= 436)) return true;
    return false;
  }

  const checkWizardCoords = (x, y) => {
    if ((x >= 646 && x <= 683) && (y >= 381 && y <= 422)) return true;
    return false;
  }

  return (
    <div className="game">
      <div className="characters">
        <div className={foundWaldo ? "green-border" : ""}>
          <img src={waldo} className={foundWaldo ? "found" : ""}></img>
        </div>
        <div className={foundWizard ? "green-border" : ""}>
          <img src={wizard} className={foundWizard ? "found" : ""}></img>
        </div>
        <div className={foundOdlaw ? "green-border" : ""}>
          <img src={odlaw} className={foundOdlaw ? "found" : ""}></img>
        </div>
        <div className={foundWilma ? "green-border" : ""}>
          <img src={wilma} className={foundWilma ? "found" : ""}></img>
        </div>
      </div>
      <img src={beachWallpaper} onClick={handleClick} className="wallpaper"></img>
    </div>
  )
}

export default Game;
