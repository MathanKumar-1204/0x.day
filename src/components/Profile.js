import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./Profile.css";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const transactions = [
    { id: 1, type: "Deposit", amount: 0.5, date: "2024-12-01" },
    { id: 2, type: "Withdrawal", amount: 1.0, date: "2024-11-25" },
    { id: 3, type: "Transfer", amount: 0.3, date: "2024-11-15" },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        if (user) {
          const docRef = doc(db, "admin", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log("No such document!");
          }
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
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
        setUserData(null);
      }
    });
    fetchUserData();
    return () => unsubscribe();
  }, [user]);

  if (!isLoggedIn) {
    return <p>Please log in to view this page</p>;
  }
  if (loading) {
    return <p>Loading profile data...</p>;
  }

  if (!userData) {
    return <p>Error: Unable to load user data</p>;
  }

  return (
    <div className={`profile-page ${darkMode ? "dark" : ""}`}>
      <header className="profile-header">
        <h1>Profile</h1>
        <button onClick={() => setDarkMode(!darkMode)}>
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>
      </header>
  
      <div className="scrollable-content">
        <section className="profile-details">
          <h2>User Details</h2>
          <div className="user-info text-black">
          <p><strong>Name:</strong> {userData.username}</p>
            <p><strong>Account Number:</strong> {userData.accountNumber}</p>
            <p><strong>Hash id:</strong> {userData.hashid}</p>
            <p><strong>Type:</strong> {userData.type}</p>
            <p><strong>Balance:</strong> {userData.balance}</p>
            
          </div>
        </section>
  
        {/* <section className="wallet-details">
          <h2>Wallet Details</h2>
          <div className="wallet-info">
            <p><strong>Wallet Address:</strong> {userData.walletAddress}</p>
            <p><strong>Balance:</strong> {userData.balance}</p>
            <button onClick={() => alert("Feature coming soon!")}>
              View Wallet Transactions
            </button>
          </div>
        </section> */}
  
        <section className="transaction-history">
          <h2>Transaction Analysis</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={transactions} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill={darkMode ? "#ff6b6b" : "#007bff"} />
            </BarChart>
          </ResponsiveContainer>
          <p>
            Analysis: You have performed <strong>{transactions.length}</strong>{" "}
            transactions. The most significant transaction was a{" "}
            <strong>
              {transactions.reduce((prev, current) =>
                prev.amount > current.amount ? prev : current
              ).type}
            </strong>{" "}
            of{" "}
            <strong>
              {
                transactions.reduce((prev, current) =>
                  prev.amount > current.amount ? prev : current
                ).amount
              }{" "}
              ETH
            </strong>
            .
          </p>
        </section>
  
        {/* <section className="actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button onClick={() => alert("Deposit feature coming soon!")}>
              Deposit
            </button>
            <button onClick={() => alert("Withdraw feature coming soon!")}>
              Withdraw
            </button>
            <button onClick={() => alert("Transfer feature coming soon!")}>
              Transfer
            </button>
          </div>
        </section> */}
      </div>
  
      <footer className="profile-footer">
        <p>© 2024 Blockchain Banking System</p>
      </footer>
    </div>
  );
};

export default Profile;