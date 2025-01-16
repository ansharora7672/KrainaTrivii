import React from 'react';
import './home.css'; 
import {Navbar} from "../components/navbar.js";
import backgroundImage from '../assets/homebackground.jpg';
import mainImage from '../assets/personimg.png';

export const Home = () => {
    return (
        <div className="home" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <Navbar/>
            <div className="main-content">
                <h2 className="tagline">Dive deep or get surprised!</h2>
                <p className="subtext">Explore categories! they are amazing</p>
            </div>

            <div className="main-image">
                <img src={mainImage} alt="this guy is gangster" />
            </div>
        </div>
    );
};