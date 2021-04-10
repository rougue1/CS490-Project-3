import React from 'react';
import PropTypes from 'prop-types';
import { GoogleLogout } from 'react-google-login';

const clientId = '707788443358-u05p46nssla3l8tmn58tpo9r5sommgks.apps.googleusercontent.com';

export function GLogout({ setLoginStatus }) {
  const onSuccess = () => {
    console.log('Logout made successfully');
    alert('Logout made successfully ✌');
    setLoginStatus(false);
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
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
