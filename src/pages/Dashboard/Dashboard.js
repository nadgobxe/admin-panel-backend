import React from 'react'
import { useLocation } from 'react-router-dom';
import Header from '../../components/header/Header';
import RootRoute from '../../components/root/RootRoute';

export default function Dashboard({  onLogout, isLoggedIn }) {
    const location = useLocation();
    const user = location.state?.user;

    return (
        <div>
           
            <h1>Dashboard</h1>
            {user && (
                <div>
                    <p>Welcome, {user.user.username}!</p>
                    {/* Render other user data */}
                </div>
            )}
            {isLoggedIn ? <button onClick={onLogout}>Logout</button> : null}
            <Header />
        </div>
    )
}
