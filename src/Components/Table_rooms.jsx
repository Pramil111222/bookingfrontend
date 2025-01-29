import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

const Table = ({ data, columns, onAdd, btnName, onEdit, onDelete }) => {
    const [tableData, setTableData] = useState(data);
    const [tableColumns, setTableColumns] = useState(columns);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    useEffect(() => {
        setTableData(data);
    }, [data]);

    useEffect(() => {
        setTableColumns(columns);
    }, [columns]);

    // Filter data based on search query
    const filteredData = tableData.filter((datum) =>
        Object.values(datum).some((item) =>
            item != null && item.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const currentItems = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="container-fluid p-2">
            <div className="row mb-2">
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </div>

                <div className="col-md-6 d-flex justify-content-end">
                    <button className="btn btn-primary" onClick={onAdd}>
                        {btnName}
                    </button>
                </div>
            </div>

            <div className="mt-4">
                <div className="col-md-12">
                    <table className="table table-hover table-responsive">
                        <thead>
                            <tr>
                                {tableColumns.map((colName, colIndex) => (
                                    <th key={colIndex}>{colName}</th>
                                ))}
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((datum, rowIndex) => (
                                <tr key={datum.id || rowIndex}>
                                    <td>{rowIndex + 1}</td>
                                    <td>{datum.room_number}</td> {/* Correctly mapped room_number */}
                                    <td>{datum.room_description}</td>
                                    <td>{datum.booking_status}</td>
                                    <td>{datum.room_type}</td>   {/* Correctly mapped room_type */}
                                    <td>
                                        <button
                                            className="btn btn-warning btn-sm mr-2"
                                            onClick={() => onEdit(datum)}
                                        >
                                            <MdEdit />
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => onDelete(datum)}
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {totalPages > 1 && (
                <div className="row mt-2 justify-content-center">
                    <div className="col-md-12">
                        <ul className="pagination justify-content-center custom-pagination">
                            <li
                                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                >
                                    Previous
                                </button>
                            </li>
                            {[...Array(totalPages)].map((_, index) => (
                                <li
                                    key={index}
                                    className={`page-item ${index + 1 === currentPage ? "active" : ""}`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            <li
                                className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Table;
