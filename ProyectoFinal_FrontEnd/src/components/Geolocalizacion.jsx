import { useEffect, useState } from "react";
import L from "leaflet";
import "../styles/Geolocalizacion.css";
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function Geolocalizacion() {
  return (
   <MapContainer center={[9.9236, -84.0749]} zoom={10} scrollWheelZoom={false} style={{ height: "200px", width: "80%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[9.9236, -84.0749]}>
        <Popup>
          Ubicación. <br /> Noticia Ambiental.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default Geolocalizacion;
