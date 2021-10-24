import React, {useContext} from 'react';
import noteContext from '../Context/Notes/noteContext'

export default function Home() {

    const context = useContext(noteContext);
    // eslint-disable-next-line
    const {notes, setNotes} = context;
    return (
        <>
        <div className="container my-3">
            <h2 className='my-3'>Add a note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <h2 className='my-3'>Your Notes</h2>
            
            {notes.map((notes)=>{
                return notes.title
            })}
            
            </div>
        </>
    )
}
