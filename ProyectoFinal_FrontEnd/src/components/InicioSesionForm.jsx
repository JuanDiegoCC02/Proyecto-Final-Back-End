import React, { useState} from 'react'
import { PostUsuarios } from '../services/llamados_usuarios';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Login.css"
import {useCookies} from 'react-cookie'


function InicioSesionForm() {
    const [NombreUsuario, setNombreUsuario] = useState("")
    const [ContraseñaUsuario, setContraseñaUsuario] = useState("")
    const [mensaje, setMensaje] = useState("")
    const Navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['accessToken'],{
        doNotParse: true
    })


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

            // Cookies
            setCookie("accessToken", data.access, { path: "/", maxAge: 3600 });
            setCookie("id", data.id, { path: "/" });
            console.log("accessToken", data.access);

            localStorage.setItem("grupoUsuario", data.grupo)
            localStorage.setItem("id", data.id);
            localStorage.setItem("accessToken", data.access)
            console.log ("accessToken", data.access);
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
        <a href="/">
         <img src="../src/Images/Logo Pag Noticias.jpg" alt="" />
     </a>
     </div><br /><br />
     <div>
        <h3 className='tituloInicio'>Inicio de Sesión</h3>
     </div>
        </nav>
<>
    <div className='loginContainer'>
    <label htmlFor="" className='labelLogin'>Usuario</label>
    <input className='inputLogin' value={NombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)}  placeholder='Usuario' type="text" />
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