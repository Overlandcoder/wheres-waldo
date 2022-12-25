import { Link } from "react-router-dom";

const Nav = () => {
  return(
    <nav>
      <h2>Where's Waldo</h2>
      <ul>
        <Link className="nav-link" to="/">
          <li>Home</li>
        </Link>
      </ul>
    </nav>
  )
}

export default Nav;