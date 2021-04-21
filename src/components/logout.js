import React from "react";
import PropTypes from "prop-types";
import { GoogleLogout } from "react-google-login";
import { useHistory } from "react-router-dom";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export function GLogout({ setLoginStatus }) {
  const history = useHistory();
  
  const onSuccess = () => {
    setLoginStatus(false);
    history.push("/login");
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
