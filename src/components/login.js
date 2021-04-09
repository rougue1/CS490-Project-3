import React from 'react';

import { GoogleLogin } from 'react-google-login';

const clientId = '1011493052864-t6p5q2p2mcfaif046nhcaa7qf8ap2hab.apps.googleusercontent.com';

export function Login() {
  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    alert(
      `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`,
    );
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      'Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz',
    );
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy="single_host_origin"
        style={{ marginTop: '100px' }}
        isSignedIn
      />
    </div>
  );
}

export default Login;
