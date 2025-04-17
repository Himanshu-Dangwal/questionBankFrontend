import React, { useState } from 'react'
import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_HOST;
function Deactivate() {
    const [username, setUsername] = useState("");
    const [banner, setBanner] = useState("");
    const [gotResponse, setGotResponse] = useState(false);

    const handleChange = (e) => {
        setUsername(e.target.value);
        console.log(username);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(`${API_BASE_URL}/deactivate`, {
                username: username
            })
            if (response.status === 201) {
                setBanner(response.message);
            } else {
                setBanner(response.message);
            }
        } catch (error) {
            setBanner("Error 404");
        } finally {
            setGotResponse(true);
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} type='text' placeholder='Enter Username' value={username} />
                <button type="submit">Deactivate</button>
            </form>

            {gotResponse && <div>
                {banner}
            </div>}
        </div>
    )
}

export default Deactivate