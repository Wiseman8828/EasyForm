import React from 'react';
import "../../styles/Navbar.css";
import { Link, useNavigate } from 'react-router-dom';
import { clearToken } from '../../services/authService';
import { isAuthenticated } from "../../services/authService";
import { useUser } from '../../contexts/userContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { removeLoginData } = useUser();
    const handleLogout = () => {
        clearToken();
        removeLoginData()
        navigate("/");
    };

    return (
        <nav className="navbar">
            <div>
                <Link to="/">Home</Link>
                <Link to="/fields">Fields</Link>
                <Link to="/forms">Forms</Link>
            </div>
            {isAuthenticated() ? (
                <div>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : null}
        </nav>
    );
};

export default Navbar;