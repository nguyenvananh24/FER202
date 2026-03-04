import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import AccountListPage from '../pages/AccountListPage';
import AccountDetailPage from '../pages/AccountDetailPage';
import PrivateRoute from './PrivateRoute';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/accounts"
        element={
          <PrivateRoute>
            <AccountListPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/accounts/:id"
        element={
          <PrivateRoute>
            <AccountDetailPage />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;
