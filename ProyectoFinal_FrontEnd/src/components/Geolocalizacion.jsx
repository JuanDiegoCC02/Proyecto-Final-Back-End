import { useState } from "react";
import "../styles/Geolocalizacion.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";


function Geolocalizacion() {
  const [posicion, setPosicion] = useState(null);
  // Funcion para el manejo del click map
  function ClickMap({ setPosicion }) {
    useMapEvents({
      click: (e) => {

          const nuevaPosicion = [e.latlng.lat, e.latlng.lng];
      setPosicion(nuevaPosicion);

      // localStorage
      localStorage.setItem("posicion", JSON.stringify(nuevaPosicion));

       // SAVE posicion
        setPosicion([e.latlng.lat, e.latlng.lng]); 
        console.log(nuevaPosicion)
        
        
      },
    });
    
    return null;  
  }


  return (
    <MapContainer
      center={[9.9236, -84.0749]} zoom={10} scrollWheelZoom={false} style={{ height: "250px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ClickMap setPosicion={setPosicion} />
      {posicion && (
        <Marker position={posicion}>
          <Popup>Ubicacion de la Publicacion.</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

export default Geolocalizacion;
