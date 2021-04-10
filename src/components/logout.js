import React from 'react';
import PropTypes from 'prop-types';
import { GoogleLogout } from 'react-google-login';

const clientId = '538730922823-2fe42abari68eb7qf7fgt6rmbk4r04hi.apps.googleusercontent.com';

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
