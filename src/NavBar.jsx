import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar-container">
      <div className="nav-bar">
        <Link to="/">
          <button className="home-button">Home</button>
        </Link>

        <Link to="/accommodation">
          <button className="accommodation-button">Lodging</button>
        </Link>
        <Link to="/places">
          <button className="places-button">Places</button>
        </Link>

        <Link to="/food">
          <button className="food-button">Food</button>
        </Link>
      </div>
    </div>
  );
}
