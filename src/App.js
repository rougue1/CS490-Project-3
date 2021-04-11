/*eslint-disable */

import './App.css';
import React, { useState } from 'react';
import { GLogout } from './components/logout';
import { GLogin } from './components/login';
require("dotenv").config();

function App() {
  console.log(process.env.HI);
  const [loginStatus, setLoginStatus] = useState(false);

  return (
    <div className="App">
      {loginStatus === true
        ? <GLogout setLoginStatus={setLoginStatus} />
        : <GLogin setLoginStatus={setLoginStatus} />}
    </div>
  );
}

export default App;
