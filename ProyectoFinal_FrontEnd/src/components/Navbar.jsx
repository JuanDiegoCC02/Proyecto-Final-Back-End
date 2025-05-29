import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Imagen from './Imagen';

import "../styles/Navbar.css"


function NavBar() {
            /*en el primer navbar estaba className="bg-body-tertiary">*/
  return (
            
    <Navbar collapseOnSelect expand="lg" className="ContainerNavbar">
      <Container className='MainContainerNavbar'>
         <Imagen enlaceImagen={"../src/Images/Logo Noticias Ambientales.png"}/>
        <Navbar.Brand href="/"></Navbar.Brand>
        <Navbar.Brand className='BrandTitle' href="/">Costa Rica</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/moderador">Moderador</Nav.Link>
            <Nav.Link href="/noticias">Noticias</Nav.Link>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/contacto">Contacto</Nav.Link>
            <NavDropdown title="Configuración" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/">Opc</NavDropdown.Item>
              <NavDropdown.Item href="/">Opc</NavDropdown.Item>
              <NavDropdown.Item href="/"></NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/">Cerrar Sesión</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="/inicio">LogIn</Nav.Link>
            <Nav.Link eventKey={2} href="/registro">Registro</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;