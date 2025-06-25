import React, { useEffect, useState } from 'react'
import "../styles/AdminNoticias.css"
import { deleteUser, getUsers, patchData } from '../services/MainLlamados'
import Geolocalizacion from './Geolocalizacion'
import MapaCards from './MapaCards'
import Cloudinary from './Cloudinary'

function PruebaNoticias() {
    // GET de publicaciones
        const [publicaciones, setPublicaciones] = useState([])
        const [reload, setReload] = useState (false)
    
    // EDIT de publicaciones
        const [editTitulo, setEditTitulo] = useState("")
        const [editDescripcion, setEditDescripcion] = useState("")
        const [editLatitud, setEditLatitud] = useState("")
        const [editLongitud, setEditLongitud] = useState("")
        const [editImg, setEditImg] = useState("")
        const [mostrar, setMostrar] = useState(false)
    
        const [usuario,setUsuario] = useState(null)

       
        useEffect(() => {
        if(usuario){
          console.log("entra al usuario");
          console.log(usuario);
          setEditTitulo(usuario.titulo)
        }
    
        // Funcion GET para que las publicaciones se muestren
        async function TraerPublicaciones() {
            const datos = await getUsers("api/publicaciones")
            setPublicaciones(datos)
        }
        TraerPublicaciones()
        }, [reload])
    
        // Funcion PATCH para poder editar la información de las publicaciones
        async function ActualizarPublicaciones(id) {
            const actPublicacion = {
                "titulo" : editTitulo,
                "descripcion" : editDescripcion,
                "latitud" : editLatitud,
                "longitud" : editLongitud,  
                "img" : localStorage.getItem("img") // Usar la imagen guardada en localStorage
            }
            await patchData(actPublicacion, "api/publicaciones", id)
            setReload(!reload)
            setMostrar(!mostrar)
        }  
    
        // Funcion para que al dar click al btn de editar se abra el modal con un input
        // y btn para poder agregar y confirmar la nueva informacion
        function abrirModalPublicaciones(usuario) {
            setUsuario(usuario)
            setEditTitulo(usuario.titulo)
            setEditDescripcion(usuario.descripcion)
            setEditLatitud(usuario.latitud)
            setEditLongitud(usuario.longitud)
            setEditImg(usuario.img)
            setMostrar(true)
            console.log(editTitulo);
        }
    
        // Funcion DELETE para poder eliminar publicaciones 
        async function EliminarPublicacion(id) {
            await deleteUser (id, "api/publicaciones")
            setReload(!reload)
        }
        
        // Cambiar los estados de las publicaciones
        async function estadoPublicacion(id, estado) {
        const actPublicacion =
             {"estado_publicacion": estado};

    try {
        await patchData(actPublicacion, "api/publicaciones", id); 
        setReload(prev => !prev); // Recargar datos solo si la actualización fue exitosa
    } catch (error) {
        console.error("Error al actualizar el estado de la publicación:", error);
    }
}
    const estados = ["pendiente", "rechazada", "publicada"];

async function cambiarEstado(id, estadoActual) {
    const nuevoEstado = estados[(estados.indexOf(estadoActual) + 1) % estados.length]; // Para alternar entre estados
    await estadoPublicacion(id, nuevoEstado);
}

  return (
 <div className='noticiasContainer'>
  <div className='noticiasCard'>
    <div className='noticiasCardContent'>
        
      {publicaciones.map((p) => (
        <div key={p.id} className='noticiasItem'>
          <p className='tipoPublicacion'>{p.nombre_tipo_publicacion}</p>
          <img src={p.img} alt="Imagen de la noticia" className='noticiasIMG' width={300} />
          <h1 className='tituloPublicacion'>{p.titulo}</h1> 
          <h2> {p.descripcion}</h2>
          <MapaCards latitud={p.latitud} longitud={p.longitud} />
          <hr />
          <button onClick={() => EliminarPublicacion(p.id)} className='eliminarBtn'>Eliminar</button>
          <button onClick={() => abrirModalPublicaciones(p)} className='editarBtn'>Editar</button>

          <div >
          <button className={`btn-estado ${p.estado_publicacion}`} 
            onClick={() => cambiarEstado(p.id, p.estado_publicacion)}>
            {p.estado_publicacion}
          </button>
          </div>
          <hr />
          <h1>--</h1>
          <hr />
          {mostrar &&
          <><br />  
          <input type="text" value={editTitulo} onChange={(e) => setEditTitulo(e.target.value)} placeholder='Editar Titulo' />
          <input type="text" value={editDescripcion} onChange={(e) => setEditDescripcion(e.target.value)} placeholder='Editar Descripcion' />
          <input type="text" value={editLatitud} onChange={(e) => setEditLatitud(e.target.value)} placeholder='Editar Latitud' />
          <input type="text" value={editLongitud} onChange={(e) => setEditLongitud(e.target.value)} placeholder='Editar Longitud' />
          <Cloudinary/>
            <br />
          <button onClick={() => ActualizarPublicaciones(usuario.id)}>Guardar</button>
          </>
          }

        </div>
      ))}
    </div>
  </div>
</div>

  )
}

export default PruebaNoticias