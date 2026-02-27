import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavbarMenu() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>useContext Lab</Navbar.Brand>
        <Nav>
          <Nav.Link as={Link} to="/">Exercise 1</Nav.Link>
          <Nav.Link as={Link} to="/login">Exercise 2</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarMenu;