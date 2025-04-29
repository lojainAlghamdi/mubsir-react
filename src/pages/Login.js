import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles.css";

export default function LoginModal() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      localStorage.setItem("isLoggedIn", true); // optional, for tracking
      alert('Login successful!');
      navigate("/home");
    } else {
      setError("Invalid credentials.");
    }
  };

  const handleGoogleSignUp = () => {
    window.location.href = "https://accounts.google.com/";
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Welcome to MUBSIR</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p style={{ color: "red", fontSize: "14px" }}>{error}</p>
          )}

          <button type="submit" className="create-btn">
            Login
          </button>
        </form>

        <p className="login-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>

        <div className="divider">– OR –</div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="google-btn" onClick={handleGoogleSignUp}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2702/2702602.png"
              alt="Google"
              width="20"
            />
            Sign up with Google
          </button>
        </div>
      </div>
    </div>
  );
}

// Removed duplicate export default statement
