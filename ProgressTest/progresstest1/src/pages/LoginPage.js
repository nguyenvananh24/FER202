import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiLock, FiLogIn } from 'react-icons/fi';
import accountService from '../services/accountService';
import { useAuth } from '../contexts/AuthContext';
import MessageModal from '../components/MessageModal';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [alertMsg, setAlertMsg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [loggedAccount, setLoggedAccount] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!usernameOrEmail.trim()) {
      newErrors.usernameOrEmail = 'Username or Email is required.';
    }
    if (!password.trim()) {
      newErrors.password = 'Password is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAlertMsg('');
    if (!validate()) return;

    try {
      const res = await accountService.getAll();
      const accounts = res.data;

      const account = accounts.find(
        (acc) =>
          (acc.username === usernameOrEmail || acc.email === usernameOrEmail) &&
          acc.password === password
      );

      if (!account) {
        setAlertMsg('Invalid username/email or password!');
        return;
      }

      if (account.role !== 'admin') {
        setAlertMsg('Access denied. Only admin users can log in.');
        return;
      }

      if (account.status === 'locked') {
        setAlertMsg('Account is locked. Please contact admin.');
        return;
      }

      // Success
      setLoggedAccount(account);
      setWelcomeMessage(`Welcome, ${account.username}! Login successful.`);
      setShowModal(true);
    } catch (err) {
      setAlertMsg('Cannot connect to server. Please try again.');
    }
  };

  const handleContinue = () => {
    login(loggedAccount);
    setShowModal(false);
    navigate('/accounts');
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
                  <div
                    className="rounded-circle bg-primary d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: 64, height: 64 }}
                  >
                    <FiLogIn size={28} color="white" />
                  </div>
                  <h3 className="fw-bold">Account Management</h3>
                  <p className="text-muted">Sign in to continue</p>
                </div>

                {alertMsg && (
                  <Alert variant="danger" onClose={() => setAlertMsg('')} dismissible>
                    {alertMsg}
                  </Alert>
                )}

                <Form onSubmit={handleLogin} noValidate>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Username or Email</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <FiUser />
                      </span>
                      <Form.Control
                        type="text"
                        placeholder="Enter username or email"
                        value={usernameOrEmail}
                        onChange={(e) => setUsernameOrEmail(e.target.value)}
                        isInvalid={!!errors.usernameOrEmail}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.usernameOrEmail}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">Password</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">
                        <FiLock />
                      </span>
                      <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        isInvalid={!!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </div>
                  </Form.Group>

                  <div className="d-grid">
                    <Button variant="primary" type="submit" size="lg" className="rounded-3">
                      <FiLogIn className="me-2" />
                      Login
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <MessageModal
        show={showModal}
        message={welcomeMessage}
        onContinue={handleContinue}
      />
    </div>
  );
}

export default LoginPage;
