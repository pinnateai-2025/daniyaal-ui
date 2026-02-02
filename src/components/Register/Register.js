import { useState } from "react";
import { FiEye, FiEyeOff, FiX } from "react-icons/fi";
import "./Register.css";

const Register = ({ onClose }) => {
  const [tab, setTab] = useState("login");
  const [showPass, setShowPass] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    alert("Login clicked (connect backend later)");
  };

  const handleSignup = (e) => {
    e.preventDefault();
    alert("Create Account clicked (connect backend later)");
  };

  const handleForgotPassword = () => {
    alert("Forgot password flow will be added");
  };

  return (
    <div className="register-container" onClick={(e) => e.stopPropagation()}>
      <div className="register-box">

        {/* Close */}
        <button className="close-btn" onClick={onClose}>
          <FiX />
        </button>

        <h2 className="register-title">Welcome to Daniyaal Perfumery</h2>

        {/* Tabs */}
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

        {/* LOGIN */}
        {tab === "login" && (
          <form className="auth-form" onSubmit={handleLogin}>
            <label>Email</label>
            <input type="email" required placeholder="Enter your email" />

            <label>Password</label>
            <div className="password-field">
              <input
                type={showPass ? "text" : "password"}
                required
                placeholder="Enter your password"
              />
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

        {/* SIGN UP */}
        {tab === "signup" && (
          <form className="auth-form" onSubmit={handleSignup}>
            <label>Full Name</label>
            <input type="text" required placeholder="Enter your full name" />

            <label>Email</label>
            <input type="email" required placeholder="Enter your email" />

            <label>Password</label>
            <div className="password-field">
              <input
                type={showPass ? "text" : "password"}
                required
                placeholder="Create a password"
              />
              <span onClick={() => setShowPass(!showPass)}>
                {showPass ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            <label>Confirm Password</label>
            <input type="password" required placeholder="Confirm your password" />

            <button type="submit" className="auth-btn">
              Create Account
            </button>

            <p className="policy-text">
              By signing up, you agree to our{" "}
              <span>Terms of Service</span> and <span>Privacy Policy</span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
