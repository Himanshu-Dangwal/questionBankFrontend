import React, { useState, useRef, useEffect } from "react";
import { login } from "../services/api";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";

const SITE_KEY = import.meta.env.VITE_SITE_KEY;
const LoginPopup = ({ onClose, setIsLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [captchaValue, setCaptchaValue] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleLogin = async () => {
        setLoading(true);
        setError("");

        if (!captchaValue) {
            setError("Please complete the CAPTCHA.");
            setLoading(false);
            return;
        }

        try {
            const data = await login(username, password, captchaValue);
            localStorage.setItem("token", data.token);
            setIsLoggedIn(true);
            onClose();
            navigate("/questions");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-lg">
                <h2 className="fw-bold text-center text-secondary">Login</h2>
                {error && <p className="text-danger">{error}</p>}

                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Username"
                    className="form-control my-2"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={loading}
                />

                <div className="input-group my-2">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                    />
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={loading}
                    >
                        <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                    </button>
                </div>

                <ReCAPTCHA
                    sitekey={SITE_KEY}
                    onChange={(value) => setCaptchaValue(value)}
                />

                <button
                    onClick={handleLogin}
                    className="btn btn-primary w-100 mt-2"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2"></span> Logging in...
                        </>
                    ) : (
                        "Login"
                    )}
                </button>

                <button
                    onClick={onClose}
                    className="btn btn-link text-danger mt-2 w-100"
                    disabled={loading}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default LoginPopup;
