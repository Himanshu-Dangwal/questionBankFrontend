import React, { useDebugValue, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import ReactMarkdown from 'react-markdown';
import "../styles/questionBank.css";

const API_BASE_URL = import.meta.env.VITE_HOST;

const QuestionsPage = ({ setIsLoggedIn, activeTime, setActiveTime }) => {
    const [questions, setQuestions] = useState([]);
    const [page, setPage] = useState(1);
    const [showAnswers, setShowAnswers] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [results, setResults] = useState({});
    const [isActive, setIsActive] = useState(true);
    const [questionNumber, setQuestionNumber] = useState(1);
    const [showBanner, setShowBanner] = useState(true);
    const [loadingExplanation, setLoadingExplanation] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [explanations, setExplanations] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate("/");
                setIsLoggedIn(false);
                return;
            }

            try {
                await axios.get(`${API_BASE_URL}/checkSession`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem("token");
                    setIsLoggedIn(false);
                    navigate("/");
                }
            }
        };

        checkSession();

        const interval = setInterval(checkSession, 1000 * 60);

        return () => {
            console.log("chekcSession Called on logout");
            clearInterval(interval);
        }
    }, [navigate]);

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
        return async () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            clearInterval(interval);

            //Call API to add active time for user, pass in the users auth token
            if (activeTime > 0) {
                const token = localStorage.getItem('token');
                if (token) {
                    try {
                        await axios.post(`${API_BASE_URL}/auth/updateActiveTime`,
                            { activeTime },
                            { headers: { Authorization: `Bearer ${token}` } }
                        );
                    } catch (error) {
                        console.error("Error updating active time:", error);
                    }
                }
            }
            setActiveTime(0);

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
        const pageNumber = Math.ceil(questionNumber / 10);
        setPage(pageNumber);
        const response = await axios.get(`${API_BASE_URL}/dashboard?page=${pageNumber}&limit=10`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setQuestions(response.data.questions);
        setSelectedAnswers({});
        setResults({});
    }

    const getExplanation = async (q) => {
        try {
            setLoadingExplanation(prev => ({ ...prev, [q.questionNumber]: true }));
            const response = await axios.post(`${API_BASE_URL}/explanations`, {
                questionId: q._id
            });

            const explanationText = response.data.explanation;

            setExplanations(prev => ({ ...prev, [q.questionNumber]: explanationText }));
            setModalContent(explanationText);
            setShowModal(true);
        } catch (error) {
            console.error(`Error fetching explanation: ${error}`);
        } finally {
            setLoadingExplanation(prev => ({ ...prev, [q.questionNumber]: false }));
        }
    };

    return (
        <div className="container mt-4">
            {showBanner && (
                <div className="alert alert-info d-flex justify-content-between align-items-center">
                    <span>📌 Jump to the question number you want using the Jump box at the bottom.</span>
                    <button className="btn-close" onClick={() => setShowBanner(false)}></button>
                </div>
            )}

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
                    {/* {results[q.questionNumber] !== undefined && (
                        <p className={`fw-bold mt-2 ${results[q.questionNumber] ? 'text-success' : 'text-danger'}`}>
                            {results[q.questionNumber] ? "✅ Correct!" : `❌ Incorrect! Correct Answer: ${q[q.correctChoice]}`}
                        </p>
                    )} */}
                    {results[q.questionNumber] !== undefined && (
                        <div className="mt-2">
                            <p className={`fw-bold ${results[q.questionNumber] ? 'text-success' : 'text-danger'}`}>
                                {results[q.questionNumber] ? "✅ Correct!" : `❌ Incorrect! Correct Answer: ${q[q.correctChoice]}`}
                            </p>
                            {!results[q.questionNumber] && (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => getExplanation(q)}
                                        className="btn btn-warning btn-sm mt-1"
                                        disabled={loadingExplanation[q.questionNumber]}
                                    >
                                        {loadingExplanation[q.questionNumber] ? "Loading..." : "Explanation"}
                                    </button>
                                </>
                            )}
                        </div>
                    )}

                    {showModal && (
                        <div className="hint-popup">
                            <button className="close-popup" onClick={() => setShowModal(false)}>×</button>
                            <h4>💡 Explanation</h4>
                            <div className="hint-content">
                                <ReactMarkdown>{modalContent}</ReactMarkdown>
                            </div>
                        </div>
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

            <div className="d-flex align-items-center mt-3">
                <input
                    type="text"
                    className="form-control w-50"
                    placeholder="Enter question number"
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
                <button onClick={() => setPage(page + 1)} disabled={page === 141} className="btn btn-primary">
                    Next
                </button>
            </div>
        </div>
    );
};

export default QuestionsPage;
