// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import LoginPopup from "./LoginPopup";

// const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
//     const [showLogin, setShowLogin] = useState(false);
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         setIsLoggedIn(false);
//         navigate("/");
//     };

//     return (
//         <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
//             <a className="navbar-brand fw-bold" href="/">Dubai Question Bank</a>
//             <div className="ms-auto d-flex">
//                 <button className="btn btn-outline-light me-2" onClick={() => navigate("/")}>Contact Us</button>
//                 {isLoggedIn ? (
//                     <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
//                 ) : (
//                     <button className="btn btn-primary" onClick={() => setShowLogin(true)}>Login</button>
//                 )}
//             </div>
//             {showLogin && <LoginPopup onClose={() => setShowLogin(false)} setIsLoggedIn={setIsLoggedIn} />}
//         </nav>
//     );
// };

// export default Navbar;


import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isLoggedIn, setIsLoggedIn, openLogin }) => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
            <Link className="navbar-brand fw-bold" to="/">Dubai MCQs</Link>
            <div className="ms-auto">
                {isLoggedIn ? (
                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                ) : (
                    <button className="btn btn-primary" onClick={openLogin}>Login</button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
