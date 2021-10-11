import React from 'react';
import { useContext, useEffect } from 'react';
import noteContext from '../Context/noteContext';

export default function About() {

    const a = useContext(noteContext);
    useEffect(() => {
        return () => {
            a.update();
        } // eslint-disable-next-line
    }, [])

    return (
        <div>
            <h3>This is About {a.state.name} and is in {a.state.class}</h3>
        </div>
    )
}
