import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Alert, Spinner, InputGroup } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
    const { login, authError, authLoading, setAuthError, currentUser } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({ username: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [validated, setValidated] = useState(false);

    // Nếu đã đăng nhập thì chuyển thẳng sang movies
    useEffect(() => {
        if (currentUser) navigate('/movies', { replace: true });
    }, [currentUser, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (authError) setAuthError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidated(true);
        if (!form.username.trim() || !form.password.trim()) return;
        const result = await login(form.username.trim(), form.password);
        if (result.success) {
            navigate('/movies', { replace: true });
        }
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Container style={{ maxWidth: 440 }}>
                {/* Logo / Tiêu đề */}
                <div className="text-center mb-4">
                    <div style={{ fontSize: 64 }}>🎬</div>
                    <h2 className="text-white fw-bold mt-2">MovieManager</h2>
                    <p className="text-white-50">Đăng nhập để quản lý phim</p>
                </div>

                <Card className="shadow-lg border-0" style={{ borderRadius: 16 }}>
                    <Card.Body className="p-4">
                        <h5 className="fw-bold mb-4 text-center">Đăng nhập hệ thống</h5>

                        {authError && (
                            <Alert variant="danger" dismissible onClose={() => setAuthError('')}>
                                {authError}
                            </Alert>
                        )}

                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            {/* Username */}
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-semibold">
                                    👤 Tên đăng nhập
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    value={form.username}
                                    onChange={handleChange}
                                    placeholder="Nhập tên đăng nhập"
                                    required
                                    autoFocus
                                    size="lg"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Vui lòng nhập tên đăng nhập.
                                </Form.Control.Feedback>
                            </Form.Group>

                            {/* Password */}
                            <Form.Group className="mb-4">
                                <Form.Label className="fw-semibold">🔒 Mật khẩu</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        placeholder="Nhập mật khẩu"
                                        required
                                        size="lg"
                                    />
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => setShowPassword((v) => !v)}
                                        tabIndex={-1}
                                    >
                                        {showPassword ? '🙈' : '👁️'}
                                    </Button>
                                    <Form.Control.Feedback type="invalid">
                                        Vui lòng nhập mật khẩu.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>

                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                className="w-100 fw-bold"
                                disabled={authLoading}
                                style={{ borderRadius: 8 }}
                            >
                                {authLoading ? (
                                    <>
                                        <Spinner size="sm" animation="border" className="me-2" />
                                        Đang đăng nhập...
                                    </>
                                ) : (
                                    '🚀 Đăng nhập'
                                )}
                            </Button>
                        </Form>

                        {/* Gợi ý tài khoản demo */}
                        <hr className="my-4" />
                        <div className="text-muted small">
                            <strong>Tài khoản demo:</strong>
                            <ul className="mb-0 mt-1">
                                <li>admin / admin123 (Admin)</li>
                                <li>user1 / user123</li>
                                <li>user2 / user456</li>
                            </ul>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default LoginPage;
