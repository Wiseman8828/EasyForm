import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "../../styles/ViewForm.css"
import { getFormDetails } from "../../services/formService";

const fieldIcons = {
    text: '📝',
    number: '🔢',
    file: '📁',
    image: '🖼️'
};

const ViewForm = () => {
    const { formId } = useParams();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState(null);

    const fetchFormData = async () => {
        setLoading(true);
        try {
            const response = await getFormDetails(formId)
            setForm(response);
        } catch (error) {
            console.error('Error fetching form:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFormData();
    }, [formId]);

    if (loading) return <p className="loading-text">Loading form details...</p>;
    if (!form) return <p className="error-text">Form not found</p>;

    return (
        <div className="view-form-container">
            <h2 className="form-title">{form.name}</h2>
            <div className="fields-container">
                {form.fields.length > 0 ? (
                    form.fields.map((field, index) => (
                        <div key={index} className="field-card">
                            <span className="field-icon">{fieldIcons[field.type] || '🔹'}</span>
                            <div className="field-details">
                                <p className="field-name">{field.name}</p>
                                <p className="field-type">{field.type}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-fields-text">No fields added</p>
                )}
            </div>
        </div>
    );
};

export default ViewForm;
