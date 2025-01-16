import React, { useEffect, useState } from "react";
import "../../styles/HomePage.css";
// import { getForms } from "../../utils/api";
import { isAuthenticated } from "../../services/authService";

const HomePage = () => {
    const [forms, setForms] = useState([]);

    useEffect(() => {
        if (isAuthenticated()) {
            // getForms()
            //     .then((data) => setForms(data))
            //     .catch((err) => console.error("Error fetching forms: ", err));
        }
    }, []);

    if (!isAuthenticated()) {
        return (
            <div className="home-container">
                <h1>Welcome to the Form Builder App</h1>
                <p>Create custom forms, manage fields, and collect data effortlessly.</p>
                <p>
                    To get started, <a href="/signup">Sign Up</a> or <a href="/login">Log In</a>.
                </p>
            </div>
        );
    }

    return (
        <div className="forms-container">
            <h1>Your Forms</h1>
            <table>
                <thead>
                    <tr>
                        <th>Form Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {forms.map((form) => (
                        <tr key={form.id}>
                            <td>{form.name}</td>
                            <td>
                                <button onClick={() => window.location.href = `/forms/edit/${form.id}`}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HomePage;