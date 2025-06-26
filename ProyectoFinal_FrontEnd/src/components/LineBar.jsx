import { useEffect, useState } from "react";
import { getUsers } from "../services/MainLlamados";
import Chart from "react-apexcharts";
import "../styles/LineBar.css"

const LineBar = () => {
  const [seriesNoticias, setSeriesNoticias] = useState(0);
  const [seriesCampanas, setSeriesCampanas] = useState(0);

 useEffect(() => {
  async function list() {   
    const datos = await getUsers("api/publicaciones");
    const filtradoNoticias = datos.filter((item) => item.nombre_tipo_publicacion === "Noticias");
    const filtradoCampanas = datos.filter((item) => item.nombre_tipo_publicacion === "Campañas");

    setSeriesNoticias(filtradoNoticias.length);
    setSeriesCampanas(filtradoCampanas.length);
    console.log(filtradoNoticias.length)
  }

  list();
}, []);


    
return (  
  <div className="grafico-container">
    
    <div className="grafico-header">
      <h5>Publicaciones por tipo de publicación</h5>
    </div>
    <div className="grafico-chart">
      <Chart
        options={{  
          chart: { id: "basic-bar" },
          xaxis: { categories: ["Noticias", "Campañas"] },
          colors: ['#2B756B'], // color opcional
          plotOptions: {
            bar: {
              borderRadius: 3,
              horizontal: false,
              columnWidth: '35%',
            }
          },
          dataLabels: {
            enabled: true
          },
        }}
        series={[
          {
            name: "Publicaciones",
            data: [seriesNoticias, seriesCampanas]
          }
        ]}
        type="bar"
        width="200%"
        height="300"
      />
    </div>
    <hr />
  </div>
);

};

export default LineBar;