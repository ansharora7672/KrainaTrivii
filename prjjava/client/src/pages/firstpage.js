import React from 'react';
import { useNavigate } from 'react-router-dom';
import './firstpage.css'; 

export const Firstpage = () => {
    const navigate = useNavigate();

    const goToAuth = () => {
        navigate('/auth'); 
    };

    return (
        <div className="firstpage">
            <h1>Kraina Trviii</h1> 
            <button onClick={goToAuth} className="login-button">Login</button>
            <button onClick={goToAuth} className="signup-button">Signup</button>
        </div>
    );
};
