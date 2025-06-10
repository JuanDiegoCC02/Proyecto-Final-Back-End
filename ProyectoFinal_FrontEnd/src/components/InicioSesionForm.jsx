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
      try{
        const response = await fetch("http://localhost:8000/api/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: NombreUsuario, password: ContraseñaUsuario }),
        });

        const data = await response.json();
        console.log(data);
        if (response.ok) {
            localStorage.setItem("id", data.id); // se guarda el ID en LS
            Navigate("/"); 
        } else {
            setMensaje(data.error || "Usuario no encontrado.");
        }
    } catch (error) {
        console.error("Error en el inicio de sesión:", error);
        setMensaje("Ocurrió un error al iniciar sesión.");
    }
};




  return (
    <div>
        <nav>
     <div className='ImgInicioLogo'>
         <img src="../src/Images/Logo Pag Noticias.jpg" alt="" />
     </div><br /><br />
     <div>
        <h3 className='tituloInicio'>Inicio de Sesión</h3>
     </div>
        </nav>
<>
    <div className='loginContainer'>
    <label htmlFor="" className='labelLogin'>Nombre</label>
    <input className='inputLogin' value={NombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)}  placeholder='Nombre' type="text" />
    <hr className='barLogin' />

    <label htmlFor="" className='labelLogin'>Contraseña</label>
    <input className='inputLogin' value={ContraseñaUsuario} onChange={(e) => setContraseñaUsuario(e.target.value)} placeholder='Contraseña' type="password" />
    <hr className='barLogin' />

    <button className='loginBtn' onClick={inicio} >Iniciar</button><br /><br />
    {mensaje && <p className='error-message-I'>{mensaje}</p>} 


     <p>¿Aún no estás Registrado? <br /> <Link className='linkInicio' to="/registro">Registro</Link>   </p>
    </div>
    </>

    </div>
  )
}

export default InicioSesionForm