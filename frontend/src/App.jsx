import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Navbar from "./components/Navbar/Navbar";
import FieldsPage from "./components/Fields/FieldsPage";
import FormsPage from "./components/Forms/FormPage";
import PublicForm from "./components/PublicForms/PublicForms";
import HomePage from "./components/Home/HomePage";
import CanActivateRoute from "./components/Auth/CanActivateRoute"
import { UserProvider } from "./contexts/userContext";

function App() {
    return (
        <UserProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route
                        path="/fields"
                        element={
                            <CanActivateRoute>
                                <FieldsPage />
                            </CanActivateRoute>
                        }
                    />
                    <Route
                        path="/forms"
                        element={
                            <CanActivateRoute>
                                <FormsPage />
                            </CanActivateRoute>
                        }
                    />
                    <Route path="/public-form/:formId" element={<PublicForm />} />
                </Routes>
            </Router>
        </UserProvider>
    );
};

export default App;
