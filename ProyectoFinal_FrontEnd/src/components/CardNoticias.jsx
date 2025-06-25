import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CardsNoticias({ title, text, imgSrc,getId }) {
  // Card en el que se contiene la informacion principal que viene del formulario de Noticias
  // su funcionalidad se encuentra en la página de Home
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
    </Card>
  );  
}

export default CardsNoticias;