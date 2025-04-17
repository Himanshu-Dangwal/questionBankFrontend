import React, { useState } from 'react';
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_HOST;

function Deactivate() {
    const [username, setUsername] = useState("");
    const [banner, setBanner] = useState("");
    const [gotResponse, setGotResponse] = useState(false);

    const handleChange = (e) => {
        setUsername(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_BASE_URL}/deactivate`, {
                username: username
            });

            setBanner(response.data?.message || "Deactivation request sent.");
        } catch (error) {
            console.error("Deactivation error:", error);
            setBanner("Error: Unable to deactivate user.");
        } finally {
            setGotResponse(true);
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center'>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={handleChange}
                />
                <button type="submit">Activate/Deactivate</button>
            </form>

            {gotResponse && (
                <div>
                    {banner}
                </div>
            )}
        </div>
    );
}

export default Deactivate;
