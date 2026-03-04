import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function PrivateRoute({ children }) {
  const { loggedUser } = useAuth();
  return loggedUser ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;
