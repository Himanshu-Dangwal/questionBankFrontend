// import React, { useState } from "react";
// import { login } from "../services/api";
// import { useNavigate } from 'react-router-dom';

// const LoginPopup = ({ onClose, setIsLoggedIn }) => {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     const handleLogin = async () => {
//         try {
//             const data = await login(username, password);
//             localStorage.setItem("token", data.token);
//             setIsLoggedIn(true);
//             onClose();
//             navigate("/questions")
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     return (
//         <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50">
//             <div className="bg-white p-4 rounded shadow-lg">
//                 <h2 className="fw-bold">Login</h2>
//                 {error && <p className="text-danger">{error}</p>}
//                 <input type="text" placeholder="Username" className="form-control my-2"
//                     value={username} onChange={(e) => setUsername(e.target.value)} />
//                 <input type="password" placeholder="Password" className="form-control my-2"
//                     value={password} onChange={(e) => setPassword(e.target.value)} />
//                 <button onClick={handleLogin} className="btn btn-primary w-100">Login</button>
//                 <button onClick={onClose} className="btn btn-link text-danger mt-2 w-100">Cancel</button>
//             </div>
//         </div>
//     );
// };

// export default LoginPopup;


import React, { useState } from "react";
import { login } from "../services/api";
import { useNavigate } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";


const LoginPopup = ({ onClose, setIsLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const data = await login(username, password);
            localStorage.removeItem("token");
            localStorage.setItem("token", data.token);
            setIsLoggedIn(true);
            onClose();
            navigate("/questions");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-lg">
                <h2 className="fw-bold">Login</h2>
                {error && <p className="text-danger">{error}</p>}

                <input
                    type="text"
                    placeholder="Username"
                    className="form-control my-2"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <div className="input-group my-2">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                    </button>
                </div>

                <button onClick={handleLogin} className="btn btn-primary w-100">Login</button>
                <button onClick={onClose} className="btn btn-link text-danger mt-2 w-100">Cancel</button>
            </div>
        </div>
    );
};

export default LoginPopup;
