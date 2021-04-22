import React, { useState, useEffect } from "react";
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import PropTypes from "prop-types";
import { GLogout } from "./logout";
import { Home } from "./home";

export function NavBar({ setLoginStatus })
{
    const [userData, setUserData] = useState({});

    function getUserInfo() {
    fetch("/userInfo")
      .then((res) => res.json())
      .then((val) => {
        setUserData(val);
      });
    }
    
    useEffect(() => {
        getUserInfo();
    }, []);
    
    return (
        <div>
            <div>
                <h1>Welcome, {userData.full_name}</h1>
            </div>
            <nav>
                <li>
                  <Link to="/stats">Stats</Link>
                </li>
                <li>
                  <Link to="/history">History</Link>
                </li>
                <li>
                  <Link to="/home">Home</Link>
                </li>
                <li>
                  <Link to="/chart">Chart</Link>
                </li>
                <li>
                    <GLogout setLoginStatus={setLoginStatus} />
                </li>
            </nav>
            
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
                <Route path="/stats">
                    <h1>Stats</h1>
                </Route>
                <Route path="/history">
                    <h1>History</h1>
                </Route>
                <Route path="/home">
                    <Home userData={userData} getUserInfo={getUserInfo} />
                </Route>
                <Route path="/chart">
                    <h1>Chart</h1>
                </Route>
            </Switch>
        </div>    
    );
}

NavBar.propTypes = {
  setLoginStatus: PropTypes.func,
};

NavBar.defaultProps = {
  setLoginStatus: PropTypes.func,
};


export default NavBar;