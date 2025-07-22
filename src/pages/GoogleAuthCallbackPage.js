import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function GoogleAuthCallbackPage() {
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const accessToken = queryParams.get('accessToken');
    const refreshToken = queryParams.get('refreshToken');

    if (accessToken) {
      const message = {
        type: 'google-auth-success',
        accessToken,
        refreshToken,
      };
      window.opener.postMessage(message, process.env.REACT_APP_FRONTEND_URL);
      window.close();
    } else {
      const error = queryParams.get('error') || 'google_auth_failed';
      const errorMessage = {
        type: 'google-auth-error',
        error,
      };
      window.opener.postMessage(errorMessage, process.env.REACT_APP_FRONTEND_URL);
      window.close();
    }
  }, [location]);

  return (
    <div>
      <p>Processing Google authentication...</p>
    </div>
  );
}

export default GoogleAuthCallbackPage;
