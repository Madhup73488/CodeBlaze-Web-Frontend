import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function OAuthCallbackPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { loginWithTokens, isAuthenticated, error: authError } = useAuth();
  const [isProcessing, setIsProcessing] = useState(true);
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const accessToken = queryParams.get('token');
    const refreshToken = queryParams.get('refreshToken');

    if (accessToken) {
      const processTokens = async () => {
        try {
          // loginWithTokens will set isAuthenticated in context
          await loginWithTokens(accessToken, refreshToken);
          // The navigation will be handled by the other useEffect based on isAuthenticated
        } catch (err) {
          // This catch is for errors thrown by loginWithTokens itself,
          // though loginWithTokens also sets its own error state in context.
          console.error("OAuthCallbackPage: Error during loginWithTokens", err);
          setLocalError(err.message || "Failed to process OAuth tokens.");
        } finally {
          setIsProcessing(false);
        }
      };
      processTokens();
    } else {
      console.error('OAuth Callback: Access token not found in URL.');
      setLocalError('Access token not found in URL.');
      setIsProcessing(false);
    }
  }, [location.search, loginWithTokens]); // Only run once on mount or if location.search changes

  useEffect(() => {
    // This effect runs when isAuthenticated, authError, or isProcessing changes.
    if (!isProcessing) { // Only navigate after processing is done
      if (isAuthenticated) {
        console.log("OAuthCallbackPage: Authenticated, navigating to /");
        navigate('/', { replace: true });
      } else {
        // If not authenticated after processing, it means loginWithTokens failed.
        // authError from context might have more details.
        const errorMessage = localError || authError || 'OAuth authentication failed.';
        console.error("OAuthCallbackPage: Not authenticated after processing, navigating to login.", errorMessage);
        navigate(`/login?error=oauth_failed&message=${encodeURIComponent(errorMessage)}`, { replace: true });
      }
    }
  }, [isAuthenticated, isProcessing, localError, authError, navigate]);

  if (isProcessing) {
    return (
      <div>
        <p>Processing authentication...</p>
        {/* Spinner or loader can go here */}
      </div>
    );
  }

  // This part should ideally not be reached if navigation works.
  // If there was an error and navigation didn't happen, it might show.
  return (
    <div>
      <p>Finished processing. If you see this, navigation might have failed.</p>
      {localError && <p>Error: {localError}</p>}
      {authError && !localError && <p>Auth Context Error: {authError}</p>}
    </div>
  );
}

export default OAuthCallbackPage;
