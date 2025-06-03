import React, {useState} from 'react'
import  {PostUsuarios} from '../services/llamados_usuarios'
import { Link, useNavigate } from 'react-router-dom';
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
     const navigate = useNavigate();

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
    try {
        const respuestaServer = await PostUsuarios(obj);
        console.log("Usuario registrado:", respuestaServer);
        navigate("/inicio");
    } catch (error) {
        console.error("Error al registrar:", error);
        setMensaje("No se pudo registrar. Verifica los datos.");
    }
}
  



  return (
    <div>
     <div className='ImgInicioLogo'>
         <img src="../src/Images/Logo Pag Noticias.jpg" alt="" />
     </div><br /><br />

        <h3 className='tituloRegistro' >Registro</h3>
        <div className='registerContainer'>
            <div>
            <label className='labelRegister' htmlFor="">Usuario </label><br />
            <input className='inputRegister' value={NombreUser} onChange={nombre_user} type="text" placeholder='Nombre Usuario' />
            </div><hr />
            <div>
            <label className='labelRegister' htmlFor="">Nombre </label><br />
            <input className='inputRegister' value={NmUsuario} onChange={nombre} type="text" placeholder='Nombre'/>
            </div><hr />
            <div>
            <label className='labelRegister' htmlFor="">Apellido </label><br />
             <input className='inputRegister' value={ApUsuario} onChange={apellido} type="text" placeholder='Apellido' />
            </div><hr />
            <div>
            <label className='labelRegister' htmlFor="">Contraseña </label><br />
            <input className='inputRegister' value={ContraseñaUsuario} onChange={contraseña} type="password" placeholder='Contraseña' />
            </div><hr />
            <div>
            <label className='labelRegister' htmlFor="">Email </label><br />
            <input className='inputRegister' value={EmailUsuario} onChange={email} type="email" placeholder='Email' />
            </div><hr />
            <div>
            <label className='labelRegister' htmlFor="">Fecha de Nacimiento </label><br />
            <input className='inputRegister' value={Fecha_NacimientoUsuario} onChange={fecha_nacimiento} type="date" />
            </div><hr />
            <div>
            <label className='labelRegister' htmlFor="">Telefono</label><br />
            <input className='inputRegister' value={TelefonoUsuario} onChange={telefono} type="text" placeholder='Telefono' />
            </div><hr />
            <div> 
            <label className='labelRegister' htmlFor="">Terminos y Condiciones</label>
            <input type="checkbox" name="" id="" /> 
            </div><hr />
            <div>
                <input className="registerBtn" type="button" onClick={registrar} value="Registro" /><br /><br />
                 {mensaje && <p>{mensaje}</p>} 
            
            </div><br />
            
        <p>¿Ya tienes cuenta? <br /> <Link className='linkRegistro' to="/inicio">Inicia Sesión</Link>   </p>
        </div>
    </div>
  )
}

export default RegistroForm