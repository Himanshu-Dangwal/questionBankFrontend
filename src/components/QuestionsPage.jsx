import React, { useEffect, useState } from "react";
import { fetchQuestions } from "../services/api";
import axios from "axios";
const API_BASE_URL = "http://localhost:8080/api"; // Change this as per your backend URL


const QuestionsPage = () => {
    const [questions, setQuestions] = useState([]);
    const [page, setPage] = useState(1);
    const [showAnswers, setShowAnswers] = useState(false);

    useEffect(() => {
        // fetchQuestions(page).then(setQuestions).catch(console.error);
        const populate = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_BASE_URL}/dashboard?page=${page}&limit=20`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);
            setQuestions(response.data.questions)
        }
        populate();
    }, [page]);

    return (
        <div className="container mt-4">
            <h1 className="text-center fw-bold">Sharpen Your Skills – Answer the MCQs!</h1>
            {questions.map((q, index) => (
                <div key={q.questionNumber} className="card my-3 p-3 shadow-sm">
                    <p className="fw-semibold">{q.questionNumber}. {q.questionText}</p>
                    <ul className="list-unstyled mt-2">
                        <li>A) {q.option1}</li>
                        <li>B) {q.option2}</li>
                        {q.option3 !== "empty" && <li>C) {q.option3}</li>}
                        {q.option4 !== "empty" && <li>D) {q.option4}</li>}
                    </ul>
                    {showAnswers && <p className="text-success fw-bold mt-2">✅ Correct Answer: {q[q.correctChoice]}</p>}
                </div>
            ))}
            <button onClick={() => setShowAnswers(!showAnswers)} className="btn btn-dark mt-3">
                {showAnswers ? "Hide Answers" : "Show Answers"}
            </button>
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
