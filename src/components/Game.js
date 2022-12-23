import beachWallpaper from "../images/waldo_beach.jpg";
import waldo from "../images/waldo.jpg";
import wizard from "../images/wizard.jpg";
import odlaw from "../images/odlaw.jpg";
import wilma from "../images/wilma.jpg";

const Game = () => {

  return (
    <div className="game">
      <div className="characters">
        <img src={waldo}></img>
        <img src={wizard}></img>
        <img src={odlaw}></img>
        <img src={wilma}></img>
      </div>
      <img src={beachWallpaper} className="wallpaper"></img>
    </div>
  )
}

export default Game;
