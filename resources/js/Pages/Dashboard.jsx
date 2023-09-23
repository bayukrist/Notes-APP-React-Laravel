import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import NotesList from "./NotesList";
import Form from "./Form";
import axios from "axios";

export default function Dashboard({ auth, notes }) {
    const [selectedNote, setSelectedNote] = useState(null);
    const [dashboardNotes, setDashboardNotes] = useState(notes);
    const [doneFilter, setDoneFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
                try {
                  const data = {
                    doneFilter
                  }
                  axios.get("/notes/"+doneFilter).then(
                    response => {
                        setDashboardNotes(response.data);
                    }
                  );
                  
                } catch (error) {
                  console.error('Terjadi kesalahan:', error);
                }

    }, [notes, doneFilter]);

    const handleNoteClick = (note) => {
        setSelectedNote(note);
    };

    const handleFilter = (typeFilter) => {
        setDoneFilter(typeFilter);
        setCurrentPage(1);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Notes APP" />

            <div className="container py-6">
                <div className="row">
                    <div className="col-md-6 bg-white px-12 py-6 mx-3">
                        <Form selectedNote={selectedNote} />
                    </div>

                    <div className="col-md-5 bg-white py-6 px-12">
                        <ul className="nav nav-underline mb-3">
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    aria-current="page"
                                    href="#"
                                    onClick={() => handleFilter('all')}
                                >
                                    All
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={() => handleFilter('done')}>
                                    Finished
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={() => handleFilter('not done')}> 
                                    Unfinished
                                </a>
                            </li>
                        </ul>

                        <NotesList
                            currentPage = {currentPage}
                            setCurrentPage ={setCurrentPage}
                            notes={dashboardNotes}
                            handleNoteClick={handleNoteClick}
                        />

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
