import { Route, Routes } from "react-router-dom";

import HomePage from "./HomePage.jsx";
import AccommodationPage from "./Accommodation/AccommodationPage.jsx";
import PlacesPage from "./Places/PlacesPage.jsx";
import Header from "./Header.jsx";
import Navbar from "./NavBar.jsx";

function App() {
  return (
    <>
      <div className="app-container">
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/accommodation" element={<AccommodationPage />} />
          <Route path="/places" element={<PlacesPage />} />
          <Route path="/food" element={<AccommodationPage />} />
        </Routes>
        <Navbar />
      </div>
    </>
  );
}

export default App;
