import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ModalConfirm from './ModalConfirm';
import { login } from '../redux/slices/authSlice';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { loading, error } = useSelector((s) => s.auth);

    const [errors, setError] = useState({ message: '' });
    const [showModal, setShowModal] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!username) newErrors.username = 'Username is required';
        if (!password) newErrors.password = 'Password is required';

        if (username && username.includes('@')) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(username)) {
                newErrors.username = 'Invalid email format';
            }
        }

        if (password && password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (Object.keys(newErrors).length > 0) {
            setError(newErrors);
            return;
        }

        const resultAction = await dispatch(login({ username, password }));
        if (login.fulfilled.match(resultAction)) {
            setShowModal(true);
            setTimeout(() => {
                setShowModal(false);
                navigate('/');
            }, 3000);
        } else {
            setError({ message: resultAction.payload || 'Login failed' });
        }
    };

    const handleCancel = () => {
        setUsername('');
        setPassword('');
    };

    const handleInputChange = (setter, field) => (e) => {
        setter(e.target.value);
        setError((prevErrors) => ({ ...prevErrors, [field]: '' }));
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <Card className="shadow-sm">
                        <Card.Header className="bg-white py-3">
                            <h3 className="text-center mb-0">Login</h3>
                        </Card.Header>
                        <Card.Body className="p-4">

                            {error && <Alert variant="danger">{error}</Alert>}
                            {errors.message && <Alert variant="danger">{errors.message}</Alert>}

                            <Form onSubmit={handleLogin}>
                                <Form.Group controlId="identifier" className="mb-3" noValidate>
                                    <Form.Label>Username or email</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter username or email"
                                        value={username}
                                        onChange={handleInputChange(setUsername, 'username')}
                                        disabled={loading}
                                        isInvalid={!!errors.username}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.username}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="password" className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={password}
                                        onChange={handleInputChange(setPassword, 'password')}
                                        placeholder="Enter password"
                                        disabled={loading}
                                        isInvalid={!!errors.password}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <div className="d-flex gap-2 mt-4">
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="flex-fill"
                                        disabled={loading}
                                    >
                                        {loading ? 'Logging in...' : 'Login'}
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        type="button"
                                        className="flex-fill"
                                        onClick={handleCancel}
                                        disabled={loading}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <ModalConfirm
                show={showModal}
                title="Login Successful"
                message="You have successfully logged in. Redirecting to dashboard..."
                onConfirm={() => setShowModal(false)}
                onCancel={() => setShowModal(false)}
            />
        </Container>
    );
}

export default LoginForm;
