import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import QuestionsPage from "./components/QuestionsPage";
import LoginPopup from "./components/LoginPopup";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
    setIsAuthChecked(true);
  }, []);

  if (!isAuthChecked) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} openLogin={() => setShowLoginPopup(true)} />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/questions" element={isLoggedIn ? <QuestionsPage setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />} />
      </Routes>

      {showLoginPopup && (
        <LoginPopup onClose={() => setShowLoginPopup(false)} setIsLoggedIn={setIsLoggedIn} />
      )}
    </Router>
  );
};

export default App;
