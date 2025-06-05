import React, {useState, useEffect} from 'react'
import  {postUsers, getUsers } from '../services/MainLlamados'
import Geolocalizacion from '../components/Geolocalizacion'
import "../styles/NoticiasForm.css"
import { useNavigate } from "react-router-dom";
import Cloudinary from './Cloudinary';




function NoticiasForm() {
    const [TituloNoticia, setTituloNoticia] = useState("")
    const [DescripcionNoticia, setDescripcionNoticia] = useState("")
    const [TipoPublicacion, setTipoPublicacion] = useState([])
    const [publicacion, setPublicacion] = useState("")

    const navigate = useNavigate();
    



    function TituloF(e) {
        setTituloNoticia(e.target.value)
    }
       function DescripcionF(e) {
        setDescripcionNoticia(e.target.value)
    }
       function TipoPublicacionF(e) {
        setTipoPublicacion(e.target.value)
    }

    async function enviar (){
        const guardaLatitud =  JSON.parse(localStorage.getItem("posicion"))
        const guardarLongitud =  JSON.parse(localStorage.getItem("posicion"))
        const guardarUsuario = JSON.parse(localStorage.getItem("id"))
        const guardarURL = localStorage.getItem("img")
        
        const obj = {
            titulo: TituloNoticia,
            descripcion: DescripcionNoticia,
            tipopublicacion: publicacion,
            usuario: guardarUsuario,
            latitud: guardaLatitud[0],
            longitud: guardarLongitud[1],
            img : guardarURL
        }
        console.log(obj);
        console.log("Latitud", guardaLatitud);
        console.log("Longitud", guardarLongitud);
        console.log (guardarUsuario);
        try {
        const respuestaServer = await postUsers(obj,"api/publicaciones/");
      
        console.log("Post User", respuestaServer);
        
    } catch (error) {
        console.error("Error", error);
        setMensaje("No se envio la noticia.");
    }
    }
    
    useEffect(() => {
    const fetchTiposPublicacion = async () => {
        try {
            const respuesta = await getUsers("api/tipopublicaciones");
            setTipoPublicacion(respuesta);  
            console.log(respuesta)
        } catch (error) {
            console.error("Error al obtener tipos de publicación:", error);
        }
    };

    fetchTiposPublicacion();
}, []);

    

    return (
        <>
         <div className='mainContainerNoticia'>
            <h2 className='tituloNoticia'>Ingrese Noticia</h2>
                <div className='containerNoticia'> 
                <input className='inputTexto' type="text" onChange={TituloF} placeholder='Titulo Noticia' />
                 <input className='inputTexto' type="text" onChange={DescripcionF}  placeholder='Descripción Noticia' />

               <select onChange={(e)=>setPublicacion(e.target.value)} className='selectNoticias' defaultValue="">
                <option value="" disabled>Tipo de Publicación</option>
                {TipoPublicacion.map((tipo) => (
                    <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                ))}
                </select>


                 <Geolocalizacion/>
                 <Cloudinary/>
                

                <button onClick={enviar} className='noticiasBtn'>Enviar</button>


                
                </div>
            </div>

            
                
            
        </>

    )
}

export default NoticiasForm