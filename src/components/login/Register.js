import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Register() {

    const [register, setRegister] = useState({
        email: '',
        password: ''
    })
    const [message, setMessage] = useState('');


    const registerCall = async (data) => {
        try {
            const response = await fetch('http://localhost:4001/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            console.log(result);
            if (response.ok) {
                setMessage('Registration successful!');
                setRegister({ email: '', password: '' }); // Clear form
            } else {
                setMessage(result.message || 'Registration failed.');
            }
        } catch (error) {
            setMessage('Failed to connect to the server.');
        }
    };
    

    const handleRegister = (e) => {
        e.preventDefault()
        console.log(register)
        registerCall(register)
    }

    return (
        <div>
            {message && <p>{message}</p>}
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="email" value={register.email} onChange={(e) => setRegister({ ...register, email: e.target.value })} />
                <input type="password" placeholder="password" value={register.password} onChange={(e) => setRegister({ ...register, password: e.target.value })} />
                <button type="submit">Register</button>
            </form>
            yes account? <Link to="/login">Login</Link>
        </div>
    )
}
