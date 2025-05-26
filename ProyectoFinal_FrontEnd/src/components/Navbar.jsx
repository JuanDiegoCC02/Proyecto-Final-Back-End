import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import "../styles/Navbar.css"


function NavBar() {
            /*en el primer navbar estaba className="bg-body-tertiary">*/
  return (
            
    <Navbar collapseOnSelect expand="lg" className="ContainerNavbar">
      <Container className='MainContainerNavbar'>
        <Navbar.Brand href="/">IMG</Navbar.Brand>
        <Navbar.Brand href="/">Costa Rica</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Noticias</Nav.Link>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/contacto">Contacto</Nav.Link>
            <NavDropdown title="ion kno" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="/inicio">LogIn</Nav.Link>
            <Nav.Link eventKey={2} href="/registro">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;