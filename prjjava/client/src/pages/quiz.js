import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [score, setScore] = useState(0);
    const navigate = useNavigate();
    const { category } = useParams();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`http://localhost:3004/quiz/${category}`);
                const shuffledQuestions = response.data.map(question => ({
                    ...question,
                    options: shuffleArray([...question.incorrectAnswers, question.correctAnswer]),
                }));
                setQuestions(shuffledQuestions);
            } catch (error) {
                console.error("Failed to fetch questions:", error);
            }
        };
        fetchQuestions();
    }, [category]);

    const shuffleArray = array => {
        let currentIndex = array.length, randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    };

    const updateScore = async userId => {
        try {
            await axios.post("http://localhost:3004/auth/updateScore", {
                userId,
                scoreToAdd: 1, 
            });
        } catch (error) {
            console.error("Error updating score:", error);
        }
    };

    const handleAnswerSubmit = async () => {
        const currentQuestion = questions[currentQuestionIndex];
        if (selectedAnswer === currentQuestion.correctAnswer) {
            const userId = window.localStorage.getItem("userID");
            if (userId) {
                await updateScore(userId);
                setScore(score + 1); 
            }
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer("");
        } else {
            navigate("/leaderboard"); 
        }
    };

    const handleAnswerSelect = answer => {
        setSelectedAnswer(answer);
    };

    return (
        <div>
            <h3>{questions.length > 0 && questions[currentQuestionIndex].questionText}</h3>
            <div>
                {questions.length > 0 && questions[currentQuestionIndex].options.map((option, index) => (
                    <button 
                        key={index} 
                        onClick={() => handleAnswerSelect(option)}
                        className={`option-button ${selectedAnswer === option ? (option === questions[currentQuestionIndex].correctAnswer ? 'correct' : 'incorrect') : ''}`}
                    >
                        {option}
                    </button>
                ))}
            </div>
            {currentQuestionIndex < questions.length - 1 && (
                <button onClick={handleAnswerSubmit}>Next</button>
            )}
            <div>Score: {score}/{questions.length}</div>
        </div>
    );
};
