import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/PublicForm.css";
import { getFormDetails, submitForm } from "../../services/formService";
import { useNotificationContext } from "../../contexts/notificationContext";

const PublicForms = () => {
  const { formId } = useParams();
  const navigate = useNavigate()
  const [formDetails, setFormDetails] = useState(null);
  const [formData, setFormData] = useState({});
  const [fileData, setFileData] = useState({});
  const { handleNotification } = useNotificationContext();

  useEffect(() => {
    const fetchFormDetails = async () => {
      try {
        const details = await getFormDetails(formId);
        setFormDetails(details);
      } catch (error) {
        handleNotification({
          details: `Error while fetching form details: ${error.message}`,
          type: 'error'
        })
      }
    };

    fetchFormDetails();
  }, [formId]);

  const handleInputChange = (fieldId, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleFileChange = (fieldId, file) => {
    if (file) {
      setFileData((prev) => ({
        ...prev,
        [fieldId]: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData()

    let fieldData = {}
    Object.entries(formData).forEach(([fieldId, value]) => {
      if (fieldId === 'email') {
        formDataToSend.append(fieldId, value)
      } else {
        fieldData[fieldId] = value
      }
    });

    formDataToSend.append('fieldData', JSON.stringify(fieldData))

    Object.entries(fileData).forEach(([fieldId, file]) => {
      if (file instanceof File) {
        formDataToSend.append(fieldId, file);
      }
    });

    try {
      await submitForm(formId, formDataToSend);
      navigate('/')
      handleNotification({
        details: `Form submitted successfully!`,
        type: 'success'
      })
    } catch (error) {
      handleNotification({
        details: `Error submitting form: ${error.message}`,
        type: 'error'
      })
    }
  };

  if (!formDetails) {
    return <div>Loading form...</div>;
  }

  return (
    <div className="public-form-container">
      <h1>{formDetails.name}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email Id</label>
          <input
            type='email'
            value={formData['email'] || ""}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
        </div>

        {formDetails.fields.map((field) => (
          <div key={field.id} className="form-group">
            <label>{field.name}</label>
            {field.type === "File" || field.type === "image" ? (
              <input
                type="file"
                onChange={(e) => handleFileChange(field.id, e.target.files[0])}
              />
            ) : (
              <input
                type={field.type}
                value={formData[field.id] || ""}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
              />
            )}
          </div>
        ))}
        <button className="submit-btn" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PublicForms;