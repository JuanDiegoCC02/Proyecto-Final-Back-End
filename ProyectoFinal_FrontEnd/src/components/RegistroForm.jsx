import React, {useState} from 'react'
import  {PostUsuarios} from '../services/llamados_usuarios'
import { Link } from 'react-router-dom';
import "../styles/Register.css"

function RegistroForm() {
    const [NombreUser, setNombreUser] = useState()
    const [NmUsuario, setNmUsuario] = useState()
    const [ApUsuario, setApUsuario] = useState()
    const [ContraseñaUsuario, setContraseñaUsuario] = useState()
    const [EmailUsuario, setEmailUsuario] = useState()
    const [Fecha_NacimientoUsuario, setFecha_NacimientoUsuario] = useState()
    const [TelefonoUsuario, setTelefonoUsuario] = useState()
     const [mensaje, setMensaje] = useState("")

    function nombre_user(e) {
        setNombreUser(e.target.value)
    }
    function nombre(e) {
        setNmUsuario(e.target.value)
    }
    function apellido(e) {
        setApUsuario(e.target.value)
    }
     function contraseña(e) {
        setContraseñaUsuario(e.target.value)
    }
     function email(e) {
        setEmailUsuario(e.target.value)
    } 
    function fecha_nacimiento(e) {
        setFecha_NacimientoUsuario(e.target.value)
    }
    function telefono(e) {
        setTelefonoUsuario(e.target.value)
    }
    async function registrar() {
         if (!NombreUser || !NmUsuario || !ApUsuario || !ContraseñaUsuario || !EmailUsuario || !Fecha_NacimientoUsuario || !TelefonoUsuario) {
            setMensaje("Todos los campos son obligatorios.");
            return;
        }

        const obj = {
            username: NombreUser,
            first_name: NmUsuario,
            last_name: ApUsuario,
            password: ContraseñaUsuario,
            email: EmailUsuario,
            fecha_nacimiento: Fecha_NacimientoUsuario,
            telefono: TelefonoUsuario
        }
        const respuestaServer = await PostUsuarios(obj)
        console.log(respuestaServer);
    }



  return (
    <div>
        <h2>Formulario de Registro</h2>
        <div className='registerContainer'>
            <div>
            <label className='labelRegister' htmlFor="">Usuario: </label>
            <input className='inputRegister' value={NombreUser} onChange={nombre_user} type="text" />
            </div><hr />
            <div>
            <label className='labelRegister' htmlFor="">Nombre: </label>
            <input className='inputRegister' value={NmUsuario} onChange={nombre} type="text" />
            </div><hr />
            <div>
            <label className='labelRegister' htmlFor="">Apellido: </label>
             <input className='inputRegister' value={ApUsuario} onChange={apellido} type="text" />
            </div><hr />
            <div>
            <label className='labelRegister' htmlFor="">Contraseña: </label>
            <input className='inputRegister' value={ContraseñaUsuario} onChange={contraseña} type="password" />
            </div><hr />
            <div>
            <label className='labelRegister' htmlFor="">Email: </label>
            <input className='inputRegister' value={EmailUsuario} onChange={email} type="email" />
            </div><hr />
            <div>
            <label className='labelRegister' htmlFor="">Fecha de Nacimiento: </label>
            <input className='inputRegister' value={Fecha_NacimientoUsuario} onChange={fecha_nacimiento} type="date" />
            </div><hr />
            <div>
            <label className='labelRegister' htmlFor="">Telefono: </label>
            <input className='inputRegister' value={TelefonoUsuario} onChange={telefono} type="text" />
            </div><hr />
            <div> 
            <label className='labelRegister' htmlFor="">Terminos y Condiciones</label>
            <input type="checkbox" name="" id="" /> 
            </div><hr />
            <div>
                <input className="registerBtn" type="button" onClick={registrar} value="Registro" />
                 {mensaje && <p>{mensaje}</p>} <br />
            
            </div>
            
        <p>¿Ya tienes una cuenta? <br /> <Link to="/inicio">Inicia Sesión</Link>   </p>
        </div>
    </div>
  )
}

export default RegistroForm