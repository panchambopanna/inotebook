import React from 'react'

export default function Alert(props) {
    const Capitalize = (type) => {
        const lower = type.toLowerCase();
        return (type.charAt(0).toUpperCase() + lower.slice(1));
    }
    return (
        <div style={{height: '50px'}}>
            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                <strong>{Capitalize(props.alert.type)}: </strong>{props.alert.message}
            </div>}
        </div>
    )
}
