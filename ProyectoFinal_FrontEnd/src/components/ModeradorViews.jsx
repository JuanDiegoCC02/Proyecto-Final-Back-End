import React, { useEffect, useState } from 'react'
import { GetUsuarios, UpdateUsuarios,  } from '../services/llamados_usuarios'

function ModeradorViews() {
  const [usuarios, setUsuarios] = useState ([])
  
  const [reload, setReload] = useState (false)

  //prueba
  const [mostrar, setMostrar] = useState(false)
  const [edicionAliasUsuario, setEdicionAliasUsuario] = useState("")
  const [edicionNombre, setEdicionNombre] = useState("")
  const [edicionApellido, setEdicionApellido] = useState("")
  const [edicionEmail, setEdicionEmail] = useState("")
  const [edicionFechaNacimiento, setEdicionFechaNacimiento] = useState("")
  const [edicionTelefono, setEdicionTelefono] = useState("")

  useEffect(() => {
    async function list() {
      const datos = await GetUsuarios()
      setUsuarios (datos)
      console.log (datos)
    }
    list()
  }, [reload])



async function actualizar(id) {
  const p = {
    "username": edicionAliasUsuario,
    "first_name": edicionNombre,
    "last_name": edicionApellido,
    "email": edicionEmail,
  }
  await UpdateUsuarios(p, id)
  
}

  return (
    <div> 
        <h3>Pagina Moderadores</h3> <br />
        <h5>Views Usuarios</h5>

        <div>
          <ul className=''>

                        {usuarios.map((user) => (

                            <li key={user.id} className=''>
                                
                                <strong>Nombre Usuario</strong> {user.usuario_alias} <br /><br /><br />
                                <strong>Nombre</strong> {user.usuario_nombre} <br /><br /><br />
                                <strong>Apellido</strong> {user.usuario_apellido} <br /><br /><br />
                                <strong>Email</strong> {user.usuario_email} <br /><br /><br />
                                <strong>Fecha Nacimiento</strong>  {user.fecha_nacimiento} <br /><br /><br />
                                <strong>Telefono</strong>  {user.telefono} <br /><br /><br />
                                <button>Eliminar</button>
                                <button onClick={()=> setMostrar(!mostrar)}>Editar</button>
                                {mostrar &&
                                    <> <br />
                                    <input type="text" className='' onChange={(e) => setEdicionAliasUsuario(e.target.value)} placeholder='Editar Alias Usuario' />
                                    <br />
                                    <input type="text" className='' onChange={(e) => setEdicionNombre(e.target.value)} placeholder='Editar Nombre' />
                                    <br />
                                    <input type="text" className='' onChange={(e) => setEdicionApellido(e.target.value)} placeholder='Editar Apellido' />
                                    <br />
                                    <input type="text" className='' onChange={(e) => setEdicionEmail(e.target.value)} placeholder='Editar Email' />
                                    <br /> 
                                    <input type="text" className='' onChange={(e) => setEdicionFechaNacimiento(e.target.value)} placeholder='Editar Fecha Nacimiento' />
                                    <br />
                                    <input type="text" className='' onChange={(e) => setEdicionTelefono(e.target.value)} placeholder='Editar Telefono' />

                                    <button onClick={() => actualizar(user.id)}>Confirm Edit</button>
                                    </>
                                
                                }
                                <hr />
                        
                                
                            </li>
                        ))}
                    </ul>
        </div>
    </div>
  )
}

export default ModeradorViews