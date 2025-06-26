import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useCookies} from 'react-cookie';

import Imagen from './Imagen';

import "../styles/Navbar.css"


function NavBar() {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken'],{
        doNotParse: true
    })
     const cerrarSesion = () => {
    localStorage.removeItem('accessToken'); 
    removeCookie('accessToken', { path: '/' });

    localStorage.removeItem('accessToken');
    localStorage.removeItem('grupoUsuario');
    localStorage.removeItem('id');

     window.location.href = "/inicio";  
    
};
            /*en el primer navbar estaba className="bg-body-tertiary">*/
  return (
            
    <Navbar collapseOnSelect expand="lg" className="ContainerNavbar">
      <Container className='MainContainerNavbar'>
        <a href="/">
         <Imagen  className="logoNavbar" enlaceImagen={"../src/Images/Logo Pag Noticias.jpg"}/>
         </a>
        <Navbar.Brand href="/"></Navbar.Brand>
        <Navbar.Brand className='BrandTitle' href="/"></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" >
          <Nav className="me-auto ">
            {localStorage.getItem('grupoUsuario') === 'Administrador' && (
              <Nav.Link className='linkNavbar' href="/moderador">Moderador</Nav.Link>
              
            )}
              {localStorage.getItem('grupoUsuario') === 'Administrador' && (
            <Nav.Link className='linkNavbar' href="/noticias">Publicaciones</Nav.Link>
            )}

            {!localStorage.getItem('grupoUsuario') && (
           <Nav.Link className='linkNavbar' href="/registro"> Registro </Nav.Link>
            )}

            <Nav.Link className='linkNavbar' href="/">Home</Nav.Link>
            <Nav.Link className='linkNavbar' href="/contacto">Contacto</Nav.Link>
            <NavDropdown className='linkConfg' id="collapsible-nav-dropdown" title="⚙️" >
              <NavDropdown.Item className='confgbtn' href="/perfil">Perfil</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item className='confgbtn'  onClick={cerrarSesion}>Cerrar Sesión</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
  
export default NavBar;