import React, { useState } from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const headerStyle = {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    backgroundColor: '#2c2c2c'
  };

  const navbarStyle = {
    backgroundColor: '#2c2c2c',
    padding: '0.8rem 0',
    borderBottom: '1px solid #3a3a3a'
  };

  const containerStyle = {
    maxWidth: '1400px',
    margin: '0 auto'
  };

  const brandStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: '0.5px',
    marginLeft: '80px'
  };

  const navLinkStyle = {
    color: '#b8b8b8',
    fontSize: '1rem',
    fontWeight: '400',
    padding: '0.5rem 1.2rem'
  };

  const navLinkActiveStyle = {
    color: '#ffffff',
    fontSize: '1rem',
    fontWeight: '700',
    padding: '0.5rem 1.2rem'
  };

  const navLinkHoverStyle = {
    color: '#ffffff'
  };

  const searchFormStyle = {
    gap: 0,
    marginRight: '80px'
  };

  const searchInputStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #ddd',
    borderRadius: '4px 0 0 4px',
    padding: '0.5rem 1rem',
    width: '250px',
    borderRight: 'none',
    color: '#333'
  };

  const searchButtonStyle = {
    backgroundColor: '#dc3545',
    border: '1px solid #dc3545',
    borderRadius: '0 4px 4px 0',
    padding: '0.5rem 1rem',
    fontSize: '1rem'
  };

  return (
    <header style={headerStyle}>
      <Navbar bg="dark" variant="dark" expand="lg" style={navbarStyle}>
        <Container fluid className="px-4" style={containerStyle}>
          <Navbar.Brand 
            as={Link}
            to="/" 
            style={brandStyle}
          >
            Pizza House
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto ms-5">
              <Nav.Link 
                as={Link}
                to="/" 
                style={location.pathname === '/' ? navLinkActiveStyle : navLinkStyle}
                onMouseEnter={(e) => e.target.style.color = navLinkHoverStyle.color}
                onMouseLeave={(e) => e.target.style.color = location.pathname === '/' ? navLinkActiveStyle.color : navLinkStyle.color}
              >
                Home
              </Nav.Link>
              <Nav.Link 
                as={Link}
                to="/about" 
                style={location.pathname === '/about' ? navLinkActiveStyle : navLinkStyle}
                onMouseEnter={(e) => e.target.style.color = navLinkHoverStyle.color}
                onMouseLeave={(e) => e.target.style.color = location.pathname === '/about' ? navLinkActiveStyle.color : navLinkStyle.color}
              >
                About Us
              </Nav.Link>
              <Nav.Link 
                as={Link}
                to="/contact" 
                style={location.pathname === '/contact' ? navLinkActiveStyle : navLinkStyle}
                onMouseEnter={(e) => e.target.style.color = navLinkHoverStyle.color}
                onMouseLeave={(e) => e.target.style.color = location.pathname === '/contact' ? navLinkActiveStyle.color : navLinkStyle.color}
              >
                Contact
              </Nav.Link>
            </Nav>

            <Form className="d-flex" style={searchFormStyle} onSubmit={handleSearch}>
              <FormControl
                type="search"
                placeholder="Search"
                style={searchInputStyle}
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                variant="danger" 
                type="submit" 
                style={searchButtonStyle}
              >
                🔍
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
