import React, { useRef } from 'react';
import PropTypes from 'prop-types';

export function Login({ loginStatus, setLoginStatus }) {
  const inputRef = useRef(null);

  function logIn() {
    setLoginStatus('loggedIn');
  }

  return (
    <div className="loginBox">
      <div>
        <input
          className="input"
          ref={inputRef}
          type="text"
          placeholder="User name...."
        />
        <button className="button" type="submit" onClick={logIn}>
          Submit
        </button>
      </div>
    </div>

  );
}

Login.propTypes = {
  loginStatus: PropTypes.string,
  setLoginStatus: PropTypes.objectOf(PropTypes.object),
};

Login.defaultProps = {
  loginStatus: PropTypes.string,
  setLoginStatus: PropTypes.objectOf(PropTypes.object),
};

export default Login;
