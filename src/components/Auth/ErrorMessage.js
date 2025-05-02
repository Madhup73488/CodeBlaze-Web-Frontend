// ErrorMessage.js
import React from "react";
import { AlertCircle, CheckCircle } from "lucide-react";

function ErrorMessage({ error }) {
  if (!error) return null;

  const messageType = typeof error === 'object' && error !== null && error.type === 'success' ? 'success' : 'error';
  const messageText = typeof error === 'object' && error !== null && error.message ? error.message : error;

  return (
    <p className={`${messageType === "success" ? "success-message" : "error-message"}`}>
      {messageType === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
      {messageText}
    </p>
  );
}

export default ErrorMessage;