// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import LandingPage from "./components/LandingPage";
// import QuestionsPage from "./components/QuestionsPage";
// import "bootstrap/dist/css/bootstrap.min.css";
// // import "bootstrap-icons/font/bootstrap-icons.css";

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) setIsLoggedIn(true);
//   }, []);

//   return (
//     <Router>
//       <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/questions" element={isLoggedIn ? <QuestionsPage /> : <Navigate to="/" />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import QuestionsPage from "./components/QuestionsPage";
import LoginPopup from "./components/LoginPopup"; // Ensure this component is used
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false); // New state for login popup

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Convert token presence to boolean
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} openLogin={() => setShowLoginPopup(true)} />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/questions" element={isLoggedIn ? <QuestionsPage /> : <Navigate to="/" />} />
      </Routes>

      {showLoginPopup && (
        <LoginPopup onClose={() => setShowLoginPopup(false)} setIsLoggedIn={setIsLoggedIn} />
      )}
    </Router>
  );
};

export default App;
