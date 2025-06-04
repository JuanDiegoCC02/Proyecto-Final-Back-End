import Table from 'react-bootstrap/Table';
import React, { useEffect, useState } from 'react'
import { getUsers, patchData, } from '../services/MainLlamados'
import "../styles/TablaUsuarios.css"

function TablaComentariosCom() {
    const [comentarios, setComentarios] = useState ([])
    const [reload, setReload] = useState (false)

    const [mostrar, setMostrar] = useState(false)

    //Para el edit
    const [editNombre, setEditNombre] = useState("")
    const [editEmail, setEditEMail] = useState("")
    const [editTelefono, setEditTelefono] = useState("")
    const [editComentario, setEditComentario] = useState("")

  useEffect(() => {
    async function TraerComentarios() {
      const datos = await getUsers("api/emails-contacto")
      setComentarios (datos)
      console.log (datos) 
    }
    TraerComentarios()
  }, [reload])

  async function actualizarComentarios(id) {
    const actComentario = {
      "nombre" : editNombre,
      "email" : editEmail,
      "telefono" : editTelefono,
      "mensaje" : editComentario
    }
    await patchData (actComentario, id)
    setReload(!reload)
    setMostrar(!mostrar)
    
  }

  return (
     <Table striped="columns">
      <thead >
        <tr>
          <th style={{backgroundColor:"#5b5b5b"}} className='pruebaWe'>#</th>
          <th style={{backgroundColor:"#68c4af"}}>Nombre</th>
          <th style={{backgroundColor:"#68c4af"}}>Email</th>
          <th style={{backgroundColor:"#68c4af"}}>Telefono</th>
          <th style={{backgroundColor:"#68c4af"}}>Comentario</th>
          <th style={{backgroundColor:"#68c4af"}}>Opciones</th>
        </tr>
      </thead>
      <tbody className='containerTablaUsuarios ' >
        {comentarios.map((comentario, index) => (
        <tr key={comentario.id}>
          <td style={{backgroundColor:"#999999"}} >{index + 1}</td>
          <td>{comentario.nombre}</td>
          <td>{comentario.email}</td>
          <td>{comentario.telefono}</td>
          <td>{comentario.mensaje}</td>
          <button onClick={()=> EliminarContacto(comentario.id)}>Eliminar</button>
          <button onClick={()=> setMostrar(!mostrar)}>Editar</button>
          {mostrar &&
              <> <br />
              <input type="text" className='inputTablaUsuarios' onChange={(e) => setEditNombre(e.target.value)} placeholder='Editar Nombre' />
              <br />
              <input type="text" className='inputTablaUsuarios' onChange={(e) => setEditEMail(e.target.value)} placeholder='Editar Email' />
              <br />
              <input type="text" className='inputTablaUsuarios' onChange={(e) => setEditTelefono(e.target.value)} placeholder='Editar Telefono' />
              <br />
              <input type="text" className='inputTablaUsuarios' onChange={(e) => setEditComentario(e.target.value)} placeholder='Editar Mensaje' />
              <br /> 
              <button className='tablaUsuariosConfirmBtn' onClick={() => actualizarComentarios(comentario.id)}>Confirmar Edit</button> 

              </>
          }
        </tr>


                ))}
         
      </tbody>
    </Table>
)
}

export default TablaComentariosCom