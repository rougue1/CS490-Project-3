import React from 'react';
import PropTypes from 'prop-types';
import { GoogleLogout } from 'react-google-login';

const clientId = '1011493052864-t6p5q2p2mcfaif046nhcaa7qf8ap2hab.apps.googleusercontent.com';

export function GLogout({ setLoginStatus }) {
  const onSuccess = () => {
    console.log('Logout made successfully');
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
