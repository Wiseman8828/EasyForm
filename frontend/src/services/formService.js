const API_BASE_URL = "http://localhost:3200/api";

const getAuthHeaders = () => {
    const token = localStorage.getItem("authToken");
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
};

export const createField = async (fieldData) => {
    const response = await fetch(`${API_BASE_URL}/fields`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(fieldData),
    });

    if (!response.ok) {
        throw new Error("Failed to create field");
    }

    return response.json();
};

export const fetchFieldsWithPagination = async (page, limit) => {
    const response = await fetch(
        `${API_BASE_URL}/fields?page=${page}&limit=${limit}`,
        {
            method: "GET",
            headers: getAuthHeaders(),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch fields");
    }
    return response.json();
};

export const createForm = async (formdData) => {
    const response = await fetch(`${API_BASE_URL}/form`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(formdData),
    });

    if (!response.ok) {
        throw new Error("Failed to create field");
    }

    return response.json();
};

export const updateForm = async (formId, formdData) => {
    const response = await fetch(`${API_BASE_URL}/form/${formId}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(formdData),
    });

    if (!response.ok) {
        throw new Error("Failed to create field");
    }

    return response.json();
};

export const getFormDetails = async (formID) => {
    const response = await fetch(`${API_BASE_URL}/form/${formID}`, {
        method: "get",
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Failed to create field");
    }

    return response.json();
};

export const fetchFormsWithPagination = async (page, limit) => {
    const response = await fetch(`${API_BASE_URL}/form?page=${page}&limit=${limit}`, {
        method: "get",
        headers: getAuthHeaders()
    });

    if (!response.ok) {
        throw new Error("Failed to create field");
    }

    return response.json();
};