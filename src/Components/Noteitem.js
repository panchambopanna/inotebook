import React from 'react';

export default function Noteitem(props) {

    const { notes } = props;

    return (
        <div className="col-md-3">
            <div className="card  my-3">
                <div className="card-body">
                    <h5 className="card-title">{notes.title}</h5>
                    <p className="card-text">{notes.description}</p>
                    <div className="container" style={{textAlign:'right'}}>
                        <i className="fas fa-pencil-alt mx-3" style={{cursor:'pointer'}}></i>
                        <i className="fas fa-trash" style={{cursor:'pointer'}}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}
