import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import expenseService from '../services/api';
import { useAuth } from '../contexts/AuthContext';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [alertMsg, setAlertMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = 'Username is required.';
    if (!password.trim()) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAlertMsg('');

    if (!username.trim() && !password.trim()) {
      setAlertMsg('Username and password are required');
      setErrors({ username: 'Username is required.', password: 'Password is required.' });
      return;
    }

    if (!validate()) return;

    setLoading(true);
    try {
      const res = await expenseService.getUsers();
      const user = res.data.find(
        (u) => u.username === username && u.password === password
      );
      if (!user) {
        setAlertMsg('Invalid username or password!');
        return;
      }
      login(user);
      navigate('/home');
    } catch {
      setAlertMsg('Cannot connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{ background: '#fff' }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 360,
          padding: '36px 32px',
          border: '1px solid #dee2e6',
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
          background: '#fff',
        }}
      >
        {/* Title */}
        <h2 className="text-center fw-bold mb-4" style={{ fontSize: '2rem' }}>
          Login
        </h2>

        {/* Alert */}
        {alertMsg && (
          <Alert
            variant="danger"
            onClose={() => setAlertMsg('')}
            style={{
              background: '#fce4e4',
              border: '1px solid #f5c2c7',
              color: '#842029',
              borderRadius: 6,
              fontSize: '0.9rem',
              padding: '10px 14px',
            }}
          >
            {alertMsg}
          </Alert>
        )}

        <Form onSubmit={handleLogin} noValidate>
          {/* Username */}
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: 500, fontSize: '0.95rem' }}>
              Username
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setErrors((p) => ({ ...p, username: '' })); }}
              isInvalid={!!errors.username}
              style={{ borderRadius: 6 }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-1">
            <Form.Label style={{ fontWeight: 500, fontSize: '0.95rem' }}>
              Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="••••••"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: '' })); }}
              isInvalid={!!errors.password}
              style={{ borderRadius: 6 }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="mb-4" style={{ fontSize: '0.82rem', color: '#6c757d' }}>
            (at least 6 characters)
          </div>

          {/* Login button */}
          <Button
            type="submit"
            variant="primary"
            className="w-100"
            disabled={loading}
            style={{ borderRadius: 6, padding: '10px 0', fontWeight: 500 }}
          >
            {loading ? 'Signing in...' : 'Login'}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
