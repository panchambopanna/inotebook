import React, { useContext, useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import noteContext from '../Context/Notes/noteContext'
import Addnote from './Addnote';
import Noteitem from './Noteitem';

export default function Notes(props) {
    let history = useHistory();
    const context = useContext(noteContext);
    // eslint-disable-next-line
    const { notes, getNotes, editNote } = context;
    const {showAlert} = props;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    useEffect(() => {
        if(localStorage.getItem('auth')){
            getNotes();
        }else{
            history.push('/login')
        }
        
        // eslint-disable-next-line
    }, []);

    const ref = useRef(null);
    const refClose = useRef(null);

    const updateNote = (currentvalue) => {
        ref.current.click();
        setNote(currentvalue);
    }

    const handleClick = (e) => {
        e.preventDefault();
        editNote(note._id, note.title, note.description, note.tag);
        showAlert('Note has been updated', 'success');  //set alert message
        ref.current.click();
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <>
            <Addnote showAlert={showAlert}/>

            {/* Modal start */}
            {/* Button trigger modal */}
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* Start: Form with tile, description and tag */}
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name="title" onChange={onChange} value={note.title}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description" name="description" onChange={onChange} value={note.description}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={note.tag} />
                                </div>
                            </form>
                            {/* End: Form with tile, description and tag */}
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                            <button disabled={note.title.length===0 || note.description.length===0} type="button" className="btn btn-success" onClick={handleClick}>Update Notes</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal Ends */}

            <div className='row my-3'>
                <h2>Your Notes</h2>

                <div className="container my-2">
                    {notes.length===0 && 'No notes to display'}
                </div>

                {notes.map((notes) => {
                    return <Noteitem key={notes._id} updateNote={updateNote} notes={notes} showAlert={showAlert} />
                })}
            </div>
        </>
    )
}
