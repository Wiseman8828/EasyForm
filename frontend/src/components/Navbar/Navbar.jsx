import React from 'react';
import "../../styles/Navbar.css";
import { Link, useNavigate } from 'react-router-dom';
import { clearToken } from '../../services/authService';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        clearToken();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div>
                <Link to="/">Home</Link>
                <Link to="/fields">Fields</Link>
                <Link to="/forms">Forms</Link>
            </div>
            <div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;