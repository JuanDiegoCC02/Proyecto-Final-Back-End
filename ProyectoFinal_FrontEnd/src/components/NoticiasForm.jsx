import React, { useState, useEffect } from 'react';
import { postUsers, getUsers } from '../services/MainLlamados';
import Geolocalizacion from '../components/Geolocalizacion';
import Cloudinary from './Cloudinary';
import "../styles/NoticiasForm.css";

function NoticiasForm() {
    const [TituloNoticia, setTituloNoticia] = useState("");
    const [DescripcionNoticia, setDescripcionNoticia] = useState("");
    const [TipoPublicacion, setTipoPublicacion] = useState([]);
    const [publicacion, setPublicacion] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [errores, setErrores] = useState({}); 

    function TituloF(e) {
        setTituloNoticia(e.target.value);
    }

    function DescripcionF(e) {
        setDescripcionNoticia(e.target.value);
    }

    async function enviar() {
        const guardaLatitud = JSON.parse(localStorage.getItem("posicion"));
        const guardarUsuario = JSON.parse(localStorage.getItem("id"));
        const guardarURL = localStorage.getItem("img");

        const obj = {
            titulo: TituloNoticia,
            descripcion: DescripcionNoticia,
            tipopublicacion: publicacion,
            usuario: guardarUsuario,
            latitud: guardaLatitud?.[0],
            longitud: guardaLatitud?.[1],
            img: guardarURL
        };

        try {
            const respuestaServer = await postUsers(obj, "api/publicaciones/");
            console.log("Publicación creada:", respuestaServer);

            setMensaje("Publicación creada con éxito");
            setErrores({}); // limpiar errores anteriores

            // REINICIAR CAMPOS
            setTituloNoticia("");
            setDescripcionNoticia("");
            setPublicacion("");

        } catch (error) {
            console.error("Error al crear publicación:", error);

            if (error instanceof Response) {
                const data = await error.json();
                setErrores(data);
                setMensaje("Hay errores en el formulario. Revisa los campos.");
            } else {
                setMensaje("Ocurrió un error inesperado.");
            }
        }
    }

    useEffect(() => {
        const fetchTiposPublicacion = async () => {
            try {
                const respuesta = await getUsers("api/tipopublicaciones");
                setTipoPublicacion(respuesta);
            } catch (error) {
                console.error("Error al obtener tipos de publicación:", error);
                setMensaje("Error al obtener el tipo de publicación.");
            }
        };

        fetchTiposPublicacion();
    }, []);

    return (
        <>
            <div className='mainContainerNoticia'>
                <h2 className='tituloNoticia'>Ingrese Noticia</h2>
                <div className='containerNoticia'>
                    <input
                        value={TituloNoticia}
                        className='inputTexto'
                        type="text"
                        onChange={TituloF}
                        placeholder='Titulo Noticia'
                    />
                    {errores.titulo && <p className='error-message-I'>{errores.titulo[0]}</p>}

                    <input
                        value={DescripcionNoticia}
                        className='inputTexto'
                        type="text"
                        onChange={DescripcionF}
                        placeholder='Descripción Noticia'
                    />
                    {errores.descripcion && <p className='error-message-I'>{errores.descripcion[0]}</p>}

                    <select
                        value={publicacion}
                        onChange={(e) => setPublicacion(e.target.value)}
                        className='selectNoticias'
                    >
                        <option value="" disabled>Tipo de Publicación</option>
                        {TipoPublicacion.map((tipo) => (
                            <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                        ))}
                    </select>
                    {errores.tipopublicacion && <p className='error-message-I'>{errores.tipopublicacion[0]}</p>}

                    <Geolocalizacion />
                    <Cloudinary />

                    <button onClick={enviar} className='noticiasBtn'>Enviar</button>

                    {mensaje && <p className='error-message-I'>{mensaje}</p>}
                </div>
            </div>
        </>
    );
}

export default NoticiasForm;
