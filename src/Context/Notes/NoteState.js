import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {

    const initialNotes = [
        {
          "_id": "6161ba7b05b9b8ac8894c057",
          "user": "61601bd8d3448fe6f750d1dd",
          "title": "New Updated title",
          "description": " New Updated description",
          "tag": "New Update",
          "date": "2021-10-09T15:51:23.333Z",
          "__v": 0
        },
        {
          "_id": "616559097e121e26ae5e7960",
          "user": "61601bd8d3448fe6f750d1dd",
          "title": "My Notes 2",
          "description": "Second Note for this example",
          "tag": "personal",
          "date": "2021-10-12T09:44:41.414Z",
          "__v": 0
        },
        {
          "_id": "6161ba7b05b9b7ac8894c057",
          "user": "61601bd8d3448fe6f750d1dd",
          "title": "New Updated title",
          "description": " New Updated description",
          "tag": "New Update",
          "date": "2021-10-09T15:51:23.333Z",
          "__v": 0
        },
        {
          "_id": "616559097e121e36ae5e7960",
          "user": "61601bd8d3448fe6f750d1dd",
          "title": "My Notes 2",
          "description": "Second Note for this example",
          "tag": "personal",
          "date": "2021-10-12T09:44:41.414Z",
          "__v": 0
        },
        {
          "_id": "6161ba7b05b9d8ac8894c057",
          "user": "61601bd8d3448fe6f750d1dd",
          "title": "New Updated title",
          "description": " New Updated description",
          "tag": "New Update",
          "date": "2021-10-09T15:51:23.333Z",
          "__v": 0
        },
        {
          "_id": "616559097e111e26ae5e7960",
          "user": "61601bd8d3448fe6f750d1dd",
          "title": "My Notes 2",
          "description": "Second Note for this example",
          "tag": "personal",
          "date": "2021-10-12T09:44:41.414Z",
          "__v": 0
        },
        {
          "_id": "6161ba7b05g9b8ac8894c057",
          "user": "61601bd8d3448fe6f750d1dd",
          "title": "New Updated title",
          "description": " New Updated description",
          "tag": "New Update",
          "date": "2021-10-09T15:51:23.333Z",
          "__v": 0
        },
        {
          "_id": "616559097e121g26ae5e7960",
          "user": "61601bd8d3448fe6f750d1dd",
          "title": "My Notes 2",
          "description": "Second Note for this example",
          "tag": "personal",
          "date": "2021-10-12T09:44:41.414Z",
          "__v": 0
        }
      ]

      const [notes, setNotes] = useState(initialNotes)

    return (
        <noteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;

