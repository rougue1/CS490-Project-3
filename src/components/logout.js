import React from 'react';
import PropTypes from 'prop-types';
import { GoogleLogout } from 'react-google-login';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export function GLogout({ setLoginStatus }) {
  const onSuccess = () => {
    console.log('Logout made successfully');
    setLoginStatus(false);
  };

  return (
    <div>
      <GoogleLogout clientId={clientId} buttonText="Logout" onLogoutSuccess={onSuccess} />
    </div>
  );
}

GLogout.propTypes = {
  setLoginStatus: PropTypes.bool,
};

GLogout.defaultProps = {
  setLoginStatus: PropTypes.bool,
};

export default GLogout;
