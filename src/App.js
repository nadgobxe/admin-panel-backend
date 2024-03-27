import React, { useState } from 'react';
import RootRoute from './components/root/RootRoute';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const logIn = () => setIsLoggedIn(true);

  const logOut = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_LOGOUT_URL || 'http://localhost:4001/api/users/logout', { // Use environment variable
      method: 'GET',
      credentials: 'include', // Important for cookies
      });
      console.log(response);

      if (response.ok) {
        setIsLoggedIn(false);
        navigate('/login'); // Redirect to the login page after successful logout
      } else {
        alert('Logout failed. Try again.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <RootRoute onLogin={logIn} onLogout={logOut} isLoggedIn={isLoggedIn} />
  );
};

export default App;
