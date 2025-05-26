import React, {useState} from 'react'
import  {PostUsuarios} from '../services/llamados_usuarios'

function RegistroForm() {
    const [NombreUsuario, setNombreUsuario] = useState()
    const [ContraseñaUsuario, setContraseñaUsuario] = useState()
    const [EmailUsuario, setEmailUsuario] = useState()
    const [Fecha_NacimientoUsuario, setFecha_NacimientoUsuario] = useState()
    const [TelefonoUsuario, setTelefonoUsuario] = useState()
     const [mensaje, setMensaje] = useState("")

    function nombre(e) {
        setNombreUsuario(e.target.value)
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
         if (!NombreUsuario || !ContraseñaUsuario || !EmailUsuario || !Fecha_NacimientoUsuario || !TelefonoUsuario) {
            setMensaje("Todos los campos son obligatorios.");
            return;
        }

        const obj = {
            username: NombreUsuario,
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
        <div>
            <div>
            <label htmlFor="">Nombre: </label>
            <input value={NombreUsuario} onChange={nombre} type="text" />
            </div><br />
            <div>
            <label htmlFor="">Contraseña: </label>
            <input value={ContraseñaUsuario} onChange={contraseña} type="password" />
            </div><br />
            <div>
            <label htmlFor="">Email: </label>
            <input value={EmailUsuario} onChange={email} type="email" />
            </div><br />
            <div>
            <label htmlFor="">Fecha de Nacimiento: </label>
            <input value={Fecha_NacimientoUsuario} onChange={fecha_nacimiento} type="date" />
            </div><br />
            <div>
            <label htmlFor="">Telefono: </label>
            <input value={TelefonoUsuario} onChange={telefono} type="text" />
            </div>
            <div> 
            <label htmlFor="">Terminos y Condiciones</label>
            <input type="checkbox" name="" id="" /> 
            </div><br />
            <div>
                <input type="button" onClick={registrar} value="Registro" />
                 {mensaje && <p>{mensaje}</p>} <br />
            </div>
            
        </div>
    </div>
  )
}

export default RegistroForm