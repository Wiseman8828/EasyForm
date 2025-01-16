import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/CreateForm.css'
import { getFormDetails, fetchFieldsWithPagination, createForm, updateForm } from "../../services/formService";
import { useNavigate } from 'react-router-dom';

const CreateForm = () => {
    const { formId } = useParams();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [formName, setFormName] = useState('');
    const [fields, setFields] = useState([]);
    const [availableFields, setAvailableFields] = useState([]);

    useEffect(() => {
        fetchFields();
        if (formId) {
            fetchSingleForm(formId);
        }
    }, [formId]);

    const fetchSingleForm = async (id) => {
        setLoading(true);
        try {
            const response = await getFormDetails(id);
            setFormName(response.name);
            setFields(response.fields);
        } catch (error) {
            console.error("Error fetching form:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchFields = async () => {
        try {
            const response = await fetchFieldsWithPagination(1, 10);
            setAvailableFields(response.fields);
        } catch (error) {
            console.error("Error fetching fields:", error);
        }
    };

    const handleAddField = (field) => {
        if (!fields.find(f => f.id === field.id)) {
            setFields([...fields, field]);
        }
    };

    const handleRemoveField = (id) => {
        setFields(fields.filter(field => field.id !== id));
    };

    const handleSubmit = async () => {
        try {
            const formData = { name: formName, fields };
            let response
            if (formId) {
                response = await updateForm(formId, formData)
            } else {
                response = await createForm(formData)
            }
            navigate('/forms')
        } catch (error) {
            console.error('Error while submitting form Data', error);
        }
    };

    return (
        <div className="form-container">
            <h2>{formId ? 'Edit Form' : 'Create New Form'}</h2>
            {loading ? <p>Loading...</p> : (
                <>
                    <div className="input-group">
                        <label>Form Name</label>
                        <input
                            type="text"
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                            disabled={!!formId}
                            placeholder="Enter form name"
                        />
                    </div>
                    <div className="fields-container">
                        <h4>Available Fields</h4>
                        <div className="fields-list">
                            {availableFields.map((field) => (
                                <button
                                    key={field.id}
                                    className="field-btn"
                                    onClick={() => handleAddField(field)}>
                                    {field.name} ({field.type})
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="selected-fields">
                        <h4>Selected Fields</h4>
                        <ul>
                            {fields.map((field) => (
                                <li key={field.id} className="field-item">
                                    {field.name} ({field.type})
                                    <span className="remove-icon" onClick={() => handleRemoveField(field.id)}>&times;</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="button-container">
                        <button className="submit-btn" onClick={handleSubmit}>{formId ? 'Update Form' : 'Create Form'}</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CreateForm;

