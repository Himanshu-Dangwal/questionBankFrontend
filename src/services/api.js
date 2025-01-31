import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Change this as per your backend URL

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, { username, password });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Login failed";
    }
};

export const fetchQuestions = async (page) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/questions?page=${page}&limit=20`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to fetch questions";
    }
};
