import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_HOST;

export const login = async (username, password, captchaValue) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, { username, password, captchaValue });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Login failed";
    }
};

export const fetchQuestions = async (page) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/dashboard?page=${page}&limit=8`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to fetch questions";
    }
};

