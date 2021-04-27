import "./styles/App.css";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { LandingPage } from "./components/landingPage";
import { NavBar } from "./components/navigation";
import "bootstrap/dist/css/bootstrap.min.css";

require("dotenv").config();

function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  return (
    <Router>
      <div className="App">
        <div className="wrap">
          {loginStatus === true ? (
            <div className="mainPage">
              <NavBar setLoginStatus={setLoginStatus} />
            </div>
          ) : (
            <LandingPage setLoginStatus={setLoginStatus} />
          )}
        </div>
      </div>
    </Router>
  );
}

App.propTypes = {
  setLoginStatus: PropTypes.func,
};

App.defaultProps = {
  setLoginStatus: PropTypes.func,
};

export default App;
