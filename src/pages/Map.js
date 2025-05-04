import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import LoginModal from "./Login";
import SignupModal from "./Signup";
import CampusMapViewer from "../components/CampusMapViewer";
import moment from "moment";
import "../styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Map() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [schedule, setSchedule] = useState([]);
  const [currentClass, setCurrentClass] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("mubsir_schedule");
    if (!stored) return;

    const parsed = JSON.parse(stored);
    setSchedule(parsed);

    const now = moment();
    const today = now.format("dddd");
    const currentMinutes = now.hours() * 60 + now.minutes();

    const match = parsed.find((cls) => {
      if (cls.day !== today) return false;
      const [start] = cls.time.split(" - ");
      let [startHour, startMin] = start.split(":");
      if (!startMin.includes("AM") && !startMin.includes("PM")) {
        const [min, ampm] = startMin.split(" ");
        startMin = min;
        start += " " + ampm;
      }
      let hour = parseInt(startHour);
      let minutes = parseInt(startMin);
      if (start.includes("PM") && hour !== 12) hour += 12;
      if (start.includes("AM") && hour === 12) hour = 0;
      const total = hour * 60 + minutes;
      return currentMinutes >= total && currentMinutes <= total + 60;
    });

    if (match) {
      setCurrentClass(match);
    }
  }, []);

  return (
    <>
      <Navbar
        onLoginClick={() => setShowLogin(true)}
        onSignupClick={() => setShowSignup(true)}
      />

      <div className={showLogin || showSignup ? "blur-background" : ""}>
        <div
          className="container d-flex justify-content-center align-items-center"
          style={{
            minHeight: "calc(100vh - 300px)",
            marginTop: "50px",
            marginBottom: "50px",
            gap: "40px",
            flexWrap: "wrap",
            position: "relative",
          }}
        >
          <div style={{ flex: "1 1 60%", minWidth: "300px", height: "600px" }}>
            <CampusMapViewer
              schedule={schedule}
              currentRoom={currentClass}
            />
          </div>

          <div
            style={{
              flex: "1 1 30%",
              minWidth: "250px",
              background: "#ffffff",
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              minHeight: "500px",
              display: "flex",
              flexDirection: "column",
              justifyContent: currentClass ? "flex-start" : "center",
              alignItems: "flex-start",
              textAlign: "left",
            }}
          >
            {currentClass ? (
              <>
                <h3 style={{ marginBottom: "100px", alignSelf: "center" }}>
                  Class Info
                </h3>
                <p><strong>Course:</strong> {currentClass.course}</p>
                <p><strong>Instructor:</strong> {currentClass.instructor}</p>
                <p><strong>Section:</strong> {currentClass.section}</p>
                <p><strong>Time:</strong> {currentClass.time}</p>
                <p><strong>Day:</strong> {currentClass.day}</p>
                <p><strong>Room:</strong> {currentClass.room}</p>
              </>
            ) : (
              <p style={{ textAlign: "center", width: "100%" }}>
                No class currently active.
              </p>
            )}
          </div>
        </div>
      </div>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}

      <div id="contact-us">
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
    </>
  );
}

export default Map;
