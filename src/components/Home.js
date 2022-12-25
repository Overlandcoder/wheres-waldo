import { Link } from "react-router-dom";
import beachWallpaper from "../images/waldo_beach.jpg";

const Home = () => {
  return(
    <div className="home">
      <h1 className="home-heading">Choose a map</h1>
      <Link to="/beach">
        <img src={beachWallpaper} className="beach-link"></img>
      </Link>
    </div>
  )
}

export default Home;