import './App.css';
import React, { useState } from 'react';
import { Login } from './components/login';

function App() {
  const [loginStatus, setLoginStatus] = useState('loggedIn');

  return (
    <div className="App">
      <login />
    </div>
  );
}

export default App;
