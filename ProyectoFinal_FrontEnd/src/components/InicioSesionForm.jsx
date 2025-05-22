import React, {useEffect} from 'react'
import { GetUsuarios } from '../services/llamados_usuarios';



function InicioSesionForm() {
    const [NombreUsuario, setNombreUsuario] = useState("")
    const [ContraseñaUsuario, setContraseñaUsuario] = useState("")
    const [Perfiles, setPerfiles] = useState([])
    
    
useEffect(()=>{
    async function fetchDataUsers() {
        const datos = await GetUsuarios()  
        setPerfiles(datos)      
    };
    fetchDataUsers()
},[]);

function nombreUsr(e) {
    setNombreUsuario (e.target.value)
}
function contraseñaUsr(e) {
    setContraseñaUsuario (e.target.value)
}
function inicio() {
    
}


  return (
    <div>
<>
    <div className='loginContainer'>
    <label htmlFor="" className='labelLogin'>Nombre</label>
    <input className='inputLogin' onChange={nombreUsr}  placeholder='Nombre' type="text" />
    <hr className='barLogin' />

    <label htmlFor="" className='labelLogin'>Contraseña</label>
    <input className='inputLogin' onChange={contraseñaUsr} placeholder='Contraseña' type="text" />
    <hr className='barLogin' />

    <button className='loginBtn' onClick={inicio} >Iniciar</button>
    <p>¿Aún no tienes una cuenta? <br /> <Link to="/register">Ir a Registrarse</Link>   </p>
    </div>
    </>

    </div>
  )
}

export default InicioSesionForm