import React from 'react'
import "../styles/Contact.css"

function ContactForm() {
  
  return (  
    <>
      <div className='MainContactContainer'>

    <div className='contactContainer'>
      <h1>Formulario de Contacto</h1>
    <label className='contactLabel' htmlFor="">Nombre</label>
    <input className='contactInput' type="text" />
      <hr />
    <label className='contactLabel' htmlFor="">Email</label>
    <input className='contactInput' type="email" />
      <hr />
    <label className='contactLabel' htmlFor="">Telefono</label>
    <input className='contactInput' type="text" />
      <hr />
      <input className='contactMsg' type="text" placeholder='Mensaje' />
      <br />
      <button className='contactBtn'>Enviar</button>
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