import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../services/authService";

const CanActivateRoute = ({ children }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default CanActivateRoute;