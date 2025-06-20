import React, { useEffect, useState } from 'react'
import { getUsers, deleteUser, postUsers, patchData } from '../services/MainLlamados'
import "../styles/NoticiaFull.css"
import MapaCards from './MapaCards'
import ReactDOM from 'react-dom/client'
import CalificacionStarReact from './CalificacionStarReact'

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

function NoticiaFull() {
  const [comentariosPublicaciones, setComentariosPublicaciones] = useState("")  
  const [publicaciones, setPublicaciones] = useState([])
  const [usuario, setUsuario] = useState(null)
  const [reload, setReload] = useState(false)

  // Comentarios
  const [comentarios, setComentarios] = useState([])

  // Respuestas
  const [comentarioActivo, setComentarioActivo] = useState(null)
  const [respuestas, setRespuestas] = useState({})
  const [textoRespuesta, setTextoRespuesta] = useState({})

  //Edit comentario
  const [mostrar, setMostrar] = useState(false)
  const [editComentario, setEditComentario] = useState("")

  // Edit Respuestas
  const [mostrarRespuesta, setMostrarRespuesta] = useState(false)
  const [editRespuesta, setEditRespuesta] = useState("")
  

    async function AggComentario() {
      const comentarioPublicacion = {
        "contenido": comentariosPublicaciones,
        "publicacion": localStorage.getItem("id_publicacion"),
        "usuario": localStorage.getItem("id")
      }
      await postUsers(comentarioPublicacion, "api/comentarios/")
      setComentariosPublicaciones("")
      setReload(r => !r)
    }

  async function AgregarRespuesta(comentarioId) {
    const respuesta = {
      "contenido": textoRespuesta[comentarioId],
      "comentario": comentarioId,
      "usuario": localStorage.getItem("id"),
      "publicacion": localStorage.getItem("id_publicacion")
    }
    await postUsers(respuesta, "api/respuestascomentarios/")
    setTextoRespuesta(prev => ({ ...prev, [comentarioId]: "" }))
    setReload(r => !r)
    // Opcional: recargar respuestas solo para ese comentario
    TraerRespuestas(comentarioId)
    setMostrar(false)
  }

  async function TraerRespuestas(comentarioId) {
    const datos = await getUsers("api/respuestascomentarios")
    const filtradas = datos.filter(r => r.comentario === comentarioId)
    setRespuestas(prev => ({ ...prev, [comentarioId]: filtradas }))
  }

  useEffect(() => {
    async function TraerPublicaciones() {
      const datos = await getUsers("api/publicaciones", localStorage.getItem("id_publicacion") + "/")
      setPublicaciones(Array.isArray(datos) ? datos : datos ? [datos] : [])
    } 
    async function TraerComentarios() {
      const datos = await getUsers("api/comentarios")
      const filtro = datos.filter((dato) => dato.publicacion === parseInt(localStorage.getItem("id_publicacion")))
      setComentarios(Array.isArray(filtro) ? filtro : filtro ? [filtro] : [])
    }
    TraerPublicaciones()
    TraerComentarios()
  }, [reload])

  //Eliminar Comentarios
  async function EliminarComentario(id) {
    await deleteUser(id, "api/comentarios")
    setReload(r => !r)
  }

  //Editar Comentario
  async function actualizarComentarios(id) {
    const actComentario = {
      "contenido": editComentario
    }
    await patchData(actComentario, "api/comentarios", id)
    setReload(!reload)
    setMostrar(false);
  }
  function abrirModal(usuario) {
    setUsuario(usuario);
    setEditComentario(usuario.contenido);
    setMostrar(true);
    console.log(editComentario);
  }

  // Eliminar Respuesta Comentario 
  async function eliminarRespuesta(id) {
    await deleteUser(id, "api/respuestascomentarios")
    setReload(r => !r)
  }

  // Editar Respuestas comentarios
  async function actualizarRespuestas(id) {
    const actRespuesta = {
      "contenido": editRespuesta
    }
    await patchData(actRespuesta, "api/respuestascomentarios", id)
    setReload(r => !r)
  }
  function abrirModalRespuestas(usuario) {
    setUsuario(usuario);
    setEditRespuesta(usuario.contenido);
    setMostrarRespuesta(true);
    console.log(editRespuesta);
  }
  
  return (
    <div className='noticiasContainer'>
      <div className='noticiasCard'>
        <div className='noticiasCardContent'>
          {Array.isArray(publicaciones) && publicaciones.map((p) => (
            <div key={p.id} className='noticiasItem'>
              <p className='tipoPublicacion'>{p.nombre_tipo_publicacion}</p>
              <img src={p.img} alt="Imagen de la noticia" className='noticiasIMG' width={300} />
              <h1 className='tituloPublicacion'>{p.titulo}</h1>
              <h2>{p.descripcion}</h2>
              <MapaCards latitud={p.latitud} longitud={p.longitud} />
              <hr />
               <React.StrictMode>
                  <CalificacionStarReact />
                </React.StrictMode>
              <h1>--</h1>
              <h2>Comentarios</h2>
              <div>
                  <input className='inputNoticiasFull' type="text" value={comentariosPublicaciones}
                  onChange={(e) => setComentariosPublicaciones(e.target.value)} placeholder='Agregar comentario'/>
                  <br />
                  <button className='btnComentarioNoticiasFull' onClick={AggComentario}>Enviar Comentario</button>
                </div>


              <div className="comentariosContainer">
                {comentarios.map((comentario) => (
                  <div key={comentario.id} className="comentarioCard">
                    <div className="comentarioUsuario">{`Usuario #${comentario.usuario}`}</div>
                    <div className="comentarioContenido">{comentario.contenido}</div>
                    <button className='noticiasFullBtnEliminar' onClick={() => EliminarComentario(comentario.id)}>Eliminar</button>
                    <button className='noticiasFullBtnEdit' onClick={() => abrirModal(comentario)}>Editar</button>
                    {mostrar && 
                        <>
                        <input className='noticiasInputComentariosBtn' type="text" value={editComentario} onChange={(e) => setEditComentario(e.target.value)} />
                        <button className='noticiasFullGuardarComentariosBtn' onClick={() => actualizarComentarios(comentario.id)}>Guardar</button>
                        </>
                    }
                    <button
                      className='noticiasFullBtnRespuesta'
                      onClick={() => {
                        if (comentarioActivo === comentario.id) {
                          setComentarioActivo(null)
                        } else {
                          setComentarioActivo(comentario.id)
                          TraerRespuestas(comentario.id)
                        }
                      }}
                    >
                      Ver respuestas
                    </button>
                    {comentarioActivo === comentario.id && (
                      <div className="respuestasContainer">
                        <div>
                          <h6>Respuestas</h6>
                          {respuestas[comentario.id] && respuestas[comentario.id].length > 0 ? (
                            respuestas[comentario.id].map(respuesta => (
                              <div key={respuesta.id} className="respuestaCard">
                                {respuesta.contenido}
                                <br />
                                <button className='btnRespuestaEliminar' onClick={() => eliminarRespuesta(respuesta.id)}>Eliminar</button>
                                <button className='btnRespuestaEditar' onClick={() => abrirModalRespuestas(respuesta)}>Editar</button>
                                {mostrarRespuesta &&
                                <>
                                <input className='inputRespuestaEditNoticias' type="text" value={editRespuesta} onChange={(e) => setEditRespuesta(e.target.value)}/>
                                <button className='btnRespuestaConfirmarEdit' onClick={() => actualizarRespuestas(respuesta.id)}>Guardar</button>
                                </>
                                }
                              </div>
                            ))
                          ) : (
                            <div>No hay respuestas.</div>
                          )}
                        </div>
                        <input className='inputRespuestaNoticias'
                          type="text"
                          placeholder='Responder Comentario'
                          value={textoRespuesta[comentario.id] || ""}
                          onChange={e => setTextoRespuesta(prev => ({ ...prev, [comentario.id]: e.target.value }))}
                          
                        />
                        <button className='btnRespuestaNoticias' onClick={() => AgregarRespuesta(comentario.id)}>Enviar Respuesta</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div> 
          ))}
        </div>
      </div>
    </div>
  )
}

export default NoticiaFull
