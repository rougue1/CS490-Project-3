import React from "react";
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
    
    return (
        <div>
            <nav>
                <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/about">About</Link>
                    </li>
                    <li>
                      <Link to="/users">Users</Link>
                    </li>
                    <li>
                        <GLogout setLoginStatus={setLoginStatus} />
                    </li>
                </ul>
            </nav>
            
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
                <Route path="/about">
                    <h1>about</h1>
                </Route>
                <Route path="/users">
                    <h1>user</h1>
                </Route>
                <Route path="/">
                    <Home setLoginStatus={setLoginStatus} />
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