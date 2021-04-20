import "./App.css";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { GLogout } from "./components/logout";
import { LandingPage } from "./components/landingPage";
import { Home } from "./components/home";
import "bootstrap/dist/css/bootstrap.min.css";

require("dotenv").config();

function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  return (
    <div className="App">
      <div className="wrap">
        {loginStatus === true ? (
          <div className="mainPage">
            <Home />
            <GLogout setLoginStatus={setLoginStatus} />
          </div>
        ) : (
          <LandingPage setLoginStatus={setLoginStatus} />
        )}
      </div>
    </div>
  );
}

App.propTypes = {
  setLoginStatus: PropTypes.func,
};

App.defaultProps = {
  setLoginStatus: PropTypes.func,
};

export default App;
