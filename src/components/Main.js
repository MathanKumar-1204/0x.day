import "./Main.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";


const Main = () => {
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [mpin, setMpin] = useState("");
  const [balance, setBalance] = useState(null);
  const [cibilScore, setCibilScore] = useState(null);
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);


  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        if (user) {
          const docRef = doc(db, "admin", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUsername(docSnap.data().username);
          } else {
            console.log("No such document!");
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setUser(null);
        setUsername(null);
      }
    });
    fetchUserData();
    return () => unsubscribe();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/Login");
    } catch (error) {
      console.error("Error signing out:", error);
      // Handle the logout error as needed
    }
  };

  if (!isLoggedIn) {
    return <p>Please sign up to access this page</p>;
  }

  if (loading) {
    return <p>Loading user data...</p>;
  }

  if (!username) {
    return <p>Error: Unable to load user data.</p>;
  }


  const handleBalanceViewer = () => {
    setShowPasswordPrompt(true); // Show the password prompt
  };

  const handleMpinSubmit = () => {
    // Simulating a database fetch; replace this with actual database logic
    if (mpin === "1234") {
      setBalance("₹50,000"); // Replace with fetched balance
      setShowPasswordPrompt(false);
    } else {
      alert("Invalid MPIN");
    }
  };

  const fetchCibilScore = () => {
    // Simulating a database fetch; replace this with actual database logic
    setCibilScore(750); // Replace with fetched CIBIL score
  };




  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="logo">
          Trust <span>Node</span>
        </h1>
        <div className="user-info">Hi, {username}</div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <section className="login-section">
        <div className="cibil-checker">
          <h2>CIBIL SCORE CHECKER</h2>
          <button onClick={fetchCibilScore}>Check CIBIL Score</button>
          {cibilScore && <p>Your CIBIL Score: {cibilScore}</p>}
        </div>
        <div className="view-balance">
          <h3>VIEW BALANCE</h3>
          <button onClick={handleBalanceViewer}>View Balance</button>
          {balance && <p>Your Balance: {balance}</p>}
        </div>
      </section>

      {showPasswordPrompt && (
        <div className="password-prompt">
          <h3>Enter Your MPIN</h3>
          <input
            type="password"
            placeholder="Enter MPIN"
            value={mpin}
            onChange={(e) => setMpin(e.target.value)}
          />
          <button onClick={handleMpinSubmit}>Submit</button>
        </div>
      )}

<div
  className="w-3/4 border-2 border-gray-300 rounded-xl overflow-hidden mx-auto my-6"
  style={{ height: "150px" }}
>
  <video className="w-full h-full object-cover" controls>
    <source
      src="https://cdn.pixabay.com/vimeo/113368/connection-global-graphic-network-113368.mp4"
      type="video/mp4"
    />
    Your browser does not support the video tag.
  </video>
</div>


      <section className="quick-pay">
        <h2>Quick Pay</h2>
        <div className="quick-pay-options">
          <button>Credit</button>
          <button>History</button>
          <button>Loan</button>
        </div>
      </section>

      <section className="extra-options">
        <button>Video</button>
        <button>Loans</button>
        <button>Chatbot</button>
        <button>Transfer</button>
      </section>

      <footer className="dashboard-footer">
        <p>Lock/Unlock App | T & C | Helpline</p>
        <p>© 2024 Trust Node</p>
      </footer>
    </div>
  );
};

export default Main;
