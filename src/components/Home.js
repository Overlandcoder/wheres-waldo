import { Link } from "react-router-dom";

const Home = props => {
  const { maps } = props;

  return (
    <div className="home">
      <h1 className="dark-blue-heading border-bottom-yellow">Choose a map</h1>
      {maps.map((map, index) => {
        return (
          <div key={index} className="map-home">
            <h2 className="capitalize">{map.name}</h2>
            <Link to={`/wheres-waldo/${map.name}`}>
              <img src={map.image} className="map-link" alt="where's waldo map"></img>
            </Link>
          </div>)
      })}

    </div>
  )
}

export default Home;