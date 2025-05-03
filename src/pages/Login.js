import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles.css";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../pages/firebase";
import { AuthContext } from "../AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginModal({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useContext(AuthContext); // ✅ use context

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
  
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
  
      setIsLoggedIn(true); // من AuthContext
      setUser({
        email: user.email,
        name: user.displayName,
      });
  
      alert(`Welcome back, ${user.displayName || "user"}!`);
      onClose?.();
      setTimeout(() => {
        navigate("/");
      }, 100);
    } catch (error) {
      setError("Invalid email or password.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Save user to context
      setIsLoggedIn(true);
      setUser({
        email: user.email,
        name: user.displayName,
      });

      alert(`Signed in as ${user.displayName}`);
      onClose?.();
      setTimeout(() => {
        navigate("/");
      }, 100);
    } catch (error) {
      console.error("Google sign-in error:", error);
      setError("Google sign-in failed.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>

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
            <p className="error-message">{error}</p>
          )}

          <button type="submit" className="create-btn">
            Login
          </button>
        </form>

        <p className="login-link">
          Don't have an account?{" "}
          <span
            style={{ color: "#254B33", cursor: "pointer", fontWeight: "bold" }}
            onClick={() => {
              onClose();
              setTimeout(() => {
                window.dispatchEvent(new Event("openSignup"));
              }, 100);
            }}
          >
            Sign up
          </span>
        </p>

        <div className="divider">– OR –</div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="google-btn" onClick={handleGoogleSignIn}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2702/2702602.png"
              alt="Google"
              width="20"
            />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
