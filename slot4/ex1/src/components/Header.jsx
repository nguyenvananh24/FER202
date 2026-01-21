import React, { useState } from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';

function Header() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Add your search logic here
  };

  // Inline styles
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
          {/* Logo/Brand */}
          <Navbar.Brand href="/" style={brandStyle}>
            Pizza House
          </Navbar.Brand>

          {/* Toggle button for mobile */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            {/* Navigation Links */}
            <Nav className="me-auto ms-5">
              <Nav.Link 
                href="/" 
                style={navLinkActiveStyle}
                onMouseEnter={(e) => e.target.style.color = navLinkHoverStyle.color}
                onMouseLeave={(e) => e.target.style.color = navLinkActiveStyle.color}
              >
                Home
              </Nav.Link>
              <Nav.Link 
                href="/about" 
                style={navLinkStyle}
                onMouseEnter={(e) => e.target.style.color = navLinkHoverStyle.color}
                onMouseLeave={(e) => e.target.style.color = navLinkStyle.color}
              >
                About Us
              </Nav.Link>
              <Nav.Link 
                href="/contact" 
                style={navLinkStyle}
                onMouseEnter={(e) => e.target.style.color = navLinkHoverStyle.color}
                onMouseLeave={(e) => e.target.style.color = navLinkStyle.color}
              >
                Contact
              </Nav.Link>
            </Nav>

            {/* Search Form */}
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
