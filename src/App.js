import './App.css';
import React, { useState } from 'react';
import { GLogout } from './components/logout';
import { GLogin } from './components/login';

function App() {
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
