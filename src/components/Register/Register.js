import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FiX } from "react-icons/fi"; // close icon
import "./Register.css";

const Register = ({ onClose }) => {
    const [tab, setTab] = useState("login");
    const [showPass, setShowPass] = useState(false);

    return (
        <div className="register-container" onClick={(e) => e.stopPropagation()}>
            <div className="register-box">

                {/* Close Button */}
                <button className="close-btn" onClick={onClose}>
                    <FiX />
                </button>

                <h2 className="register-title">Welcome to Daniyaal Perfumery</h2>

                {/* Tabs */}
                <div className="auth-tabs">
                    <button
                        className={tab === "login" ? "active" : ""}
                        onClick={() => setTab("login")}
                    >
                        Login
                    </button>
                    <button
                        className={tab === "signup" ? "active" : ""}
                        onClick={() => setTab("signup")}
                    >
                        Sign Up
                    </button>
                </div>

                {/* LOGIN FORM */}
                {tab === "login" && (
                    <div className="auth-form">
                        <label>Email</label>
                        <input type="email" placeholder="Enter your email" />

                        <label>Password</label>
                        <div className="password-field">
                            <input
                                type={showPass ? "text" : "password"}
                                placeholder="Enter your password"
                            />
                            <span onClick={() => setShowPass(!showPass)}>
                                {showPass ? <FiEyeOff /> : <FiEye />}
                            </span>
                        </div>

                        <button className="auth-btn">Login</button>

                        <p className="forgot-text">Forgot your password?</p>
                    </div>
                )}

                {/* SIGN UP FORM */}
                {tab === "signup" && (
                    <div className="auth-form">
                        <label>Full Name</label>
                        <input type="text" placeholder="Enter your full name" />

                        <label>Email</label>
                        <input type="email" placeholder="Enter your email" />

                        <label>Password</label>
                        <div className="password-field">
                            <input
                                type={showPass ? "text" : "password"}
                                placeholder="Create a password"
                            />
                            <span onClick={() => setShowPass(!showPass)}>
                                {showPass ? <FiEyeOff /> : <FiEye />}
                            </span>
                        </div>

                        <label>Confirm Password</label>
                        <input type="password" placeholder="Confirm your password" />

                        <button className="auth-btn">Create Account</button>

                        <p className="policy-text">
                            By signing up, you agree to our{" "}
                            <span>Terms of Service</span> and <span>Privacy Policy</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Register;
