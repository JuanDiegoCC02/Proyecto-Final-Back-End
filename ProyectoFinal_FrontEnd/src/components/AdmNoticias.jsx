import React, { useEffect, useState } from 'react'
import "../styles/AdminNoticias.css"
import { deleteUser, getUsers, patchData } from '../services/MainLlamados'

    // {`Coordenadas: ${p.latitud}, ${p.longitud}`}
    // src={p.img}
function AdmNoticias() {
// Para el get
    const [publicaciones, setPublicaciones] = useState([])
    const [reload, setReload] = useState (false)

    // Edit
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
      setEditNombre(usuario.nombre)
    }

    async function TraerPublicaciones() {
        const datos = await getUsers("api/publicaciones")
        setPublicaciones(datos)
    }
    TraerPublicaciones()
    }, [reload])

    async function ActualizarPublicaciones(id) {
        const actPublicacion = {
            "titulo" : editTitulo,
            "descripcion" : editDescripcion,
            "latitud" : editLatitud,
            "longitud" : editLongitud,
            "img" : editImg
        }
        await patchData(actPublicacion, "api/publicaciones", id)
        setReload(!reload)
        setMostrar(!mostrar)
    }

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

    async function EliminarPublicacion(id) {
        await deleteUser (id, "api/publicaciones")
        setReload(!reload)
    }
    
    // <input type="file" onChange={(e) => setEditImg(e.target.files[0])} placeholder='Editar IMG' />
    return (
   <div className='noticiasContainer'>
  <div className='noticiasCard'>
    <div className='noticiasCardContent'>
      {publicaciones.map((p) => (
        <div key={p.id} className='noticiasItem'>
          <h1>{p.titulo}</h1> 
          <h2>{p.descripcion}</h2>
          <p>{p.nombre_tipo_publicacion}</p>
          <h3>Ubicación</h3>
          <h2>{p.latitud}</h2>
          <h2>{p.longitud}</h2>
          <h5>Imagen:</h5>
          <img src={p.img} alt="Imagen de la noticia" className='noticiasIMG' width={200} />
          <hr />
          <button onClick={() => EliminarPublicacion(p.id)}>Eliminar</button>
          <button onClick={() => abrirModalPublicaciones(p)}>Editar</button>
          {mostrar &&
          <><br />  
          <input type="text" value={editTitulo} onChange={(e) => setEditTitulo(e.target.value)} placeholder='Editar Titulo' />
          <input type="text" value={editDescripcion} onChange={(e) => setEditDescripcion(e.target.value)} placeholder='Editar Descripcion' />
          <input type="text" value={editLatitud} onChange={(e) => setEditLatitud(e.target.value)} placeholder='Editar Latitud' />
          <input type="text" value={editLongitud} onChange={(e) => setEditLongitud(e.target.value)} placeholder='Editar Longitud' />
          
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

export default AdmNoticias