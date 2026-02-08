import { useState } from "react";
import { FiEye, FiEyeOff, FiX } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import "./Register.css";

const Register = ({ onClose }) => {
    const [tab, setTab] = useState("login");
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Form states
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });
    const [resetEmail, setResetEmail] = useState("");

    const { login, register, resetPassword } = useAuth();

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleSignupChange = (e) => {
        setSignupData({ ...signupData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const result = await login(loginData.email, loginData.password);
        if (result.success) {
            onClose();
        } else {
            setError(result.message);
        }
        setLoading(false);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (signupData.password !== signupData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        setError("");

        const result = await register({
            name: signupData.name,
            email: signupData.email,
            phone: signupData.phone,
            password: signupData.password
        });

        if (result.success) {
            setSuccess(result.message);
            // Close modal after a short delay so they see the success message
            setTimeout(() => {
                onClose();
            }, 1500);
        } else {
            setError(result.message);
        }
        setLoading(false);
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const result = await resetPassword(resetEmail);
        if (result.success) {
            setSuccess(result.message);
        } else {
            setError(result.message);
        }
        setLoading(false);
    };

    return (
        <div className="register-container" onClick={onClose}>
            <div className="register-box" onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button className="close-btn" onClick={onClose}>
                    <FiX />
                </button>

                <h2 className="register-title">Welcome to Daniyaal Perfumery</h2>

                {/* Tabs */}
                {tab !== "forgot" && (
                    <div className="auth-tabs">
                        <button
                            type="button"
                            className={tab === "login" ? "active" : ""}
                            onClick={() => { setTab("login"); setError(""); setSuccess(""); }}
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            className={tab === "signup" ? "active" : ""}
                            onClick={() => { setTab("signup"); setError(""); setSuccess(""); }}
                        >
                            Sign Up
                        </button>
                    </div>
                )}

                {error && <div className="auth-error">{error}</div>}
                {success && <div className="auth-success">{success}</div>}

                {/* LOGIN FORM */}
                {tab === "login" && (
                    <form className="auth-form" onSubmit={handleLogin}>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                            value={loginData.email}
                            onChange={handleLoginChange}
                        />

                        <label>Password</label>
                        <div className="password-field">
                            <input
                                type={showPass ? "text" : "password"}
                                name="password"
                                placeholder="Enter your password"
                                required
                                value={loginData.password}
                                onChange={handleLoginChange}
                            />
                            <span onClick={() => setShowPass(!showPass)}>
                                {showPass ? <FiEyeOff /> : <FiEye />}
                            </span>
                        </div>

                        <button className="auth-btn" type="submit" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </button>

                        <p className="forgot-text" onClick={() => { setTab("forgot"); setError(""); setSuccess(""); }}>
                            Forgot your password?
                        </p>
                    </form>
                )}

                {/* SIGN UP FORM */}
                {tab === "signup" && (
                    <form className="auth-form" onSubmit={handleSignup}>
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            required
                            value={signupData.name}
                            onChange={handleSignupChange}
                        />

                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                            value={signupData.email}
                            onChange={handleSignupChange}
                        />

                        <label>Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="Enter your phone number"
                            required
                            value={signupData.phone}
                            onChange={handleSignupChange}
                        />

                        <label>Password</label>
                        <div className="password-field">
                            <input
                                type={showPass ? "text" : "password"}
                                name="password"
                                placeholder="Create a password"
                                required
                                value={signupData.password}
                                onChange={handleSignupChange}
                            />
                            <span onClick={() => setShowPass(!showPass)}>
                                {showPass ? <FiEyeOff /> : <FiEye />}
                            </span>
                        </div>

                        <label>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            required
                            value={signupData.confirmPassword}
                            onChange={handleSignupChange}
                        />

                        <button className="auth-btn" type="submit" disabled={loading}>
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>

                        <p className="policy-text">
                            By signing up, you agree to our{" "}
                            <span>Terms of Service</span> and <span>Privacy Policy</span>
                        </p>
                    </form>
                )}

                {/* FORGOT PASSWORD FORM */}
                {tab === "forgot" && (
                    <form className="auth-form" onSubmit={handleResetPassword}>
                        <h3 className="tab-title">Reset Password</h3>
                        <p className="forgot-desc">Enter your email address and we'll send you a link to reset your password.</p>

                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            required
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                        />

                        <button className="auth-btn" type="submit" disabled={loading}>
                            {loading ? "Sending..." : "Send Reset Link"}
                        </button>

                        <p className="forgot-text" onClick={() => { setTab("login"); setError(""); setSuccess(""); }}>
                            Back to Login
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Register;
