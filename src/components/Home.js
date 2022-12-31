import { Link } from "react-router-dom";
import beachWallpaper from "../images/waldo_beach.jpg";

const Home = props => {
  const { mapNames } = props;

  return (
    <div className="home">
      <h1 className="home-heading border-bottom-yellow">Choose a map</h1>
      {mapNames.map((mapName, index) => {
        return (
          <div key={index} className="map-home">
            <h2 className="capitalize">{mapName}</h2>
            <Link to="/beach">
              <img src={beachWallpaper} className="beach-link" alt="where's waldo beach map"></img>
            </Link>
          </div>)
      })}

    </div>
  )
}

export default Home;