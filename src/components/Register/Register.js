import { useState } from "react";
import { FiEye, FiEyeOff, FiX } from "react-icons/fi";
import "./Register.css";

const Register = ({ onClose }) => {
  const [tab, setTab] = useState("login");
  const [showPass, setShowPass] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    alert("Login clicked ✅");
  };

  const handleSignup = (e) => {
    e.preventDefault();
    alert("Create Account clicked ✅");
  };

  const handleForgotPassword = () => {
    alert("Forgot password clicked ✅");
  };

  return (
    <div className="register-container" onClick={onClose}>
      <div
        className="register-box"
        onClick={(e) => e.stopPropagation()}   // ✅ CRITICAL
      >
        <button className="close-btn" onClick={onClose}>
          <FiX />
        </button>

        <h2 className="register-title">Welcome to Daniyaal Perfumery</h2>

        <div className="auth-tabs">
          <button
            type="button"
            className={tab === "login" ? "active" : ""}
            onClick={() => setTab("login")}
          >
            Login
          </button>
          <button
            type="button"
            className={tab === "signup" ? "active" : ""}
            onClick={() => setTab("signup")}
          >
            Sign Up
          </button>
        </div>

        {tab === "login" && (
          <form className="auth-form" onSubmit={handleLogin}>
            <label>Email</label>
            <input type="email" required />

            <label>Password</label>
            <div className="password-field">
              <input type={showPass ? "text" : "password"} required />
              <span onClick={() => setShowPass(!showPass)}>
                {showPass ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            <button type="submit" className="auth-btn">
              Login
            </button>

            <p className="forgot-text" onClick={handleForgotPassword}>
              Forgot your password?
            </p>
          </form>
        )}

        {tab === "signup" && (
          <form className="auth-form" onSubmit={handleSignup}>
            <label>Full Name</label>
            <input type="text" required />

            <label>Email</label>
            <input type="email" required />

            <label>Password</label>
            <div className="password-field">
              <input type={showPass ? "text" : "password"} required />
              <span onClick={() => setShowPass(!showPass)}>
                {showPass ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            <label>Confirm Password</label>
            <input type="password" required />

            <button type="submit" className="auth-btn">
              Create Account
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
