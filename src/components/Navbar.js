import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "../pages/firebase";
import { AuthContext } from "../AuthContext"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";
import "../App.css";

function Navbar({ onLoginClick, onSignupClick }) {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout Error:", error);
      });
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
              <Link to="/" className="nav-link px-3">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/schedule" className="nav-link px-3">Schedule</Link>
            </li>
            <li className="nav-item">
              <Link to="/map" className="nav-link px-3">Map</Link>
            </li>
            <li className="nav-item">
              <Link to="/" state={{ scrollTo: "contact" }} className="nav-link px-3">
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
                <button className="btn custom-signin me-2" onClick={onLoginClick}>
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
