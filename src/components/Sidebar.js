// src/components/Sidebar.js
import React from 'react';

const Sidebar = ({ isOpen, toggleSidebar, handleOptionClick, activeOption, username }) => {
    const menuItems = [
        { name: 'Main', label: 'Main' },
        { name: 'Profile', label: 'Profile' },
        { name: 'Settings', label: 'Settings' },
        { name: 'Video', label: 'Video' },
        { name: 'Chatbot', label: 'Chatbot' },
        { name: 'Transaction', label: 'Transaction' },
        { name: 'History', label: 'History' },
        { name: 'Credit', label: 'Credit' },
        { name: 'Loan', label: 'Loan' },
        { name: 'Admin', label: 'Admin' },
        { name: 'Logout', label: 'Logout' }, // Logout option
    ];

    return (
        <aside
            className={`fixed inset-y-0 left-0 bg-gray-900 text-white shadow-xl w-64 p-6 transform ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            } transition-transform duration-300 ease-in-out z-10`}
        >
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Menu</h2>
                <button
                    className="text-gray-400 hover:text-white focus:outline-none"
                    onClick={toggleSidebar}
                >
                    ☰
                </button>
            </div>
            <div className="flex items-center space-x-3 mb-4">
                <span className="text-lg font-semibold">{username || 'User'}</span>
            </div>
            <hr className="border-gray-700 mb-6" />
            <ul className="space-y-4">
                {menuItems.map((item) => (
                    <li
                        key={item.name}
                        onClick={() => handleOptionClick(item.name)}
                        className={`p-3 rounded-lg cursor-pointer transition-colors duration-200 font-semibold text-sm ${
                            activeOption === item.name
                                ? 'bg-blue-600 text-white'
                                : 'hover:bg-gray-700 hover:text-white text-gray-400'
                        }`}
                    >
                        {item.label}
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
