import React, {useState} from 'react'
import  {postUsers} from '../services/MainLlamados'
import "../styles/Contact.css"

function ContactForm() {
      // Parte del POST
      const [NombreContact, setNombreContact] = useState("")
      const [EmailContact, setEmailContact] = useState("")
      const [TelefonoContact, setTelefonoContact] = useState("")
      const [TextContact, setTextoContact] = useState("")
      const [mensaje, setMensaje] = useState("")

    function nombre_contact(e) {
        setNombreContact(e.target.value)
    }
    function email_contact(e) {
        setEmailContact(e.target.value)
    }
     function telefono_contact(e) {
        setTelefonoContact(e.target.value)
    }
     function contact_text(e) {
        setTextoContact(e.target.value)
    }

    // Esta funcion es para que no se pueda enviar el formulario si hay campos vacios
 async function registrarContacto() {
         if (!NombreContact || !EmailContact || !TelefonoContact || !TextContact) {
            setMensaje("Todos los campos son obligatorios.");
            return;
        }

        const obj = {
            nombre: NombreContact,
            email: EmailContact,
            telefono: TelefonoContact,
            mensaje: TextContact,
        }

    try { // metodo POST para que pueda enviar la informacion que se ingresa al formulario
        const respuestaServer = await postUsers(obj,"api/emails-contacto/");
        setNombreContact("") , setEmailContact(""), setTelefonoContact(""), setTextoContact(""); //Para reiniciar el formulario despues de enviarlo
        console.log("Contacto registrado:", respuestaServer);
      } catch (error) {
        console.error("Error al registrar:", error);
        setMensaje("No se pudo registrar. Verifica los datos.");
      }
}

  return (  
    <>
      <div className='MainContactContainer'>

    <div className='contactContainer'>
      <h1>Formulario de Contacto</h1>
    <label className='contactLabel' htmlFor="">Nombre</label>
    <input className='contactInput' value={NombreContact} onChange={nombre_contact} type="text" />
      <hr />
    <label className='contactLabel' htmlFor="">Email</label>
    <input className='contactInput' value={EmailContact} onChange={email_contact} type="email" />
      <hr />
    <label className='contactLabel' htmlFor="">Telefono</label>
    <input className='contactInput' value={TelefonoContact} onChange={telefono_contact} type="text" />
      <hr />
      <input className='contactMsg' value={TextContact} onChange={contact_text} type="text" placeholder='Mensaje' />
      <br />
      <button className='contactBtn' onClick={registrarContacto}>Enviar</button>
      {mensaje && <p  className='error-message-I' >{mensaje}</p>} <br />

    </div>

    <div className='SecondContact'>
      <h1>Informacion y Horarios</h1>
      <h2>Ubicacion</h2>
      <h3 className='ContactH2' >San José, Costa Rica</h3>
      <h2>Telefono</h2>
      <h3 className='ContactH2' >506-8493-3030</h3>
      <h2>Email</h2>
      <h3 className='ContactH2' >PaginaAmbiental@gmail.com</h3>
      <h2>Horario</h2>
      <h3 className='ContactH2' >9:00a.m - 5:00pm</h3>
      <h2>Redes Sociales</h2>
      <ul className='contacto'>
            <li><a className='iconoReds' href="https://www.youtube.com"><i className="fa-brands fa-youtube"></i></a></li>
            <li><a className='iconoReds' href="https://x.com"><i className="fa-brands fa-x-twitter"></i></a></li>
            <li><a className='iconoReds' href="https://www.instagram.com/"><i className="fa-brands fa-instagram"></i></a></li>
            <li><a  className='iconoReds'  href="https://www.facebook.com"><i className="fa-brands fa-facebook-f"></i></a></li>
            </ul>
    </div>

    </div>
    </>
  )
}

export default ContactForm