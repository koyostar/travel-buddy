import { Route, Switch } from "react-router-dom";

import HomePage from "./HomePage.jsx";
import AccommodationPage from "./AccommodationPage.jsx";
import Header from "./Header.jsx";
import Navbar from "./NavBar.jsx";

function App() {
  return (
    <>
      <Header />
      <div className="app-container">
        <Switch>
          <Route path="/">
            <HomePage />
          </Route>
          <Route path="/accommodation">
            <AccommodationPage />
          </Route>
        </Switch>
      </div>
      <Navbar />
    </>
  );
}

export default App;
