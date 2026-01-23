import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function NavigationBar() {
  const navbarStyle = {
    backgroundColor: '#2c3e50',
    padding: '15px 0'
  };

  const brandStyle = {
    fontWeight: '700',
    fontSize: '1.5rem',
    color: '#ecf0f1'
  };

  const navLinkStyle = {
    fontSize: '1.1rem',
    fontWeight: '500',
    margin: '0 10px',
    padding: '8px 16px',
    borderRadius: '20px',
    transition: 'all 0.3s ease'
  };

  return (
    <Navbar style={navbarStyle} variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#" style={brandStyle}>
          ✈️ Flight Booking System
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/">
              <Nav.Link style={navLinkStyle}>
                🎫 Flight Booking
              </Nav.Link>
            </LinkContainer>
            
            <LinkContainer to="/login">
              <Nav.Link style={navLinkStyle}>
                🔐 Login
              </Nav.Link>
            </LinkContainer>
            
            <LinkContainer to="/users">
              <Nav.Link style={navLinkStyle}>
                👥 User Management
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;