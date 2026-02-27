import React from 'react';
import { Navbar, Nav, Container, Button, Image, Badge, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login', { replace: true });
    };

    return (
        <Navbar
            expand="lg"
            style={{
                background: 'linear-gradient(90deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.4)',
            }}
            variant="dark"
            sticky="top"
        >
            <Container>
                {/* Brand */}
                <Navbar.Brand
                    onClick={() => navigate('/movies')}
                    style={{ cursor: 'pointer', fontWeight: 700, fontSize: 22 }}
                >
                    🎬 MovieManager
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    {/* Nav links */}
                    <Nav className="me-auto">
                        <Nav.Link
                            onClick={() => navigate('/movies')}
                            className="text-white-75 fw-semibold"
                        >
                            🎥 Danh sách phim
                        </Nav.Link>
                    </Nav>

                    {/* User info */}
                    {currentUser ? (
                        <div className="d-flex align-items-center gap-3">
                            {/* Role badge */}
                            <Badge
                                bg={currentUser.role === 'admin' ? 'warning' : 'info'}
                                text={currentUser.role === 'admin' ? 'dark' : 'white'}
                                className="px-2 py-1"
                            >
                                {currentUser.role === 'admin' ? '👑 Admin' : '👤 User'}
                            </Badge>

                            {/* Dropdown avatar + thông tin */}
                            <Dropdown align="end">
                                <Dropdown.Toggle
                                    variant="link"
                                    className="p-0 border-0 text-decoration-none d-flex align-items-center gap-2"
                                    id="user-dropdown"
                                >
                                    <Image
                                        src={currentUser.avatar}
                                        alt={currentUser.fullName}
                                        roundedCircle
                                        style={{
                                            width: 38,
                                            height: 38,
                                            objectFit: 'cover',
                                            border: '2px solid #fff',
                                        }}
                                        onError={(e) => {
                                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.fullName)}&background=0D8ABC&color=fff`;
                                        }}
                                    />
                                    <span className="text-white fw-semibold d-none d-md-inline">
                                        {currentUser.fullName}
                                    </span>
                                </Dropdown.Toggle>

                                <Dropdown.Menu style={{ minWidth: 240 }}>
                                    {/* Thông tin chi tiết */}
                                    <Dropdown.ItemText>
                                        <div className="d-flex align-items-center gap-2 py-1">
                                            <Image
                                                src={currentUser.avatar}
                                                roundedCircle
                                                style={{ width: 44, height: 44, objectFit: 'cover' }}
                                                onError={(e) => {
                                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.fullName)}&background=0D8ABC&color=fff`;
                                                }}
                                            />
                                            <div>
                                                <div className="fw-bold">{currentUser.fullName}</div>
                                                <div className="text-muted small">{currentUser.email}</div>
                                                <Badge
                                                    bg={currentUser.role === 'admin' ? 'warning' : 'info'}
                                                    text={currentUser.role === 'admin' ? 'dark' : 'white'}
                                                    className="mt-1"
                                                >
                                                    {currentUser.role === 'admin' ? '👑 Admin' : '👤 User'}
                                                </Badge>
                                            </div>
                                        </div>
                                    </Dropdown.ItemText>
                                    <Dropdown.Divider />
                                    <Dropdown.Item>
                                        <span className="text-muted small">
                                            🔑 Username: <strong>{currentUser.username}</strong>
                                        </span>
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item
                                        onClick={handleLogout}
                                        className="text-danger fw-semibold"
                                    >
                                        🚪 Đăng xuất
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    ) : (
                        <Button
                            variant="outline-light"
                            size="sm"
                            onClick={() => navigate('/login')}
                        >
                            🔑 Đăng nhập
                        </Button>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
