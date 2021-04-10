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
    console.log(data);

    if (data === 200) {
      setLoginStatus(true);
    }
  };

  const onFailure = (googleUser) => {
    console.log('Failed to login');
  };

  return (
    <GoogleLogin clientId={clientId} onSuccess={onSuccess} onFailure={onFailure} />
  );
}

GLogin.propTypes = {
  setLoginStatus: PropTypes.bool,
};

GLogin.defaultProps = {
  setLoginStatus: PropTypes.bool,
};

export default GLogin;
