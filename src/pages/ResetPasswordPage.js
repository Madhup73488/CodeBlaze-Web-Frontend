import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from '../components/Auth/AuthModal';

// This page component is intended to be routed at "/reset-password"
// It ensures the AuthModal is displayed and correctly handles the reset token from the URL.

function ResetPasswordPage() {
  const { authFlowState, setAuthFlowState, setResetPasswordToken } = useAuth();
  const [isModalProgrammaticallyOpen, setIsModalProgrammaticallyOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromQuery = queryParams.get('token');

    if (tokenFromQuery) {
      setResetPasswordToken(tokenFromQuery); // Set token in context
      setAuthFlowState('reset_password_form'); // Set flow state in context
      setIsModalProgrammaticallyOpen(true); // Signal this page to show the modal
    } else {
      // If no token, maybe redirect or show an error, or let AuthModal handle 'initial' state.
      // For now, if AuthModal is shown, it will default to login or based on authFlowState.
      // If direct access to /reset-password without token should show an error page,
      // that logic would go here or in the router.
      // Setting to initial if no token, so modal shows login.
      // setAuthFlowState('initial'); // This might conflict if modal is already open for other reasons.
      // Better to let AuthModal decide what to show if no token.
      // If we want to force login modal if no token:
      // setIsModalProgrammaticallyOpen(true);
      // setAuthFlowState('initial');
    }
  }, [location.search, setAuthFlowState, setResetPasswordToken]);

  const handleCloseModal = () => {
    setIsModalProgrammaticallyOpen(false);
    // Navigate to home or login page after modal is closed by user
    // This depends on desired UX. For now, just closing.
    // navigate('/'); // Example
    if (authFlowState === 'reset_password_form' || authFlowState === 'otp_sent') {
      // If closing during these flows, reset them if not completed.
      // AuthContext's URL listener will reset if path changes.
      // If user closes modal on /reset-password page, they might expect to stay.
      // For simplicity, let AuthModal's internal back/close logic handle flow state.
    }
  };
  
  // The AuthModal itself has logic to appear if authFlowState is 'reset_password_form'
  // or 'otp_sent', even if its 'isOpen' prop is false.
  // However, by rendering it here and controlling an 'isOpen' state,
  // we make its appearance on this dedicated route more explicit.
  // The `isOpen` prop of AuthModal is what its internal `useEffect` for cleanup relies on.

  // If authFlowState is reset_password_form, we want the modal open.
  // The AuthModal's internal logic should already handle showing the correct form.
  // The key is that AuthModal must be in the DOM for its context consumption to work.
  
  // This page ensures AuthModal is rendered and its isOpen state is managed
  // for the /reset-password route.
  if (authFlowState === 'reset_password_form' && !isModalProgrammaticallyOpen) {
    // This effect ensures that if context sets the flow state, modal opens.
    // This might be redundant if the modal is always globally available and reacts to context.
    // But for a dedicated page, this is clearer.
    setIsModalProgrammaticallyOpen(true);
  }


  return (
    <AuthModal
      isOpen={isModalProgrammaticallyOpen}
      onClose={handleCloseModal}
      // Assuming default theme/color, or pass them if available from a higher context/config
      theme="light" 
      color="purple"
    />
  );
}

export default ResetPasswordPage;
