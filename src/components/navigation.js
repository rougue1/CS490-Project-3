/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import PropTypes from "prop-types";
import "../styles/navigation.css";
import { GLogout } from "./logout";
import { Home } from "./home";

export function NavBar({ setLoginStatus })
{
    const [userData, setUserData] = useState({});
    const [ navActive, setNavActive ] = useState("");
    const [ burgerIcon, changeBurgerIcon ] = useState("");

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

    const navSlide = () => {
      navActive === "" ? setNavActive("navLinkActive") : setNavActive("");
      burgerIcon === "" ? changeBurgerIcon("toggle") : changeBurgerIcon("");
    }

    const toggleNav = () => {
      navActive === "" ? setNavActive("navLinkActive") : setNavActive("");
      burgerIcon === "" ? changeBurgerIcon("toggle") : changeBurgerIcon("");
    }

    return (
        <div>
            <div className="header">
              <div className="title">
                <h1>Welcome, {userData.full_name}</h1>
              </div>
              <nav className="navBar">
                <div className={`navLinks ${  navActive}`}>
                  <div>
                    <Link className="navBtn underline_slide" to="/stats" onClick={toggleNav}>STATS</Link>
                  </div>
                  <div>
                    <Link className="navBtn underline_slide" to="/history" onClick={toggleNav}>HISTORY</Link>
                  </div>
                  <div>
                    <Link className="navBtn underline_slide" to="/home" onClick={toggleNav}>HOME</Link>
                  </div>
                  <div>
                    <Link className="navBtn underline_slide" to="/chart" onClick={toggleNav}>CHART</Link>
                  </div>
                  <div>
                      <GLogout setLoginStatus={setLoginStatus} />
                  </div>
                </div>
                <div className={`burger ${  burgerIcon}`} onClick={navSlide}>
                  <div className="line1">{}</div>
                  <div className="line2">{}</div>
                  <div className="line3">{}</div>
                </div>
              </nav>
            </div>

            <Switch>
              <div className="pageBody">
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
              </div>
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