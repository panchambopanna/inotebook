import React, { useContext } from 'react';
import noteContext from '../Context/Notes/noteContext';

export default function Noteitem(props) {

    const { notes, updateNote, showAlert } = props;

    const context = useContext(noteContext);
    const { deleteNote} = context;

    return (
        <div className="col-md-3">
            <div className="card  my-3">
                <div className="card-body">
                    <h5 className="card-title">{notes.title}</h5>
                    <p className="card-text">{notes.description}</p>
                    <p className="card-text"><small className="text-muted"><i>{notes.tag}</i></small></p>
                    <div className="container" style={{textAlign:'right'}}>
                        <i className="fas fa-pencil-alt mx-3" onClick={()=>{updateNote(notes)}} style={{cursor:'pointer'}}></i>
                        <i className="fas fa-trash" onClick={()=>{deleteNote(notes._id); showAlert('Note has been deleted', 'success');}} style={{cursor:'pointer'}}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}
