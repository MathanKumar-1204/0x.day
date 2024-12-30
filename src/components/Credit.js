import React from 'react';
import './Credit.css';

const Credit = () => {
  const creditScore = 750;
  const maxScore = 900;

  const factors = [
    { name: 'Payment History', value: '95%' },
    { name: 'Credit Utilization', value: '30%' },
    { name: 'Credit Age', value: '5 years' },
    { name: 'Recent Inquiries', value: '2' },
    { name: 'Credit Mix', value: 'Good' },
  ];

  const tips = [
    'Pay credit card balances on time.',
    'Keep credit utilization below 30%.',
    'Avoid unnecessary hard inquiries.',
  ];

  return (
    <div className="credit-score-page">
      <header className="header">
        <h1>Your Credit Score</h1>
        <p>Last Updated: December 29, 2024</p>
      </header>

      <div className="credit-score-section">
        <div className="score-circle">
          <span className="score">{creditScore}</span>
          <span className="max-score">/ {maxScore}</span>
          <p className="rating">Excellent</p>
        </div>
        <div className="score-range">
          <p>Score Range: 300 - 900</p>
          <div className="range-bar">
            <div
              className="current-score-indicator"
              style={{ left: `${(creditScore / maxScore) * 100}% `}}
            />
          </div>
        </div>
      </div>

      <div className="factors-section">
        <h2>Factors Influencing Your Score</h2>
        <ul className="factors-list">
          {factors.map((factor, index) => (
            <li key={index}>
              <span className="factor-name">{factor.name}</span>
              <span className="factor-value">{factor.value}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="tips-section">
        <h2>Tips to Improve Your Score</h2>
        <ul className="tips-list">
          {tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>

      <footer className="footer">
        <button className="download-button">Download Report</button>
      </footer>
    </div>
  );
};

export default Credit;