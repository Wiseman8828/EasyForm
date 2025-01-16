import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchFormsWithPagination } from '../../services/formService';
import { FaEdit, FaEye, FaCopy, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import '../../styles/FormPage.css';
import { useNotificationContext } from "../../contexts/notificationContext";

const FormPage = () => {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const { handleNotification } = useNotificationContext();

  const fetchForms = async (currentPage) => {
    setLoading(true);
    try {
      const limit = 16;
      const response = await fetchFormsWithPagination(currentPage, limit);
      setForms(response.forms);
      setPage(response.page);
      setTotalPages(response.pages);
    } catch (error) {
      handleNotification({
        details: `Error while fetching form: ${error.message}`,
        type: 'error'
      })
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForms(page);
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const createNewForm = () => {
    navigate('/forms/create');
  };

  const editForm = (id) => {
    navigate(`/forms/create/${id}`);
  };

  const viewForm = (id) => {
    navigate(`/forms/view/${id}`);
  };

  const copyFormLink = (id) => {
    const link = `${window.location.origin}/public-form/${id}`;
    navigator.clipboard.writeText(link);
    handleNotification({
      details: `Form link copied!`,
      type: 'success'
  })
  };

  return (
    <div className="form-page-container">
      <div>
        <button className="btn btn-primary create-btn" onClick={createNewForm}>Create New Form</button>

        {loading ? <p className="loading-text">Loading forms...</p> : (
          <div className="form-grid">
            {forms.length > 0 ? forms.map((form) => (
              <div key={form.id} className="form-card">
                <h3 className="form-title">{form.name}</h3>
                <div className="form-actions">
                  <button className="icon-btn edit-btn" onClick={() => editForm(form.id)} title="Edit">
                    <FaEdit />
                  </button>
                  <button className="icon-btn view-btn" onClick={() => viewForm(form.id)} title="View">
                    <FaEye />
                  </button>
                  <button className="icon-btn copy-btn" onClick={() => copyFormLink(form.id)} title="Copy Link">
                    <FaCopy />
                  </button>
                </div>
              </div>
            )) : <p className="no-forms-text">No forms available</p>}
          </div>
        )}

      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button className="pagination-btn" onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
            <FaArrowLeft />
          </button>
          <span className="page-info">Page {page} of {totalPages}</span>
          <button className="pagination-btn" onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
            <FaArrowRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default FormPage;
