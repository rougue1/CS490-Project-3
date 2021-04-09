import './App.css';
import React, { useState } from 'react';
import { Login } from './components/login';

function App() {
  const [loginStatus, setLoginStatus] = useState('loggedIn');

  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
