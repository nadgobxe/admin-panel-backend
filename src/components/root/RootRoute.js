import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Register from '../login/Register';
import ListItems from '../../pages/ListItems/ListItems';
import Dashboard from '../../pages/Dashboard/Dashboard';
import Login from '../login/Login';

const ProtectedRoute = ({ children, isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const RootRoute = ({ onLogin, onLogout, isLoggedIn }) => {
  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={onLogin} />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Dashboard onLogout={onLogout} isLoggedIn={isLoggedIn} />
          </ProtectedRoute>
        }
      />
       <Route
        path="/list-items"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <ListItems />
          </ProtectedRoute>
        }
      />
      {/* Redirect rule for unhandled paths */}
      <Route
        path="*"
        element={<Navigate to={isLoggedIn ? '/dashboard' : '/login'} replace />}
      />
    </Routes>
  );
};

export default RootRoute;