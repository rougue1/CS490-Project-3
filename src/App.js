/*eslint-disable */

import './App.css';
import React, { useState } from 'react';
import { GLogout } from './components/logout';
import { GLogin } from './components/login';
import { Home } from './components/home'
import 'bootstrap/dist/css/bootstrap.min.css';
require("dotenv").config();

function App() {
  console.log(process.env.HI);
  const [loginStatus, setLoginStatus] = useState(false);

  return (
    <div className="App">
      <div className="wrap">
        {loginStatus === true
          ?
          <div>
            <Home />
            <GLogout setLoginStatus={setLoginStatus} />
          </div>
          : <GLogin setLoginStatus={setLoginStatus} />}
      </div>
    </div>
  );
}

export default App;
