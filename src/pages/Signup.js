import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../pages/firebase";
import { AuthContext } from "../AuthContext"; 


export default function SignupModal({ onClose }) {
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useContext(AuthContext); // ✅ use context

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: username,
      });

      // ✅ set global state
      setIsLoggedIn(true);
      setUser({ name: username, email });

      onClose?.();
      setTimeout(() => {
        navigate("/");
      }, 100);
    } catch (error) {
      setError("Firebase: " + error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // ✅ set global state
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

        <h2>Create your Account</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="create-btn">Create Account</button>
        </form>

        <p className="login-link">
          Already have an account?{" "}
          <span
            style={{ color: "#254B33", cursor: "pointer", fontWeight: "bold" }}
            onClick={() => {
              onClose?.();
              setTimeout(() => {
                window.dispatchEvent(new Event("openLogin"));
              }, 100);
            }}
          >
            Log in
          </span>
        </p>

        <div className="divider">– OR –</div>

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
  );
}
