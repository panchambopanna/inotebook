import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {

    const [state, setState] = useState({
        name: "Pancham",
        class: "5b"
    })

    const update = () => {
        setInterval(() => {
            setState({
                name: "Bopanna",
                class: "10c"
            })
        }, 2000);
    }

    return (
        <noteContext.Provider value={{state, update}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;

