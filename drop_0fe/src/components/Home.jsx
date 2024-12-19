import React from 'react';
import Header from './Header';
import Visuals from './Visuals';
import '../styles/home.css';

const Home = () => {
    return (
        <div className="home-container">
            <Header />
            <div className="main-content">
                <Visuals />
            </div>
        </div>
    );
};

export default Home;