import React, { useState } from "react";
import LoginModal from "../pages/Login";
import SignupModal from "../pages/Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import "../App.css";

function Navbar({ onLoginClick, onSignupClick }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
      <div className="container">
        <Link to="/" className="navbar-brand me-4">
          <img src="/images/logo.jpg" alt="Mubsir Logo" height="45" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                to="/"
                state={{ scrollTo: "about" }}
                className="nav-link px-3"
              >
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/schedule">
                Schedule
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-3" to="/map">
                Map
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/"
                state={{ scrollTo: "contact" }}
                className="nav-link px-3"
              >
                Contact Us
              </Link>
            </li>
          </ul>

          <div className="ms-auto">
            {isLoggedIn ? (
              <Dropdown>
                <Dropdown.Toggle
                  variant="light"
                  id="dropdown-basic"
                  className="custom-dropdown-toggle"
                >
                  My Account
                </Dropdown.Toggle>
                <Dropdown.Menu className="custom-dropdown-menu">
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <button
                  className="btn custom-signin me-2"
                  onClick={onLoginClick}
                >
                  Sign in
                </button>
                <button className="btn custom-join" onClick={onSignupClick}>
                  Join us
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;