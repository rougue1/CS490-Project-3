/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import PropTypes from "prop-types";
import "../styles/navigation.css";
import { GLogout } from "./logout";
import { Home } from "./home";
import { Stats } from "./stats";
import { History } from "./history";
import { Charts } from "./charts";

export function NavBar({ setLoginStatus }) {
  const [userData, setUserData] = useState({});
  const [navActive, setNavActive] = useState("");
  const [burgerIcon, changeBurgerIcon] = useState("");
  const [activeTab, setActiveTab] = useState("home");

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
  };

  const toggleNav = (id) => {
    navActive === "" ? setNavActive("navLinkActive") : setNavActive("");
    burgerIcon === "" ? changeBurgerIcon("toggle") : changeBurgerIcon("");

    let element = document.getElementById(activeTab);
    element.classList.remove("underline");
    setActiveTab(id);
    element = document.getElementById(id);
    element.classList.add("underline");
  };

  return (
    <div>
      <div className="header">
        <div className="title">
          <h1>Welcome, {userData.full_name}</h1>
        </div>
        <nav className="navBar">
          <div className={`navLinks ${navActive}`}>
            <div>
              <Link id="stats" className="navBtn underline_slide" to="/stats" onClick={() => toggleNav("stats")}>
                STATS
              </Link>
            </div>
            <div>
              <Link id="history" className="navBtn underline_slide" to="/history" onClick={() => toggleNav("history")}>
                HISTORY
              </Link>
            </div>
            <div>
              <Link
                id="home"
                className="navBtn underline_slide  underline"
                to="/home"
                onClick={() => toggleNav("home")}
              >
                HOME
              </Link>
            </div>
            <div>
              <Link id="chart" className="navBtn underline_slide" to="/chart" onClick={() => toggleNav("chart")}>
                CHART
              </Link>
            </div>
            <div>
              <GLogout setLoginStatus={setLoginStatus} />
            </div>
          </div>
          <div className={`burger ${burgerIcon}`} onClick={navSlide}>
            <div className="line1">{}</div>
            <div className="line2">{}</div>
            <div className="line3">{}</div>
          </div>
        </nav>
      </div>

      <Switch>
        <div className="pageBody">
          <Route path="/stats">
            <Stats />
          </Route>
          <Route path="/history">
            <History />
          </Route>
          <Route path="/home">
            <Home userData={userData} getUserInfo={getUserInfo} />
          </Route>
          <Route path="/chart">
            <Charts />
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
