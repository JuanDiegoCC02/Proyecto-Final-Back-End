import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { postUsers } from '../services/MainLlamados';
import React, { useState} from 'react'

function CardsNoticias({ title, text, imgSrc,getId }) {
  //Prueba
  const [comentarios, setComentarios] = useState("")

  async function AgregarComentario() {
    const comentario = {
      "contenido": comentarios,
      "publicacion": localStorage.getItem("id_publicacion"),
      "usuario": localStorage.getItem("id")
    }
    await postUsers(comentario, "api/comentarios/")
    
  } 

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={imgSrc} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {text}
        </Card.Text>
        <Button variant="primary" onClick={getId}>Ver más</Button>
      </Card.Body>
      <input type="text" onChange={(e) =>setComentarios(e.target.value)} placeholder='Agregar comentario' />
      <button onClick={AgregarComentario} style={{width:"60%"}}>Enviar Comentario</button>
    </Card>
  );  
}

export default CardsNoticias;