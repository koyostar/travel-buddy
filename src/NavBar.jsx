import { Link } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="nav-bar">
      <Link to="/">
        <button className="home-button">Home</button>
      </Link>

      <Link to="/accommodation">
        <button className="accommodation-button">Accommodation</button>
      </Link>
      <button className="places-button">Places</button>
      <button className="food-button">Food</button>
    </div>
  );
}
