import React, { useEffect, useState } from 'react'
import { getUsers, deleteUser, postUsers, patchData } from '../services/MainLlamados'
import "../styles/NoticiaFull.css"
import MapaCards from './MapaCards'
import ReactDOM from 'react-dom/client'
import CalificacionStarReact from './CalificacionStarReact'

// Parte de Calificaciones 
const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

function NoticiaFull() {
  // Para el map publicaciones
  const [publicaciones, setPublicaciones] = useState([])
  // POST de comentarios
  const [comentariosPublicaciones, setComentariosPublicaciones] = useState("")
  // Para cargar los inputs
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
  const [usuario, setUsuario] = useState(null) // Se utiliza en los 2 modales
  // Edit Respuestas
  const [mostrarRespuesta, setMostrarRespuesta] = useState(false)
  const [editRespuesta, setEditRespuesta] = useState("")
  const [respuestaEditando, setRespuestaEditando] = useState(null);
  const [comentarioEditando, setComentarioEditando] = useState(null); // para saber a qué comentario pertenece la respuesta
  // REPORTES
  const [reportes, setReportes] = useState(0)
  const [cantReportes,setCantReportes] = useState([])
  
  // POST para agregar comentarios a la publicacion 
  async function AggComentario() {
    const comentarioPublicacion = {
      "contenido": comentariosPublicaciones,
      "publicacion": localStorage.getItem("id_publicacion"),
      "usuario": localStorage.getItem("id")
    }
    await postUsers(comentarioPublicacion, "api/comentarios/")
    console.log (comentariosPublicaciones)
    setComentariosPublicaciones("")
    setReload(r => !r)
  }

  // POST para agregar respuestas a los comentarios de la publicacion
  // Se usa el comentarioId para identificar a qué comentario se le está agregando la respuesta  
  async function AgregarRespuesta(comentarioId) {
    console.log("Comentario ID:", comentarioId);
    const respuesta = {
      "contenido": textoRespuesta[comentarioId],
      "comentario": comentarioId,
      "usuario": localStorage.getItem("id"),
      "publicacion": localStorage.getItem("id_publicacion")
    }
    await postUsers(respuesta, "api/respuestascomentarios/")
    setTextoRespuesta(prev => ({ ...prev, [comentarioId]: "" }))
    setReload(r => !r)
    // recargar respuestas solo para ese comentario
    const prueba = TraerRespuestas(comentarioId)
    console.log(prueba);
    console.log("entra");
    setMostrar(false)
  } 

  // GET para traer las respuestas que se hacen a los comentarios de la publicacion 
  async function TraerRespuestas(comentarioId) {
    console.log("Traer respuestas para comentario ID:", comentarioId);
    const datos = await getUsers("api/respuestascomentarios")
    const filtradas = datos.filter(r => r.comentario === comentarioId)
    setRespuestas(prev => ({ ...prev, [comentarioId]: filtradas }))
  }

  useEffect(() => {
    // Get para traer las publicaciones del formulario
    async function TraerPublicaciones() {
      const datos = await getUsers("api/publicaciones", localStorage.getItem("id_publicacion") + "/")
      setPublicaciones(Array.isArray(datos) ? datos : datos ? [datos] : [])
    }
    // Get para traer los comentarios de la publicacion 
    async function TraerComentarios() { 
      const datos = await getUsers("api/comentarios")
      const filtro = datos.filter((dato) => dato.publicacion === parseInt(localStorage.getItem("id_publicacion")))
      setComentarios(Array.isArray(filtro) ? filtro : filtro ? [filtro] : [])
      console.log(datos);
      console.log(datos[0].usuario);
    }
    // GET REPORTES
    async function traerReportes() {
      try {
        const datos = await getUsers("api/publicaciones");
        console.log(datos);
        const filtro = datos.filter((dato) => dato.id == localStorage.getItem("id_publicacion"));
        console.log(filtro);
        // setReportes(Array.isArray(filtro) ? filtro : filtro ? [filtro] : []);
        setReportes(filtro);
        setCantReportes(filtro[0].reporte)
      } catch (error) {
        console.error("Error al traer reportes:", error);
      }
    }
    traerReportes()
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
  } // Modal para abrir el editar de comentarios
  function abrirModal(usuario) {
    setUsuario(usuario);
    setEditComentario(usuario.contenido);
    setMostrar(true);
    console.log(editComentario);
  }

  // Eliminar Respuesta Comentario 
  async function eliminarRespuesta(respuestaId, comentarioId) {
    await deleteUser(respuestaId, "api/respuestascomentarios");
    await TraerRespuestas(comentarioId); // Actualiza solo las respuestas de ese comentario
  }

  // Editar Respuestas comentarios
  async function actualizarRespuestas(id) {
    const actRespuesta = {
      "contenido": editRespuesta
    }
    await patchData(actRespuesta, "api/respuestascomentarios", id);
    // Actualiza solo las respuestas del comentario correspondiente
    if (comentarioEditando) {
      await TraerRespuestas(comentarioEditando);
    }
    setRespuestaEditando(null);
    setComentarioEditando(null);
  } // Modal para abrir el editar de respuestas
  function abrirModalRespuestas(respuesta, comentarioId) {
    setUsuario(respuesta);
    setEditRespuesta(respuesta.contenido);
    setRespuestaEditando(respuesta.id);
    setComentarioEditando(comentarioId);
  }
  // REPORTES PATCH
  async function AggReporte() {
    console.log(reportes[0].reporte++);
    const reportePublicacion = {
      "reporte": reportes[0].reporte+=1-1,
      "publicacion": localStorage.getItem("id_publicacion"),
      "usuario": localStorage.getItem("id")
    }
    const act = await patchData(reportePublicacion, "api/publicaciones",localStorage.getItem("id_publicacion"))
    console.log(reportePublicacion);
    console.log(act);
    // All llegar a 20 reportes 
    // el estado de la publicacion cambie a pendiente
    if (reportes[0].reporte >= 20) {
      console.log("llegó");
      const cambiarEstado = await patchData({"estado_publicacion":"pendiente"},"api/publicaciones",localStorage.getItem("id_publicacion"))
      console.log(cambiarEstado);
    }
    setReload(prev => !prev)
  }
  
  return (
    <div className='noticiasContainer'>
      <div className='noticiasCard'>
        <div className='noticiasCardContent'>
          {Array.isArray(publicaciones) && publicaciones.map((p) => ( // Card que trae y contiene las publicaciones
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
              <h2>Haz Click para reportar esta Noticia</h2>
              <p>Número de Reportes: {cantReportes}</p>
              <h5>All llegar a 20 reportes se desaparecera la publicacion</h5>
              <button onClick={AggReporte} className='btnReportes'>Reportar</button>

              <h2>Comentarios</h2>
              <div>
                <input className='inputNoticiasFull' type="text" value={comentariosPublicaciones}
                  onChange={(e) => setComentariosPublicaciones(e.target.value)} placeholder='Agregar comentario' />
                <br />
                <button className='btnComentarioNoticiasFull' onClick={AggComentario}>Enviar Comentario</button>
              </div>

              <div className="comentariosContainer">
                {comentarios.map((comentario) => (
                  <div key={comentario.id} className="comentarioCard">
                    <div className="comentarioUsuario">{`Usuario #${comentario.usuario}`}</div>
                    <div className="comentarioContenido">{comentario.contenido}</div>

                    {/*Para que el boton de Eliminar solo se muestre al usuario que realizó el comentario*/}
                    {localStorage.getItem("id") == comentario.usuario && (
                      <button className='noticiasFullBtnEliminar' onClick={() => EliminarComentario(comentario.id)}>Eliminar</button>
                    )}
                    {/*Para que el boton de editar solo se muestre al usuario que realizó el comentario*/}
                    {localStorage.getItem("id") == comentario.usuario && (
                      <button className='noticiasFullBtnEdit' onClick={() => abrirModal(comentario)}>Editar</button>
                    )}
                    {mostrar &&
                      <> {/*Input y btn que se muestran al abrir el modal*/}
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
                                {respuestaEditando === respuesta.id ? (
                                  <>
                                    <input
                                      className='inputRespuestaEditNoticias'
                                      type="text"
                                      value={editRespuesta}
                                      onChange={(e) => setEditRespuesta(e.target.value)}
                                    />
                                    <button
                                      className='btnRespuestaConfirmarEdit'
                                      onClick={() => actualizarRespuestas(respuesta.id)}
                                    >
                                      Guardar
                                    </button>
                                    <button
                                      className='btnRespuestaCancelarEdit'
                                      onClick={() => setRespuestaEditando(null)}
                                    >
                                      Cancelar
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    {respuesta.contenido}
                                    <br />
                                    {/*Para solo mostrar el boton de eliminar en sus propios comentarios al usuario*/}
                                    {localStorage.getItem("id") == respuesta.usuario && (
                                      <>
                                        <button
                                          className='btnRespuestaEliminar'
                                          onClick={() => {
                                            eliminarRespuesta(respuesta.id, comentario.id);
                                          }}
                                        >
                                          Eliminar
                                        </button>
                                        <button
                                          className='btnRespuestaEditar'
                                          onClick={() => abrirModalRespuestas(respuesta, comentario.id)}
                                        >
                                          Editar
                                        </button>
                                      </>
                                    )}
                                  </>
                                )}
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
