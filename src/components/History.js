import React from "react";
import "./History.css";

const History = () => {
  const transactions = [
    {
      txID: "0x1234abcd5678ef90",
      amount: 1.5,
      timestamp: "2024-12-28 10:45:30",
      status: "Confirmed",
    },
    {
      txID: "0x9876fedcba43210",
      amount: 2.0,
      timestamp: "2024-12-27 15:22:10",
      status: "Pending",
    },
    {
      txID: "0x5678ef90abcd1234",
      amount: 0.8,
      timestamp: "2024-12-26 08:30:00",
      status: "Failed",
    },
  ];

  return (
    <div className="transaction-history">
      <h1 className="header">Transaction History</h1>
      <div className="transaction-list">
        {transactions.map((transaction, index) => (
          <div key={index} className={`transaction-card ${transaction.status.toLowerCase()}`}>
            <p><strong>Transaction ID:</strong> {transaction.txID}</p>
            <p><strong>Amount:</strong> {transaction.amount.toFixed(3)} ETH</p>
            <p><strong>Date:</strong> {transaction.timestamp}</p>
            <p className="status">
              <strong>Status:</strong> <span>{transaction.status}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;