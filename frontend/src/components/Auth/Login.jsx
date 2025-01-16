import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/Login.css";
import { saveToken, login } from '../../services/authService';
import { useUser } from "../../contexts/userContext"
import { useNotificationContext } from "../../contexts/notificationContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { setLoginData } = useUser();
    const { handleNotification } = useNotificationContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(email, password);
            saveToken(response.token);
            setLoginData(response)
            navigate("/fields");
            handleNotification({
                details: `Login successful!`,
                type: 'success'
            })
        } catch (error) {
            handleNotification({
                details: `Login failed", ${error}`,
                type: 'error'
            })
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;