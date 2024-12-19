import React from 'react';
import '../styles/header.css';

const Header = () => {
    return (
        <header>
            {/* Title of the platform */}
            <h1>School Dropout Rate Analysis Platform</h1>
            
            
            {/* Navigation links */}
            <nav>
                <ul>
                    <li><a href="#overview">Overview</a></li>
                    <li><a href="#statistics">Statistics</a></li>
                    <li><a href="#reports">Reports</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
            
            {/* Search bar for quick access */}
            <input type="text" placeholder="Search..." />
            
            {/* User profile icon */}
            <div className="user-profile">
                <img src="path/to/profile-pic.jpg" alt="User Profile" />
            </div>
        </header>
    );
};

export default Header;