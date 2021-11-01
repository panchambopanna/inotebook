import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {

  const host = "http://localhost:5000/";

  const initialNotes = []

  const [notes, setNotes] = useState(initialNotes)

  //Get all notes
  const getNotes = async () => {

    //API to fetch note
    const url = `${host}api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth')
      }
    });

    const json = await response.json();
    setNotes(json);
  }

  //Add a note
  const addNote = async (title, description, tag) => {

    //API to add note
    const url = `${host}api/notes/addnote`;
    // eslint-disable-next-line
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    const note = JSON.parse(JSON.stringify(json)); //this convert the response into the format shown bellow

    // const note = {
    //   "_id": "616559097e122e26ae5e7960",
    //   "user": "61601bd8d3448fe6f750d1dd",
    //   "title": title,
    //   "description": description,
    //   "tag": tag,
    //   "date": "2021-10-12T09:44:41.414Z",
    //   "__v": 0
    // };
    setNotes(notes.concat(note));
  }

  //Delete a note
  const deleteNote = async (id) => {
    //API to add note
    const url = `${host}api/notes/deletenote/${id}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth')
      },
      body: JSON.stringify()
    });
    const json = await response.json();
    console.log(json);

    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }

  //Update a note
  const editNote = async (id, title, description, tag) => {
    //API CALL

    const url = `${host}api/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth')
      },
      body: JSON.stringify({ title, description, tag })
    });    
    // eslint-disable-next-line
    const json = await response.json();

    //getNotes();  this will simply call the DB and get the notes from there 

    //Or we can just update it ont he client side using the following logic and not call the DB again
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);

  }

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;

