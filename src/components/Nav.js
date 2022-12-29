import { Link } from "react-router-dom";

const Nav = () => {
  return(
    <nav>
      <Link className="nav-link nav-heading" to="/">
        Where's Waldo
      </Link>
      <ul>
        <Link className="nav-link" to="/">
          <li>Home</li>
        </Link>
        <Link className="nav-link" to="/leaderboard">
          <li>Leaderboard</li>
        </Link>
      </ul>
    </nav>
  )
}

export default Nav;