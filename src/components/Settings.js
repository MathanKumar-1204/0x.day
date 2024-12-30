import React, { useState } from "react";
import "./Settings.css";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("English");
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  return (
    <div className={`settings-page ${darkMode ? "dark" : ""}`}>
      <header className="settings-header">
        <h1>Settings</h1>
      </header>

      <section className="settings-section">
        <h2>Account</h2>
        <div className="settings-item">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" placeholder="Enter new username" />
        </div>
        <div className="settings-item">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" placeholder="Enter new email" />
        </div>
      </section>

      <section className="settings-section">
        <h2>Preferences</h2>
        <div className="settings-item">
          <label>Notifications:</label>
          <button onClick={() => setNotifications(!notifications)}>
            {notifications ? "Disable" : "Enable"}
          </button>
        </div>
        <div className="settings-item">
          <label>Theme:</label>
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
        <div className="settings-item">
          <label>Language:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
          </select>
        </div>
      </section>

      <section className="settings-section">
        <h2>Security</h2>
        <div className="settings-item">
          <label>Two-Factor Authentication:</label>
          <button onClick={() => setTwoFactorAuth(!twoFactorAuth)}>
            {twoFactorAuth ? "Disable" : "Enable"}
          </button>
        </div>
        <div className="settings-item">
          <label>Change Password:</label>
          <button onClick={() => alert("Change password feature coming soon!")}>
            Update Password
          </button>
        </div>
      </section>

      <section className="settings-section">
        <h2>About</h2>
        <div className="settings-item">
          <p>Version: 1.0.0</p>
          <p>Contact Support: support@example.com</p>
        </div>
      </section>

      <footer className="settings-footer">
        <button onClick={() => alert("Settings Saved!")}>Save Changes</button>
      </footer>
    </div>
  );
};

export default Settings;