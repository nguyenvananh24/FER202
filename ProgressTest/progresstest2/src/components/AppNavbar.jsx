import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function AppNavbar() {
  const navigate = useNavigate();
  const { loggedUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar
      bg="white"
      variant="light"
      className="px-4 shadow-sm border-bottom"
      style={{ minHeight: 56 }}
    >
      <Navbar.Brand className="fw-bold fs-5 d-flex align-items-center text-dark">
        <img
          src="/logo.jpg"
          alt="PersonalBudget logo"
          width={32}
          height={32}
          className="me-2 rounded-circle"
          style={{ objectFit: 'cover' }}
        />
        PersonalBudget
      </Navbar.Brand>
      <Nav className="ms-auto align-items-center gap-2">
        {loggedUser && (
          <Nav.Item className="text-secondary" style={{ fontSize: '0.93rem' }}>
            Signed in as <span className="fw-bold text-dark">{loggedUser.fullName}</span>
          </Nav.Item>
        )}
        <Button variant="outline-danger" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </Nav>
    </Navbar>
  );
}

export default AppNavbar;
