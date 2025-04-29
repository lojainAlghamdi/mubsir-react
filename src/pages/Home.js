import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";
import LoginModal from "../pages/Login";
import SignupModal from "../pages/Signup";
import Services from './services';

function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const location = useLocation();

  const contactUsRef = useRef(null);
  const servicesRef = useRef(null);

  const handleScrollToContactUs = () => {
    if (contactUsRef.current) {
      contactUsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (location.state?.scrollTo === "about" && servicesRef.current) {
      servicesRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (location.state?.scrollTo === "contact" && contactUsRef.current) {
      contactUsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  const services = [
    {
      icon: "/images/schedule-icon.png",
      title: "Creating Your Schedule",
      description: "Create your personalized schedule and locate your classes with MUBSIR.",
    },
    {
      icon: "/images/map-icon.png",
      title: "Interactive 2D/3D Campus Navigation",
      description: "Provides an interactive map to help students locate classrooms and navigate FCIT campus.",
    },
    {
      icon: "/images/route-icon.png",
      title: "Classroom Route Assistance",
      description: "Directs students from the main entrance of each floor to their designated classrooms.",
    },
  ];

  return (
    <>
      {/* Navbar */}
      <Navbar
        onLoginClick={() => setShowLogin(true)}
        onSignupClick={() => setShowSignup(true)}
        onScrollToContactUs={handleScrollToContactUs}
      />

      {/* Blur effect wrapper if modals are open */}
      <div className={showLogin || showSignup ? "blur-background" : ""}>
        {/* Hero Section */}
        <header className="home" id="home">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <h1 className="hero-title">Mubsir Campus Navigation</h1>
                <p className="hero-text">
                  Find Your Way to Every Class, Every Time at FCIT Campus. Never miss a class, never be late!
                </p>
                <Link to="/schedule" className="btn btn-dark hero-button">
                  Create Schedule
                </Link>
              </div>
              <div className="col-md-6">
                <img
                  src="/images/3D.png"
                  alt="3D Campus Map"
                  className="img-fluid rounded hero-image"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Services Section */}
        <div ref={servicesRef}>
          <Services services={services} />
        </div>
      </div>

      {/* Contact Us Section */}
      <div ref={contactUsRef} id="contact-us">
        <div className="title">Developed by</div>
        <div className="developer-list">
          <a href="https://x.com/_ghadaa112" target="_blank" rel="noopener noreferrer">Ghada Allaythi</a>
          <a href="https://x.com/xflojain" target="_blank" rel="noopener noreferrer">Lojain Alghamdi</a>
          <a href="https://x.com/itzrafal_" target="_blank" rel="noopener noreferrer">Rafal Fakeera</a>
          <a href="https://x.com/Marya_Fawaz" target="_blank" rel="noopener noreferrer">Marya Alkanani</a>
        </div>
        <div className="slogan">Simplifying Your FCIT Campus Journey</div>
        <div className="footer">
          <div className="copyright">Copyright © 2025</div>
        </div>
      </div>

      {/* Login / Signup Modals */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
    </>
  );
}

export default Home;
