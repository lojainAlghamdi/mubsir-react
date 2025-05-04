import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import LoginModal from "./Login";
import SignupModal from "./Signup";
import Services from "./services";
import CampusAccess from "./CampusAccess";
import { AuthContext } from "../AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";

function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const contactUsRef = useRef(null);
  const location = useLocation();
  const { isLoggedIn, user } = useContext(AuthContext);

  useEffect(() => {
    if (location.state?.scrollTo === "contact") {
      contactUsRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  useEffect(() => {
    const handleOpenLogin = () => {
      setShowSignup(false);
      setShowLogin(true);
    };
    window.addEventListener("openLogin", handleOpenLogin);
    return () => window.removeEventListener("openLogin", handleOpenLogin);
  }, []);

  useEffect(() => {
    const handleOpenSignup = () => {
      setShowLogin(false);
      setShowSignup(true);
    };
    window.addEventListener("openSignup", handleOpenSignup);
    return () => window.removeEventListener("openSignup", handleOpenSignup);
  }, []);

  const services = [
    {
      icon: "/images/schedule-icon.png",
      title: "Creating Your Schedule",
      description:
        "Create your personalized schedule and locate your classes with MUBSIR.",
    },
    {
      icon: "/images/map-icon.png",
      title: "Interactive 2D/3D Campus Navigation",
      description:
        "Provides an interactive map to help students locate classrooms and navigate FCIT campus.",
    },
    {
      icon: "/images/route-icon.png",
      title: "Classroom Route Assistance",
      description:
        "Directs students from the main entrance of each floor to their designated classrooms.",
    },
  ];

  const buildings = [
    {
      image: "/images/library.jpeg",
      title: "Central Library",
      description:
        "The Central Library (Female Campus) is a vital academic library offering a wide range of scholarly resources, study areas, and integrated research services to support the learning and research needs of female students.",
      link: "https://maps.app.goo.gl/PdXBRqDNdkwz2ykS6?g_st=com.google.maps.preview.copy",
    },
    {
      image: "/images/KingFisal.jpg",
      title: "King Faisal Conference Center",
      description:
        "It is one of the most modern venues for hosting exhibitions and conferences. It is designed to serve the university's needs and consists of several halls, theatres, and exhibition spaces, all equipped with the latest modern technologies and facilities.",
      link: "https://maps.app.goo.gl/ktet6TqJVqz5CPGP8?g_st=com.google.maps.preview.copy",
    },
    {
      image: "/images/building66.jpg",
      title: "Deanships - Building 66 ",
      description:
        "Houses several key deanships including Admissions and Registration, Distance Learning, Community Service, and Graduate Studies. It serves as an administrative and academic services center for students and visitors.",
      link: "https://maps.app.goo.gl/xfxLJitXE3UfYVt59?g_st=com.google.maps.preview.copy",
    },
  ];

  return (
    <>
      <Navbar
        onLoginClick={() => setShowLogin(true)}
        onSignupClick={() => setShowSignup(true)}
      />

      <div className={showLogin || showSignup ? "blur-background" : ""}>
        {/* Hero Section */}
        <header className="home" id="home">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <h1 className="hero-title">Mubsir Campus Navigation</h1>
                <p className="hero-text">
                  Find Your Way to Every Class, Every Time at FCIT Campus. Never
                  miss a class, never be late!
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
        <div>
          <Services services={services} />
        </div>

        {/* CampusAccess Section */}
        <div>
          <CampusAccess buildings={buildings} />
        </div>
      </div>

      {/* Contact Us Section */}
      <div ref={contactUsRef} id="contact-us">
        <div className="title">Developed by</div>
        <div className="developer-list">
          <a href="https://x.com/_ghadaa112" target="_blank">Ghada Allaythi</a>
          <a href="https://x.com/xflojain" target="_blank">Lojain Alghamdi</a>
          <a href="https://x.com/itzrafal_" target="_blank">Rafal Fakeera</a>
          <a href="https://x.com/Marya_Fawaz" target="_blank">Marya Alkanani</a>
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
