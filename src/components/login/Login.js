import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState(''); // Renamed for clarity
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(process.env.REACT_APP_LOGIN_URL || 'http://localhost:4001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      console.log(email, password)
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate('/dashboard', { state: { user: data } }); // Pass user data as props
        onLogin();
      } else {
        const errorData = await response.json();
        console.error('Login error:', errorData);
        alert(errorData.message || 'Login failed. Try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login. Please try again.');
    }
  };


  return (
    <>
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
    no account? <Link to="/register">Register</Link>
    </>
  );
};

export default Login;
