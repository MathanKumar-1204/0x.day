import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import SignUp from "./Signup"; // Make sure file name matches
import MainPage from "./MainPage"; // Replace with your main page component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/main" element={<MainPage />} /> {/* MainPage Component */}
        <Route path="/" element={<Login/>} /> {/* MainPage Component */}
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
