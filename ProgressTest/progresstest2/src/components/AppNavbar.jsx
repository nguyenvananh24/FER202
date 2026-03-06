import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { FiLogOut } from 'react-icons/fi';
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
      style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
      variant="dark"
      className="px-3 shadow"
    >
      <Navbar.Brand className="fw-bold fs-5 d-flex align-items-center">
        <img
          src="/logo.jpg"
          alt="PersonalBudget logo"
          width={36}
          height={36}
          className="me-2 rounded-circle"
          style={{ objectFit: 'cover' }}
        />
        PersonalBudget
      </Navbar.Brand>
      <Nav className="ms-auto align-items-center gap-2">
        {loggedUser && (
          <Nav.Item className="text-white">
            Signed in as <span className="fw-bold">{loggedUser.fullName}</span>
          </Nav.Item>
        )}
        <Button variant="outline-light" size="sm" onClick={handleLogout}>
          <FiLogOut className="me-1" />
          Logout
        </Button>
      </Nav>
    </Navbar>
  );
}

export default AppNavbar;
