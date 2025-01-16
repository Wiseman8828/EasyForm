import React, { useState } from "react";
import { createField } from "../../services/formService";
import FieldList from "./FieldList";
import "../../styles/FieldPage.css";
import { useNotificationContext } from "../../contexts/notificationContext";

const FieldsPage = () => {
    const [name, setName] = useState("");
    const [type, setType] = useState("String");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const { handleNotification } = useNotificationContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!name.trim()) {
            handleNotification({
                details: "Field name is required.",
                type: 'error'
            })
            return;
        }

        try {
            await createField({ name, type, description });
            setName("");
            setType("String");
            setDescription("")
            setIsModalOpen(false);
            setRefreshKey((prevKey) => prevKey + 1);
            handleNotification({
                details: "Field created successfully",
                type: 'success'
            })
        } catch (error) {
            console.error("Error creating field:", error);
            setError("An error occurred while creating the field. Please try again.");
        }
    };

    return (
        <div className="fields-page">
            <h1>Manage Your Fields</h1>
            <button className="open-modal-btn" onClick={() => setIsModalOpen(true)}>
                Create New Field
            </button>

            <FieldList key={refreshKey} />

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Create a New Field</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Field Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <select value={type} onChange={(e) => setType(e.target.value)}>
                                <option value="String">String</option>
                                <option value="Number">Number</option>
                                <option value="File">File / Image Upload</option>
                                <option value="Text">Text</option>
                            </select>
                            <textarea
                                placeholder="Field Description (optional)"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <button type="submit">Add Field</button>
                            <button
                                type="button"
                                className="close-modal-btn"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                        </form>
                        {error && <p className="error-message">{error}</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FieldsPage;
