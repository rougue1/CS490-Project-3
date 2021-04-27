import React from "react";
import PropTypes from "prop-types";
import { GoogleLogin } from "react-google-login";
import { useHistory } from "react-router-dom";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export function GLogin({ setLoginStatus }) {
  const history = useHistory();
  const onSuccess = async (googleUser) => {
    const userInfo = {
      GoogleId: googleUser.profileObj.googleId,
      FirstName: googleUser.profileObj.givenName,
      LastName: googleUser.profileObj.familyName,
      FullName: googleUser.profileObj.name,
      Email: googleUser.profileObj.email,
    };

    const res = await fetch("/login", {
      method: "POST",
      body: JSON.stringify({
        userInfo,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (data === 200) {
      setLoginStatus(true);
      history.push("/home");
    }
  };
  return (
    <div className="loginBox">
      <h1>Welcome to expense tracker</h1>
      <h5>Please login to continue</h5>
      <br />
      <br />
      <GoogleLogin 
        clientId={clientId} 
        render={renderProps => (
          <button type="button" className="googleLoginButton" onClick={renderProps.onClick} disabled={renderProps.disabled}>Login with Google</button>
        )}
        buttonText="Login with Google" 
        onSuccess={onSuccess} 
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
