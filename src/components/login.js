import React from 'react';
import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';

// refresh token
// import { refreshTokenSetup } from '../utils/refreshToken';

const clientId = '1011493052864-t6p5q2p2mcfaif046nhcaa7qf8ap2hab.apps.googleusercontent.com';

export function GLogin({ setLoginStatus }) {
  const onSuccess = (googleUser) => {
    const idToken = googleUser.getAuthResponse().id_token;
    console.log({ idToken });
    setLoginStatus(true);
  };

  return (
    <GoogleLogin clientId={clientId} onSuccess={onSuccess} />
  );
}

GLogin.propTypes = {
  setLoginStatus: PropTypes.bool,
};

GLogin.defaultProps = {
  setLoginStatus: PropTypes.bool,
};

export default GLogin;
