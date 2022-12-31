import { Link } from "react-router-dom";

const Home = props => {
  const { maps } = props;

  return (
    <div className="home">
      <h1 className="home-heading border-bottom-yellow">Choose a map</h1>
      {maps.map((map, index) => {
        return (
          <div key={index} className="map-home">
            <h2 className="capitalize">{map.name}</h2>
            <Link to={`/${map.name}`}>
              <img src={map.image} className="beach-link" alt="where's waldo beach map"></img>
            </Link>
          </div>)
      })}

    </div>
  )
}

export default Home;