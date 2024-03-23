import { Route, Routes } from "react-router-dom";

import HomePage from "./HomePage.jsx";
import AccommodationPage from "./AccommodationPage.jsx";
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
        </Routes>
        <Navbar />
      </div>
    </>
  );
}

export default App;
