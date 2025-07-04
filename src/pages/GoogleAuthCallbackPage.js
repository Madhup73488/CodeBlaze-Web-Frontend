import React, { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Assuming useAuth provides a way to set tokens and user
import Cookies from 'js-cookie'; // To store tokens

function GoogleAuthCallbackPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { loginWithTokens } = useAuth(); // We'll add loginWithTokens to AuthContext

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const accessToken = queryParams.get('accessToken');
    const refreshToken = queryParams.get('refreshToken');
    // Fallback if backend sends a single 'token' (adjust as per actual backend response)
    const singleToken = queryParams.get('token'); 

    let finalAccessToken = accessToken;
    let finalRefreshToken = refreshToken;

    if (singleToken && !accessToken) {
      // If only a single token is provided, assume it's the access token.
      // Refresh token handling would need to be clarified if not explicitly sent.
      finalAccessToken = singleToken;
      // Potentially, the backend might send user data directly too.
    }
    
    if (finalAccessToken) {
      // Call a function in AuthContext to handle these tokens
      // This function should store tokens and fetch user details if necessary
      loginWithTokens(finalAccessToken, finalRefreshToken);
      navigate('/'); // Redirect to home or dashboard after successful login
    } else {
      // Handle error or missing tokens
      console.error('Google Auth Callback: Tokens not found in URL.');
      navigate('/login?error=google_auth_failed'); // Redirect to login with an error
    }
  }, [location, navigate, loginWithTokens]);

  return (
    <div>
      <p>Processing Google authentication...</p>
      {/* You can add a loader/spinner here */}
    </div>
  );
}

export default GoogleAuthCallbackPage;
