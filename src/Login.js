import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"; // Import the Firebase auth instance

const Login = () => {
  const [showForm, setShowForm] = useState(false);
  const [username, setUsername] = useState(""); // This is just the username without @gmail.com
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/signup"); // Navigate to the Sign Up page
  };

  const handleLoginClick = async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Concatenate @gmail.com if it's not already in the username
    const email =username + "@gmail.com";

    try {
      // Sign in with the full email
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/main"); // Navigate to the main dashboard on success
    } catch (err) {
      setError("Invalid username or password");
      console.error("Login error:", err);
    }
  };

  const handleButtonClick = () => {
    setShowForm(true); // Show the form when the button is clicked
  };

  return (
    <div className="video-background-container">
      {/* Video background */}
      <video className="video-background" autoPlay muted >
        <source
          src="/videos/WhatsApp Video 2024-12-28 at 19.09.02.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Round button with "→" symbol */}
      {!showForm && (
        <button className="round-button" onClick={handleButtonClick}>
          →
        </button>
      )}

      {/* Sliding form container */}
      <div className={`form-container ${showForm ? "show" : ""}`}>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLoginClick}>
          <div className="form-group">
            <label>username:</label>
            <input
              type="text"
              placeholder="Enter your username"
              required
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              required
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-button">
            Login
          </button>
        </form>
        <p className="signup-line">
          Don’t have an account?{" "}
          <button onClick={handleSignUpClick} className="signup-link">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;