import './App.css';
import React, { useState } from 'react';
import { GLogin } from './components/login';

function App() {
  const [loginStatus, setLoginStatus] = useState(false);

  return (
    <div className="App">
      <GLogin setLoginStatus={setLoginStatus} />

      {loginStatus === true
        ? <div> You are logged in </div>
        : <div> You are not logged in </div>}
    </div>
  );
}

export default App;
