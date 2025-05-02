// OtpForm.js
import React from "react";
import { CheckCircle, RotateCcw, AlertCircle } from "lucide-react";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

function OtpForm({
  userEmailForOTP,
  otpInputs,
  handleOtpInputChange,
  handleOtpKeyDown,
  handleVerifyOTPSubmit,
  handleResendOTP,
  handleBackToLogin,
  primaryColor,
  error,
  isButtonLoading,
}) {
  return (
    <>
      <div className="auth-welcome">
        <h2 className="auth-title">Verify Your Email</h2>
        <p className="auth-subtitle">
          An OTP has been sent to <strong>{userEmailForOTP}</strong>. Please
          enter it below.
        </p>
        <ErrorMessage error={error} />
      </div>
      <form onSubmit={handleVerifyOTPSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="otp" className="form-label">
            OTP Code
          </label>
          <div className="otp-input-group">
            {otpInputs.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                maxLength={1}
                className="otp-input"
                value={digit}
                onChange={(e) => handleOtpInputChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                required
              />
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="auth-button"
          style={{ backgroundColor: primaryColor }}
          disabled={isButtonLoading}
        >
          {isButtonLoading ? (
            <Loader />
          ) : (
            <>
              Verify <CheckCircle size={18} />
            </>
          )}
        </button>
      </form>
      <div className="auth-switch">
        Didn't receive the OTP?{" "}
        <button
          className="switch-button"
          onClick={handleResendOTP}
          style={{ color: primaryColor }}
          disabled={isButtonLoading}
        >
          {isButtonLoading ? <Loader /> : "Resend OTP"} <RotateCcw size={16} />
        </button>
      </div>
      <div className="auth-switch">
        <button
          className="switch-button"
          onClick={handleBackToLogin}
          style={{ color: primaryColor }}
        >
          Back to Login
        </button>
      </div>
    </>
  );
}

export default OtpForm;
