// eslint-disable
import React from 'react';
import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export function GLogin({ setLoginStatus }) {
  const onSuccess = async (googleUser) => {
    const userInfo = {
      GoogleId: googleUser.profileObj.googleId,
      FirstName: googleUser.profileObj.givenName,
      LastName: googleUser.profileObj.familyName,
      FullName: googleUser.profileObj.name,
      Email: googleUser.profileObj.email,
    };

    const res = await fetch('/login', {
      method: 'POST',
      body: JSON.stringify({
        userInfo,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();

    if (data === 200) {
      setLoginStatus(true);
    }
  };
  // eslint-disable-next-line
  const onFailure = (googleUser) => {
    console.log('Failed to login');
  };

  return (
    <div className="loginBox">
      <h1>Welcome to expense tracker</h1>
      <h5>Please login to continue</h5>
      <br />
      <br />
      <GoogleLogin
        clientId={clientId}
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  );
}

GLogin.propTypes = {
  setLoginStatus: PropTypes.func,
};

GLogin.defaultProps = {
  setLoginStatus: PropTypes.func,
};

export default GLogin;
