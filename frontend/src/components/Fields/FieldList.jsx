import React, { useEffect, useState } from "react";
import { fetchFieldsWithPagination } from "../../services/formService";
import "../../styles/FieldList.css";

const FieldList = () => {
    const [fields, setFields] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchFields = async (currentPage) => {
        setLoading(true);
        try {
            const limit = 10; // Items per page
            const response = await fetchFieldsWithPagination(currentPage, limit);
            setFields(response.fields);
            setPage(response.page);
            setTotalPages(response.pages);
        } catch (error) {
            console.error("Error fetching fields:", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFields(page);
    }, [page]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div className="field-list-container">
            <h2>Form Fields</h2>
            {loading ? (
                <p className="loading">Loading fields...</p>
            ) : (
                <>
                    <table className="field-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fields.length > 0 ? (
                                fields.map((field) => (
                                    <tr key={field.id}>
                                        <td>{field.name}</td>
                                        <td>{field.type}</td>
                                        <td>{field.description}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="no-fields">No fields found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="pagination">
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}
                            className="pagination-button"
                        >
                            Previous
                        </button>
                        <span className="pagination-info">
                            Page {page} of {totalPages}
                        </span>
                        <button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page === totalPages}
                            className="pagination-button"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default FieldList;
