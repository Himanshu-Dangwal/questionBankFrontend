import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_HOST;

const QuestionsPage = () => {
    const [questions, setQuestions] = useState([]);
    const [page, setPage] = useState(1);
    const [showAnswers, setShowAnswers] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [results, setResults] = useState({});
    const [activeTime, setActiveTime] = useState(0);
    const [isActive, setIsActive] = useState(true);
    const [questionNumber, setQuestionNumber] = useState(1)


    useEffect(() => {
        const populate = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_BASE_URL}/dashboard?page=${page}&limit=10`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setQuestions(response.data.questions);
            setSelectedAnswers({});
            setResults({});
        };
        populate();
    }, [page]);

    useEffect(() => {
        let interval;
        const handleVisibilityChange = () => {
            setIsActive(!document.hidden);
        };

        if (isActive) {
            interval = setInterval(() => {
                setActiveTime(prev => prev + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => {
            clearInterval(interval);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [isActive]);

    const handleAnswerSelect = (questionNumber, option) => {
        setSelectedAnswers(prev => ({ ...prev, [questionNumber]: option }));
    };

    const handleSubmit = (questionNumber, correctChoice) => {
        const isCorrect = selectedAnswers[questionNumber] === correctChoice;
        setResults(prev => ({ ...prev, [questionNumber]: isCorrect }));
    };

    const attemptedCount = Object.keys(selectedAnswers).length;
    const correctCount = Object.values(results).filter(Boolean).length;

    const handleSearchBoxChange = (e) => {
        const value = e.target.value;
        setQuestionNumber(value);
    }

    const handleSearchBoxClick = async () => {
        const token = localStorage.getItem('token');
        const pageNumber = (questionNumber / 10) + 1;
        setPage(pageNumber);
        const response = await axios.get(`${API_BASE_URL}/dashboard?page=${page}&limit=10`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setQuestions(response.data.questions);
        setSelectedAnswers({});
        setResults({});
    }

    return (
        <div className="container mt-4">
            <h1 className="text-center fw-bold">Sharpen Your Skills – Answer the MCQs!</h1>
            <h5 className="text-center">🕒 Active Time: {Math.floor(activeTime / 60)} min {activeTime % 60} sec</h5>
            {questions.map((q) => (
                <div key={q.questionNumber} className="card my-3 p-3 shadow-sm d-flex align-items-start">
                    <p className="fw-semibold">{q.questionNumber}. {q.questionText}</p>
                    <ul className="list-unstyled mt-2">
                        {["option1", "option2", "option3", "option4"].map((opt, idx) => (
                            q[opt] !== "empty" && (
                                <li key={idx}>
                                    <input
                                        type="radio"
                                        name={`question-${q.questionNumber}`}
                                        value={opt}
                                        checked={selectedAnswers[q.questionNumber] === opt}
                                        onChange={() => handleAnswerSelect(q.questionNumber, opt)}
                                    /> {q[opt]}
                                </li>
                            )
                        ))}
                    </ul>
                    <button
                        onClick={() => handleSubmit(q.questionNumber, q.correctChoice)}
                        className="btn btn-success ms-3"
                    >
                        Submit
                    </button>
                    {results[q.questionNumber] !== undefined && (
                        <p className={`fw-bold mt-2 ${results[q.questionNumber] ? 'text-success' : 'text-danger'}`}>
                            {results[q.questionNumber] ? "✅ Correct!" : `❌ Incorrect! Correct Answer: ${q[q.correctChoice]}`}
                        </p>
                    )}
                </div>
            ))}
            <div className="mt-4">
                <h5>📊 Stats</h5>
                <p>Attempted: {attemptedCount} / {questions.length}</p>
                <p>Correct: {correctCount} / {attemptedCount}</p>
            </div>
            <button onClick={() => setShowAnswers(!showAnswers)} className="btn btn-dark mt-3">
                {showAnswers ? "Hide Answers" : "Show Answers"}
            </button>
            {/* <input type="search-box" placeholder="Enter question number" onChange={handleSearchBoxChange} />
            <button onClick={(e) => handleSearchBoxClick(e)}>Jump</button> */}
            <div className="d-flex align-items-center mt-3">
                <input
                    type="text"
                    className="form-control w-25"
                    placeholder="Question number"
                    onChange={handleSearchBoxChange}
                />
                <button onClick={handleSearchBoxClick} className="btn btn-info ms-2">
                    Jump
                </button>
            </div>

            <div className="mt-3 d-flex justify-content-between">
                <button onClick={() => setPage(page - 1)} disabled={page === 1} className="btn btn-primary">
                    Prev
                </button>
                {/* {[...Array(5)].map((_, i) => (
                    <button key={i} onClick={() => setPage(page + i)} className="btn btn-secondary mx-1">
                        {page + i}
                    </button>
                ))} */}
                <button onClick={() => setPage(page + 1)} className="btn btn-primary">
                    Next
                </button>
            </div>
        </div>
    );
};

export default QuestionsPage;

