import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

export default function Login(props) {

    const history = useHistory();

    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const handleClick = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:5000/api/auth/loginUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);

        if(json.success){
            //save auth token in local storage and redirect
            localStorage.setItem('auth',json.authtoken);
            history.push('/')
            props.showAlert('Logged in successfully', 'success')
        }else{
            props.showAlert('Invalid Credentials', 'danger')
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div>
            <form onSubmit={handleClick}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} required/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
