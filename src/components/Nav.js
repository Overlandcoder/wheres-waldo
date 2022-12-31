import { Link } from "react-router-dom";

const Nav = () => {
  return(
    <nav>
      <Link className="nav-link nav-heading" to="/wheres_waldo">
        Where's Waldo
      </Link>
      <ul>
        <Link className="nav-link" to="/wheres_waldo">
          <li>Home</li>
        </Link>
        <Link className="nav-link" to="/wheres_waldo/leaderboard">
          <li>Leaderboard</li>
        </Link>
      </ul>
    </nav>
  )
}

export default Nav;