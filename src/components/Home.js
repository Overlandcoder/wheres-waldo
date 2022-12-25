import { Link } from "react-router-dom";

const Home = () => {
  return(
    <div className="home">
      <Link to="/beach">
        Beach
      </Link>
    </div>
  )
}

export default Home;