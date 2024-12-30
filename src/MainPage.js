// src/Main.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Loan from './components/Loan';
import Settings from './components/Settings';
import Profile from './components/Profile';
import Credit from './components/Credit';
import Chatbot from './components/Chatbot';
import Transaction from './components/Transaction';
import Video from './components/Video';
import Admin from './components/Admin';
import History from './components/History';
import Main from './components/Main';

const MainPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar open/close state
    const [activeOption, setActiveOption] = useState('Main'); // Track selected sidebar option
    const navigate = useNavigate(); // Initialize useNavigate for navigation

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev); // Toggle sidebar visibility
    };

    const handleOptionClick = (option) => {
        if (option === 'Logout') {
            handleLogout(); // Call logout handler when Logout is clicked
        } else {
            setActiveOption(option); // Update selected option
            if (window.innerWidth < 1024) toggleSidebar(); // Close sidebar on small screens after selecting
        }
    };

    const handleLogout = () => {
        navigate('/login'); // Redirect to the login page
    };

    const renderContent = () => {
        switch (activeOption) {
            case 'Main':
                return <Main />;
            case 'Settings':
                return <Settings />;
            case 'Profile':
                return <Profile />;
            case 'Video':
                return <Video />;
            case 'Chatbot':
                return <Chatbot />;
            case 'Transaction':
                return <Transaction />;
            case 'History':
                return <History />;
            case 'Credit':
                return <Credit />;
            case 'Loan':
                return <Loan />;
            case 'Admin':
                return <Admin />;
            default:
                return <Main />;
        }
    };

    return (
        <div className="flex flex-col bg-black h-screen">
            <Header toggleSidebar={toggleSidebar} pageTitle={activeOption} />
            <div className="flex flex-grow overflow-hidden">
                <Sidebar
                    isOpen={isSidebarOpen}
                    toggleSidebar={toggleSidebar}
                    handleOptionClick={handleOptionClick}
                    activeOption={activeOption}
                    username="JoiningIn"
                />
                <div
                    className={`transition-all duration-300 p-6 flex-grow h-full ${
                        isSidebarOpen ? 'lg:ml-64' : 'lg:ml-16'
                    }`}
                >
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default MainPage;
