import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './leaderboard.css';
import {Navbar} from "../components/navbar.js";
import backgroundImage from '../assets/homebackground.jpg';

export const Leaderboard = () => {
    const [leaderboardData, setLeaderboardData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3004/auth/leaderboard")
            .then(response => {
                setLeaderboardData(response.data);
            })
            .catch(error => {
                console.error('Error fetching leaderboard:', error);
            });
    }, []);

    return (
        <div className="leaderboard-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <Navbar/>
            
            
            {leaderboardData.map((user, index) => (
                <div key={index} className="leaderboard-item">
                    <span className="username">{user.username}</span>
                    <span className="score">{user.score} points</span>
                </div>
            ))}
        </div>
    );
};
