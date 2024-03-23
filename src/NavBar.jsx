import { Link } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="nav-bar">
      <Router>
        <Link to="/">
          <button className="home-button">Home</button>
        </Link>
      </Router>
      <Router>
        <Link to="/accommodation">
          <button className="accommodation-button">Accommodation</button>
        </Link>
      </Router>
      <button className="places-button">Places</button>
      <button className="food-button">Food</button>
    </div>
  );
}
