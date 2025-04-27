import { useState } from "react";
import {
  X,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

function AuthModal({ isOpen, onClose, theme, color }) {
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const primaryColor = color === "purple" ? "#a855f7" : "#f97316";

  // Form states
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm({ ...registerForm, [name]: value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login form submitted:", loginForm);
    // Add your login logic here
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log("Register form submitted:", registerForm);
    // Add your registration logic here
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={`auth-modal-overlay ${theme}`} onClick={onClose}></div>
      <div className={`auth-modal ${theme}`}>
        <div className="auth-modal-header">
          <div className="auth-tabs">
            <button
              className={`auth-tab ${activeTab === "login" ? "active" : ""}`}
              onClick={() => setActiveTab("login")}
              style={
                activeTab === "login"
                  ? { borderColor: primaryColor, color: primaryColor }
                  : {}
              }
            >
              Login
            </button>
            <button
              className={`auth-tab ${activeTab === "register" ? "active" : ""}`}
              onClick={() => setActiveTab("register")}
              style={
                activeTab === "register"
                  ? { borderColor: primaryColor, color: primaryColor }
                  : {}
              }
            >
              Register
            </button>
          </div>
          <button className="close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="auth-modal-content">
          {activeTab === "login" ? (
            <>
              <div className="auth-welcome">
                <h2 className="auth-title">Welcome back!</h2>
                <p className="auth-subtitle">
                  Log in to access your learning journey
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="auth-form">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <div className="input-wrapper">
                    <Mail size={18} className="input-icon" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-input"
                      placeholder="your@email.com"
                      value={loginForm.email}
                      onChange={handleLoginChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="password-label-group">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <a
                      href="#forgot-password"
                      className="forgot-password"
                      style={{ color: primaryColor }}
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="input-wrapper">
                    <Lock size={18} className="input-icon" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      className="form-input"
                      placeholder="Enter your password"
                      value={loginForm.password}
                      onChange={handleLoginChange}
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="auth-button"
                  style={{ backgroundColor: primaryColor }}
                >
                  Login <ArrowRight size={18} />
                </button>
              </form>

              <div className="social-login">
                <div className="divider">
                  <span>Or continue with</span>
                </div>
                <div className="social-buttons">
                  <button className="social-button google">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.3v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.08z" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google
                  </button>
                  <button className="social-button github">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                    GitHub
                  </button>
                </div>
              </div>

              <p className="auth-switch">
                New to CodeBlaze?{" "}
                <button
                  className="switch-button"
                  onClick={() => setActiveTab("register")}
                  style={{ color: primaryColor }}
                >
                  Create an account
                </button>
              </p>
            </>
          ) : (
            <>
              <div className="auth-welcome">
                <h2 className="auth-title">Join CodeBlaze</h2>
                <p className="auth-subtitle">
                  Start your learning journey today
                </p>
              </div>

              <form onSubmit={handleRegisterSubmit} className="auth-form">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <div className="input-wrapper">
                    <User size={18} className="input-icon" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-input"
                      placeholder="John Doe"
                      value={registerForm.name}
                      onChange={handleRegisterChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="reg-email" className="form-label">
                    Email
                  </label>
                  <div className="input-wrapper">
                    <Mail size={18} className="input-icon" />
                    <input
                      type="email"
                      id="reg-email"
                      name="email"
                      className="form-input"
                      placeholder="your@email.com"
                      value={registerForm.email}
                      onChange={handleRegisterChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="reg-password" className="form-label">
                    Password
                  </label>
                  <div className="input-wrapper">
                    <Lock size={18} className="input-icon" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="reg-password"
                      name="password"
                      className="form-input"
                      placeholder="Create a password"
                      value={registerForm.password}
                      onChange={handleRegisterChange}
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="confirm-password" className="form-label">
                    Confirm Password
                  </label>
                  <div className="input-wrapper">
                    <Lock size={18} className="input-icon" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirm-password"
                      name="confirmPassword"
                      className="form-input"
                      placeholder="Confirm your password"
                      value={registerForm.confirmPassword}
                      onChange={handleRegisterChange}
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="terms-checkbox">
                  <input type="checkbox" id="terms" name="terms" required />
                  <label htmlFor="terms">
                    I agree to the{" "}
                    <a href="#terms" target="" style={{ color: primaryColor }}>
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#privacy" style={{ color: primaryColor }}>
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <button
                  type="submit"
                  className="auth-button"
                  style={{ backgroundColor: primaryColor }}
                >
                  Create Account <ArrowRight size={18} />
                </button>
              </form>

              <div className="social-login">
                <div className="divider">
                  <span>Or register with</span>
                </div>
                <div className="social-buttons">
                  <button className="social-button google">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.3v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.08z" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google
                  </button>
                  <button className="social-button github">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                    GitHub
                  </button>
                </div>
              </div>

              <p className="auth-switch">
                Already have an account?{" "}
                <button
                  className="switch-button"
                  onClick={() => setActiveTab("login")}
                  style={{ color: primaryColor }}
                >
                  Log in
                </button>
              </p>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .auth-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .auth-modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          max-width: 480px;
          max-height: 90vh;
          overflow-y: auto;
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
          z-index: 101;
          animation: modalFadeIn 0.3s ease;
        }

        .auth-modal.dark {
          background-color: #161616;
          color: #e0e0e0;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: translate(-50%, -48%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }

        .auth-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #eee;
        }

        .dark .auth-modal-header {
          border-bottom: 1px solid #333;
        }

        .auth-tabs {
          display: flex;
          gap: 15px;
        }

        .auth-tab {
          padding: 0.5rem 1rem;
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          font-size: 1rem;
          font-weight: 600;
          color: #666;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .dark .auth-tab {
          color: #aaa;
        }

        .auth-tab.active {
          border-bottom: 2px solid;
        }

        .close-button {
          background: none;
          border: none;
          cursor: pointer;
          color: #666;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 5px;
          border-radius: 50%;
          transition: background-color 0.2s ease;
        }

        .dark .close-button {
          color: #aaa;
        }

        .close-button:hover {
          background-color: #f0f0f0;
        }

        .dark .close-button:hover {
          background-color: #333;
        }

        .auth-modal-content {
          padding: 30px;
        }

        .auth-welcome {
          text-align: center;
          margin-bottom: 25px;
        }

        .auth-title {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .auth-subtitle {
          color: #666;
          font-size: 1rem;
        }

        .dark .auth-subtitle {
          color: #aaa;
        }

        .auth-form {
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          font-size: 0.95rem;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 12px;
          color: #666;
        }

        .dark .input-icon {
          color: #aaa;
        }

        .form-input {
          width: 100%;
          padding: 12px 40px 12px 40px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.2s ease;
        }

        .dark .form-input {
          background-color: #222;
          color: #e0e0e0;
          border-color: #444;
        }

        .form-input:focus {
          outline: none;
          border-color: ${primaryColor};
        }

        .password-toggle {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          cursor: pointer;
          color: #666;
        }

        .dark .password-toggle {
          color: #aaa;
        }

        .password-label-group {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .forgot-password {
          font-size: 0.85rem;
          text-decoration: none;
        }

        .auth-button {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 8px;
          color: white;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: opacity 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .auth-button:hover {
          opacity: 0.9;
        }

        .social-login {
          margin-top: 25px;
        }

        .divider {
          display: flex;
          align-items: center;
          text-align: center;
          margin-bottom: 20px;
          color: #666;
        }

        .dark .divider {
          color: #aaa;
        }

        .divider::before,
        .divider::after {
          content: "";
          flex: 1;
          border-bottom: 1px solid #ddd;
        }

        .dark .divider::before,
        .dark .divider::after {
          border-color: #444;
        }

        .divider span {
          padding: 0 10px;
          font-size: 0.9rem;
        }

        .social-buttons {
          display: flex;
          gap: 15px;
        }

        .social-button {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background-color: transparent;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .dark .social-button {
          border-color: #444;
          color: #e0e0e0;
        }

        .social-button:hover {
          background-color: #f8f8f8;
        }

        .dark .social-button:hover {
          background-color: #2a2a2a;
        }

        .auth-switch {
          text-align: center;
          margin-top: 25px;
          font-size: 0.95rem;
          color: #666;
        }

        .dark .auth-switch {
          color: #aaa;
        }

        .switch-button {
          background: none;
          border: none;
          font-weight: 600;
          cursor: pointer;
          padding: 0;
        }

        .terms-checkbox {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 20px;
          font-size: 0.9rem;
          color: #666;
        }

        .dark .terms-checkbox {
          color: #aaa;
        }

        .terms-checkbox input {
          margin-top: 3px;
        }

        .terms-checkbox a {
          text-decoration: none;
        }

        @media (max-width: 520px) {
          .auth-modal {
            width: 90%;
          }

          .auth-modal-content {
            padding: 20px;
          }

          .social-buttons {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
}

export default AuthModal;
