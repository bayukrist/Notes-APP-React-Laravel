import { Modal } from "bootstrap";
import React, { useState } from "react";
import axios from "axios";

const Form = ({ selectedNote }) => {
    const [formTitle, setFormTitle] = useState('');
    const [formContent, setFormContent] = useState('');
    const [isNotif, setIsNotif] = useState(false);

    const handleSubmit = () => {
        if(formTitle && formContent){
            const data = {
                formTitle, formContent
            }
            //console.log(data)
            try{
                axios.post('/dashboard', data)
                setIsNotif(true);
                setFormContent('')
                setFormTitle('')
            }catch(error){
                console.log(error);
            }
            
        }
    }

    return (
        <div className="bg-white">
            <div>
                <button
                    type="button"
                    className="btn btn-md bg-primary text-white float-right px-5 py-2 mb-3"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                >
                    Add Note
                </button>

                <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1
                                    className="modal-title fs-5"
                                    id="exampleModalLabel"
                                >
                                    Add Note
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={(isNotif) => setIsNotif(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                { isNotif && <div className="alert alert-success" role="alert"> Data Submitted!</div>}
                            
                                <form>
                                    <div className="mb-3">
                                        <input
                                            className="form-control"
                                            id="title"
                                            type="text"
                                            placeholder="Title"
                                            onChange={(formTitle) => setFormTitle(formTitle.target.value)}
                                            value={formTitle}
                                            required
                                        ></input>
                                    </div>

                                    <div className="mb-3">
                                        <textarea
                                            className="form-control"
                                            id="content"
                                            rows="5"
                                            placeholder="Description"
                                            onChange={(formContent) => setFormContent(formContent.target.value)}
                                            value={formContent}
                                            required
                                        ></textarea>
                                    </div>

                                    {/* <div className="mb-3">
                                        <label
                                            for="formFile"
                                            className="form-label"
                                        >
                                            File ( Optional )
                                        </label>
                                        <input
                                            className="form-control"
                                            type="file"
                                            id="formFile"
                                        />
                                    </div> */}
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    onClick={(isNotif) => setIsNotif(false)}
                                >
                                    Close
                                </button>
                                <button type="button" className="btn btn-primary" onClick={() => handleSubmit()}>
                                    Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-3">
                <input
                    className="form-control"
                    id="titleView"
                    type="text"
                    placeholder="Title"
                    readOnly
                    value={selectedNote ? selectedNote.title : ""}
                />
            </div>

            <div className="mb-3">
                <textarea
                    className="form-control"
                    id="contentView"
                    rows="5"
                    placeholder="Description"
                    readOnly
                    value={selectedNote ? selectedNote.content : ""}
                ></textarea>
            </div>
        </div>
    );
};

export default Form;
