import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './CategoryQuiz.css';
import { Navbar } from '../components/navbar.js';
import gangsterVehicle from '../assets/gangstavehicle.png';

export const CategoryQuiz = () => {
    const { category } = useParams();
    const [question, setQuestion] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [hasAnswered, setHasAnswered] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:3004/quizzes/randomByCategory/${category}`)
            .then(response => setQuestion(response.data))
            .catch(error => console.error('Error fetching question:', error));
    }, [category]);

    const handleOptionClick = (option) => {
        if (hasAnswered) return;

        setSelectedOption(option);
        setHasAnswered(true);
    };

    return (
        <div className="category-quiz-container">
            <Navbar />
            <div className="quiz-layout">
                <div className="quiz-box">
                    {question ? (
                        <>
                            <h2 className="quiz-category">{category}</h2>
                            <h3 className="quiz-question">{question.questionText}</h3>
                            <div className="options-container">
                                {question.incorrectAnswers.concat(question.correctAnswer).map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleOptionClick(option)}
                                        className={`option ${selectedOption === option ? 'incorrect' : ''} ${hasAnswered && option === question.correctAnswer ? 'correct' : ''}`}
                                        disabled={hasAnswered}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                            {hasAnswered && selectedOption !== question.correctAnswer && (
                                <div className="correct-answer">
                                    Correct Answer: {question.correctAnswer}
                                </div>
                            )}
                        </>
                    ) : (
                        <p>Loading question...</p>
                    )}
                </div>
                <div className="right-side-image-container">
                    <img src={gangsterVehicle} className="right-side-image" alt="Gangster Vehicle" />
                </div>
            </div>
        </div>
    );
};

export default CategoryQuiz;
