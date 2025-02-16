import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isLoggedIn, setIsLoggedIn, openLogin }) => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
            <Link className="navbar-brand fw-bold custom-link" to="/">Gulf Medical Experts</Link>
            <div className="ms-auto">
                {isLoggedIn ? (
                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                ) : (
                    <button className="btn btn-primary" onClick={openLogin}>Login</button>
                )}
            </div>

            <style>
                {`
                    .custom-link {
                        color: #1f0f0e;
                        text-decoration: none;
                        transition: color 0.3s ease-in-out;
                    }
                    .custom-link:hover {
                        color: #fc8c05;
                    }
                `}
            </style>
        </nav>
    );
};

export default Navbar;
