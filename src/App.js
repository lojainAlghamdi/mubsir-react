import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthProvider } from "./AuthContext"; 

function App() {
  return (
    <Router>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
    </AuthProvider>
  </Router>
);
}
export default App;
