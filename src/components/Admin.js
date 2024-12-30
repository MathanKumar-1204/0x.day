import React, { useState } from 'react';
import './Admin.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, LineChart, Line, ResponsiveContainer } from 'recharts';

const Admin = () => {
  // Dummy Data
  const bankOverview = {
    totalBalance: '2,000,000',
    totalTransactions: '1,200',
    activeLoans: '250'
  };

  const transactionData = [
    { month: 'Jan', transactions: 50 },
    { month: 'Feb', transactions: 60 },
    { month: 'Mar', transactions: 70 },
    { month: 'Apr', transactions: 65 },
    { month: 'May', transactions: 85 },
    { month: 'Jun', transactions: 100 },
  ];

  const loanDistributionData = [
    { name: 'Personal', value: 500 },
    { name: 'Business', value: 300 },
    { name: 'Home', value: 200 },
  ];

  const depositWithdrawalData = [
    { month: 'Jan', deposits: 100, withdrawals: 50 },
    { month: 'Feb', deposits: 150, withdrawals: 75 },
    { month: 'Mar', deposits: 200, withdrawals: 100 },
    { month: 'Apr', deposits: 250, withdrawals: 125 },
    { month: 'May', deposits: 300, withdrawals: 150 },
    { month: 'Jun', deposits: 350, withdrawals: 175 },
  ];

  const handleLogout = () => {
    window.location.reload(); // Simple way to simulate a logout
  };

  return (
    <div className="admin-panel">
      {/* <div className="sidebar">
        <h3>Banking Admin</h3>
        <ul>
          <li>Dashboard</li>
          <li>User Management</li>
          <li>Transactions</li>
          <li>Loan Management</li>
          <li>Reports</li>
        </ul>
      </div> */}
{/* <div
  className="w-3/4 border-2 border-gray-300 rounded-xl overflow-hidden mx-auto my-6"
  style={{ height: "150px" }}
>
  <video className="w-full h-full object-cover " autoplay loop muted>
    <source
      src="/videos/net.mp4"
      type="video/mp4" 
    />
    Your browser does not support the video tag.
  </video>
</div> */}
      <div className="main-content">
        <header>
          <h1>Banking Admin Dashboard</h1>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </header>
        <div className="overview">
          <h2>Bank Overview</h2>
          <div className="stats">
            <div className="stat">
              <h3>Total Balance</h3>
              <p>{bankOverview.totalBalance}</p>
            </div>
            <div className="stat">
              <h3>Total Transactions</h3>
              <p>{bankOverview.totalTransactions}</p>
            </div>
            <div className="stat">
              <h3>Active Loans</h3>
              <p>{bankOverview.activeLoans}</p>
            </div>
          </div>
        </div>
        <div className="charts">
          <div className="chart-container">
            <h3>Monthly Transactions</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={transactionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="transactions" fill="rgba(75, 192, 192, 0.6)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-container">
            <h3>Loan Distribution by Type</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={loanDistributionData} dataKey="value" nameKey="name" outerRadius={100} fill="rgba(75, 192, 192, 0.6)" />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-container">
            <h3>Deposits vs Withdrawals</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={depositWithdrawalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="deposits" stroke="rgba(75, 192, 192, 1)" />
                <Line type="monotone" dataKey="withdrawals" stroke="rgba(255, 99, 132, 1)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
