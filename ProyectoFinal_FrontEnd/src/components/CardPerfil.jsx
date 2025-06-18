import React, { useEffect, useState } from 'react';
import { GetUsuarios, UpdateUsuarios } from '../services/llamados_usuarios';
import Cloudinary from './Cloudinary'; 

import { getUsers } from '../services/MainLlamados';    //LLamado de para publicaciones


function CardPefil() {
  const [usuarios, setUsuarios] = useState (null);
  const [publicaciones, setPublicaciones] = useState([]);
  const [reload, setReload] = useState(false);

  const [mostrar, setMostrar] = useState(null); 
  const [edicionAliasUsuario, setEdicionAliasUsuario] = useState('');
  const [edicionNombre, setEdicionNombre] = useState('');
  const [edicionEmail, setEdicionEmail] = useState('');
  const [editImg, setEditImg] = useState('');

  const idLogueado = Number(localStorage.getItem('id'));

  



  useEffect(() => {
    //Funcion usuario
    async function traerUsuario() {
      if (!idLogueado) return;
      const data_users = await GetUsuarios(`api/users/${idLogueado}`);
      const info_Usuario = data_users.filter(user => user.id === idLogueado);
      setUsuarios(info_Usuario);
      console.log("Usuario", info_Usuario);
    }

    //Funcion publicaciones
     async function traerPublicaciones() {
    const data_publicaciones = await getUsers('api/publicaciones');
    const publicacionesUsuario = data_publicaciones.filter(publicacion => publicacion.usuario === idLogueado);
    setPublicaciones(publicacionesUsuario);
    console.log("publicaciones", publicacionesUsuario )
  }
  traerPublicaciones();
  traerUsuario();
  }, [reload]);


  // Función de actualizar
  async function actualizar(id) {
    const imagenActualizada = localStorage.getItem('img') || editImg;

    const usuarioActualizado = {
      username: edicionAliasUsuario,
      first_name: edicionNombre,
      email: edicionEmail,
      img: imagenActualizada,
    };
    await UpdateUsuarios(usuarioActualizado, id);
    setReload(!reload);
    setMostrar(null); 
  }


  return (

    <div>
     <ul className="listaUsuarios">
  {usuarios && usuarios.map(user => (
      <li key={user.id} className="usuarioItem">
            <div><strong>Usuario:</strong> {user.username}</div>
            <div><strong>Nombre:</strong> {user.first_name}</div>
            <div><strong>Email:</strong> {user.email}</div>

         <strong>Cantidad de Publicaciones:</strong> {publicaciones.length}


            <div><strong>Tipo de Usuario:</strong> {user.tipo_usuario}</div>
            <div><strong>Calificacion:</strong> {user.tipo_usuario}</div>


         {/*------Prueba de Foto Perfil-------*/}
            <div>
              <strong>Foto de Perfil:</strong><br />
              <img src={user.img} alt="Perfil" className="perfilIMG" width={150} />
            </div>


            <button className='tablaUsuariosEditBtn' onClick={() => {
                setMostrar(user.id);
                setEdicionAliasUsuario(user.usuario_alias);
                setEdicionNombre(user.usuario_nombre);
                setEdicionEmail(user.usuario_email);
                setEditImg(user.img);
              }}  >Editar </button>

              {mostrar === user.id && ( 
              <>

                <input type="text" className='inputTablaUsuarios' value={edicionAliasUsuario} 
                  onChange={(e) => setEdicionAliasUsuario(e.target.value)} placeholder='Editar Alias Usuario'/> <br />

                <input type="text" className='inputTablaUsuarios' value={edicionNombre} 
                  onChange={(e) => setEdicionNombre(e.target.value)} placeholder='Editar Nombre'/>  <br />

                <input type="text" className='inputTablaUsuarios' value={edicionEmail} 
                  onChange={(e) => setEdicionEmail(e.target.value)} placeholder='Editar Email' /> <br />


          {/*Prueba Foto de Perfil*/}
                <Cloudinary />
                <button className='tablaUsuariosConfirmBtn' onClick={() => actualizar(user.id)}> Confirmar Edit </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CardPefil;
