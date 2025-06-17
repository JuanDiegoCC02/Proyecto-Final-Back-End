import React, { useEffect, useState } from 'react'
import { getUsers, deleteUser } from '../services/MainLlamados'
import "../styles/NoticiaFull.css"
import MapaCards from './MapaCards'


    function NoticiaFull() {
    const [publicaciones, setPublicaciones] = useState([])
    const [usuario,setUsuario] = useState(null)
    const [reload, setReload] = useState (false)

    //Get Comentarios
    const [comentarios,setComentarios] = useState([])


      useEffect(() => {
            if(usuario){
              console.log("entra al usuario");
              console.log(usuario);
            }
        
            async function TraerPublicaciones() {
                const datos = await getUsers("api/publicaciones",localStorage.getItem("id_publicacion")+"/")
                console.log(datos);
                setPublicaciones(Array.isArray(datos) ? datos : datos ? [datos] : [])
            }
            async function TraerComentarios() {
              const datos = await getUsers("api/comentarios")
              console.log(localStorage.getItem("id_publicacion"));
              
              const filtro = datos.filter((dato) => dato.publicacion === parseInt(localStorage.getItem("id_publicacion")))
              console.log(datos);
              console.log(filtro);
              setComentarios(Array.isArray(filtro) ? filtro : filtro ? [filtro] : [])
            }
            TraerPublicaciones()
            TraerComentarios()
            }, [reload])

      async function EliminarComentario(id) {
        await deleteUser(id, "api/comentarios")
        setReload(!reload)
      }

  return (
  <div className='noticiasContainer'>
  <div className='noticiasCard'>
    <div className='noticiasCardContent'>
        
      {Array.isArray(publicaciones) && publicaciones.map((p) => { 
        return(
        <div key={p.id} className='noticiasItem'>
          <p className='tipoPublicacion'>{p.nombre_tipo_publicacion}</p>
          <img src={p.img} alt="Imagen de la noticia" className='noticiasIMG' width={300} />
          <h1 className='tituloPublicacion'>{p.titulo}</h1> 
          <h2> {p.descripcion}</h2>
          <MapaCards latitud={p.latitud} longitud={p.longitud} />
          <hr />
              <h1>--</h1>
              <h2>Comentarios</h2>
             <div className="comentariosContainer">
  {comentarios.map((comentario) => (
    <div key={comentario.id} className="comentarioCard">
      <div className="comentarioUsuario">{`Usuario #${comentario.usuario}`}</div>
      <div className="comentarioContenido">{comentario.contenido}</div>
      <button className='noticiasFullBtnEliminar' onClick={() => EliminarComentario(comentario.id)}>Eliminar</button>
    </div>
  ))}
</div>

        </div>
        )
      })}
    </div>
  </div>
</div>

         
  )
}

export default NoticiaFull