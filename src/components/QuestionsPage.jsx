// import React, { useEffect, useState } from "react";
// // import { fetchQuestions } from "../services/api";
// import axios from "axios";
// // const API_BASE_URL = "http://localhost:8080/api"; // Change this as per your backend URL
// const API_BASE_URL = import.meta.env.VITE_HOST;


// const QuestionsPage = () => {
//     const [questions, setQuestions] = useState([]);
//     const [page, setPage] = useState(1);
//     const [showAnswers, setShowAnswers] = useState(false);

//     useEffect(() => {
//         // fetchQuestions(page).then(setQuestions).catch(console.error);
//         const populate = async () => {
//             const token = localStorage.getItem('token');
//             const response = await axios.get(`${API_BASE_URL}/dashboard?page=${page}&limit=10`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             console.log(response.data);
//             setQuestions(response.data.questions)
//         }
//         populate();
//     }, [page]);

//     function handlePrevClick() {
//         setPage(page - 1);
//         if (showAnswers) {
//             setShowAnswers(!showAnswers);
//         }
//     }

//     function handleNextClick() {
//         setPage(page + 1);
//         if (showAnswers) {
//             setShowAnswers(!showAnswers);
//         }
//     }

//     return (
//         <div className="container mt-4">
//             <h1 className="text-center fw-bold">Sharpen Your Skills – Answer the MCQs!</h1>
//             {questions.map((q, index) => (
//                 <div key={q.questionNumber} className="card my-3 p-3 shadow-sm">
//                     <p className="fw-semibold">{q.questionNumber}. {q.questionText}</p>
//                     <ul className="list-unstyled mt-2">
//                         <li>A) {q.option1}</li>
//                         <li>B) {q.option2}</li>
//                         {q.option3 !== "empty" && <li>C) {q.option3}</li>}
//                         {q.option4 !== "empty" && <li>D) {q.option4}</li>}
//                     </ul>
//                     {showAnswers && <p className="text-success fw-bold mt-2">✅ Correct Answer: {q[q.correctChoice]}</p>}
//                 </div>
//             ))}
//             <button onClick={() => setShowAnswers(!showAnswers)} className="btn btn-dark mt-3">
//                 {showAnswers ? "Hide Answers" : "Show Answers"}
//             </button>
//             <div className="mt-3 d-flex justify-content-between">
//                 <button onClick={handlePrevClick} disabled={page === 1} className="btn btn-primary">
//                     Prev
//                 </button>
//                 <button onClick={handleNextClick} className="btn btn-primary">
//                     Next
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default QuestionsPage;


import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_HOST;

const QuestionsPage = () => {
    const [questions, setQuestions] = useState([]);
    const [page, setPage] = useState(1);
    const [showAnswers, setShowAnswers] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [results, setResults] = useState({});

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

    const handleAnswerSelect = (questionNumber, option) => {
        setSelectedAnswers(prev => ({ ...prev, [questionNumber]: option }));
    };

    const handleSubmit = (questionNumber, correctChoice) => {
        const isCorrect = selectedAnswers[questionNumber] === correctChoice;
        setResults(prev => ({ ...prev, [questionNumber]: isCorrect }));
    };

    const attemptedCount = Object.keys(selectedAnswers).length;
    const correctCount = Object.values(results).filter(Boolean).length;

    return (
        <div className="container mt-4">
            <h1 className="text-center fw-bold">Sharpen Your Skills – Answer the MCQs!</h1>
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
                        Check
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
            {/* <button onClick={() => setShowAnswers(!showAnswers)} className="btn btn-dark mt-3">
                {showAnswers ? "Hide Answers" : "Show Answers"}
            </button> */}
            <div className="mt-3 d-flex justify-content-between">
                <button onClick={() => setPage(page - 1)} disabled={page === 1} className="btn btn-primary">
                    Prev
                </button>
                <button onClick={() => setPage(page + 1)} className="btn btn-primary">
                    Next
                </button>
            </div>
        </div>
    );
};

export default QuestionsPage;
