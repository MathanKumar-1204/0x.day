import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Firestore methods
import { auth, db } from "./firebase"; // Import Firebase auth and Firestore instances
import "./SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    hashid: "",
    accountNumber: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Append "@gmail.com" to the username to create a full email
    const email = formData.username + "@gmail.com";

    try {
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        formData.password
      );

      const user = userCredential.user;
      const accountNumber = formData.accountNumber;

      // Use user.uid as the document ID
      await setDoc(doc(db, "user", user.uid), {
        username: formData.username,
        hashid: formData.hashid,
        type: "waiting",
        Balance:100,
        accountNumber: accountNumber,
      });

      
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("userId", user.uid);

      navigate("/main");// Navigate to main page
    } catch (err) {
      setError("Error during sign-up: " + err.message);
      console.error(err)
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Hash ID:</label>
          <input
            type="text"
            name="hashid"
            placeholder="Enter your hash ID"
            value={formData.hashid}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Account Number:</label>
          <input
            type="text"
            name="accountNumber"
            placeholder="Enter your account number"
            value={formData.accountNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;