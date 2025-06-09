import React, { useEffect, useState } from 'react'
import { getUsers } from '../services/MainLlamados'

import MapaCards from './MapaCards'


    function NoticiaFull() {
    const [publicaciones, setPublicaciones] = useState([])
    const [usuario,setUsuario] = useState(null)
    const [reload, setReload] = useState (false)


      useEffect(() => {
            if(usuario){
              console.log("entra al usuario");
              console.log(usuario);
              setEditTitulo(usuario.titulo)
            }
        
            async function TraerPublicaciones() {
                const datos = await getUsers("api/publicaciones")
                const filtrar = datos.filter((datos) => datos.estado_publicacion === "publicada");
                setPublicaciones(filtrar)
            }
            TraerPublicaciones()
            }, [reload])

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
              <h1>--</h1>

        </div>
      ))}
    </div>
  </div>
</div>

         
  )
}

export default NoticiaFull