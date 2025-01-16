import React from "react";
import "../../styles/HomePage.css";
import { useUser } from "../../contexts/userContext"; 

const HomePage = () => {
    const { user } = useUser();  

    if (!user) {
        return (
            <div className="home-container">
                <h1>Welcome to the Form Builder App</h1>
                <p>Create custom forms, manage fields, and collect data effortlessly.</p>
                <p>
                    To get started, <a href="/signup">Sign Up</a> or <a href="/login">Log In</a>.
                </p>
            </div>
        );
    } else {
        return (
            <div className="home-container">
                <h1>Hello, {user?.name}! 👋</h1>
                <p>Welcome to your personalized dashboard. Here, you can create custom fields, build forms, and manage submissions effortlessly.</p>
                <p>Get started by adding new form fields or managing existing forms by navigating to the dashboard.</p>
            </div>
        )
    }
};

export default HomePage;