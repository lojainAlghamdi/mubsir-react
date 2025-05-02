import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "../styles.css";

export default function SignupModal() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setError(''); 

    // Save to localStorage or POST to fake DB
    const newUser = { email, password };
    localStorage.setItem('user', JSON.stringify(newUser)); // simulate account creation

  };

  const handleGoogleSignUp = () => {
    // Simulate real Google sign-up link
    window.location.href = 'https://accounts.google.com/';
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Create your Account</h2>

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

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button type="submit" className="create-btn">Create Account</button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/login">Log in</Link>
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

