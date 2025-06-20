import React, { useState } from 'react'
import ReactStars from 'react-stars'
import { postUsers } from '../services/MainLlamados'

function CalificacionStarReact() {
  const [rating,setRating] = useState(0)
  const ratingChanged = (newRating) => {
    setRating(newRating)
    console.log(newRating);
    
  } 

  async function enviarCalificacion() {
    const objCalificacion = {
        puntaje: rating,
        usuario:localStorage.getItem("id"),
        publicacion:  localStorage.getItem("id_publicacion")
    }
    console.log(objCalificacion);
    const peticion = await postUsers(objCalificacion,"/api/calificaciones/")
    console.log(peticion);
  }

  return (
    <>
    <div className="container mt-5">
      <h3>Calificación:</h3>
      <ReactStars
        count={5}
        onChange={ratingChanged}
        size={24}
        color2={'#ffd700'}
      />
    </div>
      <button className='btnCalificarNoticiasFull' onClick={()=>{
        enviarCalificacion()
      }}>Calificar</button>
      </>
  )
}

export default CalificacionStarReact
