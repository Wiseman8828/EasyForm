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
import CreateForm from "./components/Forms/CreateForm"
import ViewForm from "./components/Forms/ViewForm";
import { NotificationProvider } from "./contexts/notificationContext"
import GlobalNotification from "./utils/GlobalNotification"

function App() {
    return (
        <UserProvider>
            <NotificationProvider>
            <GlobalNotification></GlobalNotification>
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
                        <Route
                            path="/forms/create"
                            element={
                                <CanActivateRoute>
                                    <CreateForm />
                                </CanActivateRoute>
                            }
                        />
                        <Route
                            path="/forms/create/:formId"
                            element={
                                <CanActivateRoute>
                                    <CreateForm />
                                </CanActivateRoute>
                            }
                        />
                        <Route
                            path="/forms/view/:formId"
                            element={
                                <CanActivateRoute>
                                    <ViewForm />
                                </CanActivateRoute>
                            }
                        />
                        <Route path="/public-form/:formId" element={<PublicForm />} />
                    </Routes>
                </Router>
            </NotificationProvider>
        </UserProvider>
    );
};

export default App;
