import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/navbar.js'; 
import './categories.css'; 
import gangsterImage from '../assets/gangster2.png'; 

export const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3004/quizzes/categories')
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    return (
        <div className="categories-page">
            <Navbar />
            <h1>Pick Your Playground</h1>
            <div className="category-container">
                {categories.map((category, index) => (
                    <Link to={`/categoryquiz/${category}`} key={index} className="category-box">
                        <h3>{category}</h3>
                    </Link>
                ))}
            </div>
            <div className="sidebar-image">
                <img src={gangsterImage} alt="Gangster" />
            </div>
        </div>
    );
};

export default Categories;
