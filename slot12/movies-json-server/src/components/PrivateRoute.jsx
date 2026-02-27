import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * Bọc các route cần đăng nhập.
 * Nếu chưa đăng nhập → chuyển về /login.
 */
const PrivateRoute = ({ children }) => {
    const { currentUser } = useAuth();
    return currentUser ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
