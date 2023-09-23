import React, { useState } from "react";

const isNotes = (
    notes,
    handleNoteClick,
    handleEditClick,
    handleDeleteClick,
    currentPage,
    itemsPerPage
) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedNotes = notes.slice(startIndex, endIndex);

    return paginatedNotes.map((data) => (
        <div
            key={data.id}
            style={{ cursor: "pointer" }}
            className="mb-2 card px-2 py-2"
            onClick={() => handleNoteClick(data)}
        >
            <table>
                <tbody>
                    <tr>
                        <td width="80%">{data.title}</td>
                        <td>
                            <button
                                data-bs-toggle="modal"
                                className="btn btn-sm btn-primary"
                                data-bs-target="#exampleModal2"
                                disabled={data.done === 1}
                                onClick={() => handleEditClick(data)}
                            >
                                edit
                            </button>
                        </td>
                        <td>
                            <button
                                data-bs-toggle="modal"
                                className="btn btn-sm btn-danger"
                                data-bs-target="#exampleModal3"
                                onClick={() => handleDeleteClick(data)}
                            >
                                delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    ));
};

const noNotes = () => {
    return <div>Notes is empty</div>;
};

const NotesList = ({ notes, handleNoteClick, currentPage, setCurrentPage }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isNotif, setIsNotif] = useState(false);
    const [formTitle, setFormTitle] = useState("");
    const [formContent, setFormContent] = useState("");
    const [noteId, setNoteId] = useState(null);
    const [isDoneChecked, setIsDoneChecked] = useState(false);
    const itemsPerPage = 5;
    const totalItems = notes.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const handlePrevPageClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPageClick = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    const renderPageButtons = () => {
        const pageButtons = [];
        for (let i = 1; i <= totalPages; i++) {
            pageButtons.push(
                <li key={i} className="page-item">
                    <a
                        onClick={() => handlePageClick(i)}
                        className={
                            currentPage === i ? "active page-link" : "page-link"
                        }
                    >
                        {i}
                    </a>
                </li>
            );
        }
        return pageButtons;
    };

    const handleDoneCheckboxChange = (event) => {
        setIsDoneChecked(event.target.checked);
    };

    const handleEditClick = (data) => {
        setFormTitle(data.title);
        setFormContent(data.content);
        setNoteId(data.id);
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (data) => {
        setNoteId(data.id);
        setIsDeleteModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setIsDoneChecked(false);
        setIsNotif(false);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const handleSubmit = () => {
        if (formTitle && formContent) {
            const done = isDoneChecked ? 1 : 0;
            const data = {
                formTitle,
                formContent,
                noteId,
                done,
            };
            try {
                axios.put("/dashboard", data).then((response) => {
                    setIsNotif(true);
                });
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleDeleteSubmit = () => {
        const data = {
            noteId,
        };
        console.log(data);
        axios
            .post(`/deleteNote`, data)
            .then((response) => {
                console.log("Note deleted successfully:", noteId);
            })
            .catch((error) => {
                console.error("Error deleting note:", error);
            });
    };

    return (
        <div>
            {totalItems > 0 ? isNotes(
                notes,
                handleNoteClick,
                handleEditClick,
                handleDeleteClick,
                currentPage,
                itemsPerPage
            ) : noNotes()}

            {isEditModalOpen && (
                <div
                    className="modal fade"
                    id="exampleModal2"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel2"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1
                                    className="modal-title fs-5"
                                    id="exampleModalLabel2"
                                >
                                    Edit Note
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={handleCloseEditModal}
                                ></button>
                            </div>
                            <div className="modal-body">
                                {isNotif && (
                                    <div
                                        className="alert alert-success"
                                        role="alert"
                                    >
                                        {" "}
                                        Data Edited!
                                    </div>
                                )}
                                <form>
                                    <div className="mb-3">
                                        <input
                                            className="form-control"
                                            id="title"
                                            type="text"
                                            placeholder="Title"
                                            defaultValue={formTitle} // Set nilai default dari data yang akan diedit
                                            onChange={(formTitle) =>
                                                setFormTitle(
                                                    formTitle.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <textarea
                                            className="form-control"
                                            id="content"
                                            rows="5"
                                            placeholder="Description"
                                            defaultValue={formContent} // Set nilai default dari data yang akan diedit
                                            onChange={(formContent) =>
                                                setFormContent(
                                                    formContent.target.value
                                                )
                                            }
                                        ></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="checkbox"
                                            class="form-check-input"
                                            id="doneForm"
                                            checked={isDoneChecked}
                                            onChange={handleDoneCheckboxChange}
                                        />
                                        <label
                                            class="form-check-label ms-2"
                                            for="doneForm"
                                        >
                                            Done
                                        </label>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    onClick={handleCloseEditModal}
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => handleSubmit()}
                                >
                                    Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isDeleteModalOpen && (
                <div
                    className="modal fade"
                    id="exampleModal3"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel3"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1
                                    className="modal-title fs-5"
                                    id="exampleModalLabel2"
                                >
                                    Delete Note
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={handleCloseDeleteModal}
                                ></button>
                            </div>
                            <div className="modal-body">Are you sure?</div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-bs-dismiss="modal"
                                    onClick={() => handleDeleteSubmit()}
                                >
                                    Yes
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    onClick={handleCloseDeleteModal}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <nav aria-label="Page navigation example">
                <ul className="pagination  float-right mt-2">
                    <li className="page-item">
                        <a
                            className="page-link"
                            href="#"
                            aria-label="Previous"
                            disabled={currentPage === 1}
                            onClick={handlePrevPageClick}
                        >
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>

                    {renderPageButtons()}
                    
                    <li className="page-item">
                        <a
                            className="page-link"
                            href="#"
                            aria-label="Next"
                            disabled={currentPage === totalPages}
                            onClick={handleNextPageClick}
                        >
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default NotesList;
