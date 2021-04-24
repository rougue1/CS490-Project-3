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
      // const burger = document.querySelector('.burger');
      const nav = document.querySelector('.navLinks');
      
      nav.classList.toggle('navLinkActive');
    }
    
    return (
        <div>
            <div className="header">
              <div className="title">
                <h1>Welcome, {userData.full_name}</h1>
              </div>
              <nav className="navBar">
                <div className="navLinks">
                  <div>
                    <Link className="navBtn underline_slide" to="/stats">Stats</Link>
                  </div>
                  <div>
                    <Link className="navBtn underline_slide" to="/history">History</Link>
                  </div>
                  <div>
                    <Link className="navBtn underline_slide" to="/home">Home</Link>
                  </div>
                  <div>
                    <Link className="navBtn underline_slide" to="/chart">Chart</Link>
                  </div>
                  <div>
                      <GLogout setLoginStatus={setLoginStatus} />
                  </div>
                </div>
                <div className="burger" onClick={navSlide}>
                  <div>{}</div>
                  <div>{}</div>
                  <div>{}</div>
                </div>
              </nav>
            </div>

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