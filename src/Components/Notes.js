import React, { useContext } from 'react';
import noteContext from '../Context/Notes/noteContext'
import Noteitem from './Noteitem';

export default function Notes() {
    const context = useContext(noteContext);
    // eslint-disable-next-line
    const { notes, setNotes } = context;
    return (
        <div className='row my-3'>
            <h2>Your Notes</h2>

            {notes.map((notes) => {
                return <Noteitem key={notes._id} notes={notes}/>
            })}
        </div>
    )
}
