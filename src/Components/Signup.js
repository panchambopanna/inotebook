import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

export default function Signup() {

    let history = useHistory();

    const [credentials, setCredentials] = useState({ name: null, email: null, password: null, rpassword: null });

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let success;
        if (credentials.password === credentials.rpassword) {
            success = true;
        } else {
            success = false;
        }

        if (success) {
            const response = await fetch('http://localhost:5000/api/auth/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
            });
            const json = await response.json();
            console.log(json);

            if (json.success) {
                //save auth token in local storage and redirect
                localStorage.setItem('auth', json.authtoken);
                history.push('/')
            } else {
                alert(json.error);
            }
        }

    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' aria-describedby="nameHelp" onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' aria-describedby="passHelp" onChange={onChange} required minLength={8}/>
                    <div id="passHelp" className="form-text">Must be 8 - 20 characters long</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="rpassword" className="form-label" >Confirm Password</label>
                    <input type="password" className="form-control" id="rpassword" name='rpassword' onChange={onChange} required minLength={8}/>
                </div>
                <button type="submit" className="btn btn-primary">Sign Up!</button>
            </form>
        </div>
    )
}
