import React from 'react'


import "../styles/Navbar.css"

function  Imagen({enlaceImagen}) {
  return (
    <img className='NavbarImg' src={enlaceImagen}  />
  )
}

export default Imagen