const API_BASE_URL = "http://localhost:3200/api";

export const login = async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
        throw new Error("Login failed");
    }
    return response.json();
};

export const signup = async (formData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
    if (!response.ok) {
        throw new Error("Signup failed");
    }
    return response.json();
};

export const saveToken = (token) => {
    localStorage.setItem("authToken", token);
};

export const clearToken = () => {
    localStorage.removeItem("authToken");
};

export const getToken = () => {
    return localStorage.getItem("authToken");
};

export const isAuthenticated = () => {
    return !!getToken();
};



