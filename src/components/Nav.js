import { Link } from "react-router-dom";

const Nav = () => {
  return(
    <nav>
      <Link className="nav-link" to="/">
        <h2>Where's Waldo</h2>
      </Link>
      <ul>
        <Link className="nav-link" to="/">
          <li>Home</li>
        </Link>
      </ul>
    </nav>
  )
}

export default Nav;