import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiLock, FiLogIn } from 'react-icons/fi';

import expenseService from '../services/expenseService';
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
      setAlertMsg('Username and password are required.');
      setErrors({ username: 'Username is required.', password: 'Password is required.' });
      return;
    }

    if (!validate()) return;

    setLoading(true);
    try {
      const res = await expenseService.getUsers();
      const users = res.data;

      const user = users.find(
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
      style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={7} lg={5}>
            <Card className="shadow-lg border-0 rounded-4">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <img
                    src="/logo.jpg"
                    alt="PersonalBudget logo"
                    width={90}
                    height={90}
                    className="rounded-circle shadow mb-3"
                    style={{ objectFit: 'cover', border: '3px solid #667eea' }}
                  />
                  <h3 className="fw-bold">Personal Budget</h3>
                  <p className="text-muted">Sign in to manage your expenses</p>
                </div>

                {alertMsg && (
                  <Alert variant="danger" onClose={() => setAlertMsg('')} dismissible>
                    {alertMsg}
                  </Alert>
                )}

                <Form onSubmit={handleLogin} noValidate>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">
                      <FiUser className="me-2" />
                      Username
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      isInvalid={!!errors.username}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.username}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">
                      <FiLock className="me-2" />
                      Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password (at least 6 characters)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-100 py-2 fw-semibold"
                    disabled={loading}
                  >
                    {loading ? 'Signing in...' : (
                      <>
                        <FiLogIn className="me-2" />
                        Login
                      </>
                    )}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LoginPage;
