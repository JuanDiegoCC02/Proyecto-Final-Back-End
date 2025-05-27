import React, { useState} from 'react'
import { PostUsuarios } from '../services/llamados_usuarios';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Login.css"


function InicioSesionForm() {
    const [NombreUsuario, setNombreUsuario] = useState("")
    const [ContraseñaUsuario, setContraseñaUsuario] = useState("")
    const [mensaje, setMensaje] = useState("")
    const Navigate = useNavigate();


    const inicio = async () => {
        const response = await fetch("http://localhost:8000/api/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: NombreUsuario, password: ContraseñaUsuario }),
        });


  const data = await response.json();
        if (response.ok) {
            Navigate("/")
        } else {
            setMensaje(data.error || "Usuario no encontrado.");
        }
    };



  return (
    <div>
<>
    <div className='loginContainer'>
    <label htmlFor="" className='labelLogin'>Nombre</label>
    <input className='inputLogin' value={NombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)}  placeholder='Nombre' type="text" />
    <hr className='barLogin' />

    <label htmlFor="" className='labelLogin'>Contraseña</label>
    <input className='inputLogin' value={ContraseñaUsuario} onChange={(e) => setContraseñaUsuario(e.target.value)} placeholder='Contraseña' type="text" />
    <hr className='barLogin' />

    <button className='loginBtn' onClick={inicio} >Iniciar</button>
    {mensaje && <p>{mensaje}</p>} <br />


     <p>¿Aún no tienes una cuenta? <br /> <Link to="/registro">Ir a Registrarse</Link>   </p>
    </div>
    </>

    </div>
  )
}

export default InicioSesionForm