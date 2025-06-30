import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import "../styles/Sidebar.css"

const options = [
  {
    name: 'Enable both scrolling & backdrop',
    scroll: true,
    backdrop: true,
  },
];

function Sidebar({ name, ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  return (
    <>
      <Button variant="primary" onClick={toggleShow} className="me-2"> {name}Menú</Button>
      <Offcanvas style={{backgroundColor:"#e6e6e6e6"}} show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Noticias Ambientales CR</Offcanvas.Title>
        </Offcanvas.Header>
        <Nav style={{backgroundColor:"#ECFAE5"}} className="navPadre">
            <Nav.Link className='navHijo'  href="/tablausuarios">Tabla Usuarios</Nav.Link>
            <Nav.Link className='navHijo'  href="/tablacomentarios">Tabla Contactos</Nav.Link>
            <Nav.Link className='navHijo'  href="/admin">Tabla Publicaciones</Nav.Link>
            <Nav.Link className='navHijo' href="/">Home</Nav.Link>
            <Nav.Link className='navHijo' href="/contacto">Contacto</Nav.Link>
            <Nav.Link className='navHijo' href="/moderador">Moderador</Nav.Link>
        </Nav>
        <Offcanvas.Body>
          Aquí se va a poder acceder a los Usuarios, solicitudes de los Formularios de contacto, y las publicaciones
          que envíen los usuarios, cada uno tiene su funcionalidad CRUD de Post, Get, Patch que se utiliza para 
          editar información, y el Delete.
          
        </Offcanvas.Body>
      </Offcanvas>
      
    </>
  );
}
export default Sidebar
