// eslint-disable
import React from 'react';
import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';

// refresh token
// import { refreshTokenSetup } from '../utils/refreshToken';

const clientId = '538730922823-2fe42abari68eb7qf7fgt6rmbk4r04hi.apps.googleusercontent.com';

export function GLogin({ setLoginStatus }) {
  const onSuccess = (googleUser) => {
    const idToken = googleUser.getAuthResponse().id_token;
    console.log({ idToken });
    console.log(googleUser.profileObj);
    const userInfo = { Name: googleUser.profileObj.name, Email: googleUser.profileObj.email };
    console.log({ userInfo });
    setLoginStatus(true);
  };
  // eslint-disable-next-line
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
