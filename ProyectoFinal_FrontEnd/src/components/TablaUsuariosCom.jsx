import Table from 'react-bootstrap/Table';

import React, { useEffect, useState } from 'react'
import { DeleteUsuarios, GetUsuarios, UpdateUsuarios,  } from '../services/llamados_usuarios'
import "../styles/TablaUsuarios.css"

function StripedColumnsExample() {

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
    "fecha_nacimiento": edicionFechaNacimiento,
    "telefono": edicionTelefono

  }
  await UpdateUsuarios(p, id)
  setReload(!reload)
  setMostrar(!mostrar)
}

async function EliminarUsuarios(id) {
  await DeleteUsuarios(id)
  setReload(!reload)
}

  return (
    <Table  responsive="sm" striped="columns">
      <thead >
        <tr>
          <th style={{backgroundColor:"#5b5b5b"}} className='pruebaWe'>#</th>
          <th style={{backgroundColor:"#68c4af"}}>Alias Usuario</th>
          <th style={{backgroundColor:"#68c4af"}}>Nombre</th>
          <th style={{backgroundColor:"#68c4af"}}>Apellido</th>
          <th style={{backgroundColor:"#68c4af"}}>Email</th>
          <th style={{backgroundColor:"#68c4af"}}>Fecha de Nacimiento</th>
          <th style={{backgroundColor:"#68c4af"}}>Telefono</th>
          <th style={{backgroundColor:"#68c4af"}}>Opciones</th>
        </tr>
      </thead>
      <tbody className='containerTablaUsuarios ' >
        {usuarios.map((user, index) => (
        <tr key={user.id}>
          <td style={{backgroundColor:"#999999"}} >{index + 1}</td>
          <td>{user.usuario_alias}</td>
          <td>{user.usuario_nombre}</td>
          <td>{user.usuario_apellido}</td>
          <td>{user.usuario_email}</td>
          <td>{user.fecha_nacimiento}</td>
          <td>{user.telefono}</td>
          <button className='tablaUsuariosDeleteBtn' onClick={()=> EliminarUsuarios(user.id)}>Eliminar</button>
          <button className='tablaUsuariosEditBtn' onClick={()=> setMostrar(!mostrar)}>Editar</button>
          {mostrar &&
              <> <br />
              <input type="text" className='inputTablaUsuarios' onChange={(e) => setEdicionAliasUsuario(e.target.value)} placeholder='Editar Alias Usuario' />
              <br />
              <input type="text" className='inputTablaUsuarios' onChange={(e) => setEdicionNombre(e.target.value)} placeholder='Editar Nombre' />
              <br />
              <input type="text" className='inputTablaUsuarios' onChange={(e) => setEdicionApellido(e.target.value)} placeholder='Editar Apellido' />
              <br />
              <input type="text" className='inputTablaUsuarios' onChange={(e) => setEdicionEmail(e.target.value)} placeholder='Editar Email' />
              <br /> 
              <input type="text" className='inputTablaUsuarios' onChange={(e) => setEdicionFechaNacimiento(e.target.value)} placeholder='Editar Fecha Nacimiento' />
              <br />
              <input type="text" className='inputTablaUsuarios' onChange={(e) => setEdicionTelefono(e.target.value)} placeholder='Editar Telefono' />
  
              <button className='tablaUsuariosConfirmBtn    ' onClick={() => actualizar(user.id)}>Confirmar Edit</button> 
              </>
                    }
        </tr>


                ))}
         
      </tbody>
    </Table>
  );
}

export default StripedColumnsExample;