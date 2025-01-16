import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/Signup.css";
import { signup } from '../../services/authService';

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup({ name, email, password });
            navigate("/login");
        } catch (error) {
            console.error("Signup failed", error);
        }
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
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
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;