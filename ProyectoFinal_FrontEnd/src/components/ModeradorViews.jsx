import React, { useEffect, useState } from 'react'
import { GetUsuarios } from '../services/llamados_usuarios'

function ModeradorViews() {
  const [usuarios, setUsuarios] = useState ([])
  
  const [reload, setReload] = useState (false)

  useEffect(() => {
    async function list() {
      const datos = await GetUsuarios()
      setUsuarios (datos)
      console.log (datos)
    }
    list()
  }, [reload])


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
                                <hr />
                        
                                
                            </li>
                        ))}
                    </ul>
        </div>
    </div>
  )
}

export default ModeradorViews