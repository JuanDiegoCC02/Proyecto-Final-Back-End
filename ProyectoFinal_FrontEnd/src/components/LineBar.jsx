import { useEffect, useState } from "react";
import { getUsers } from "../services/MainLlamados";
import Chart from "react-apexcharts";

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
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={{  
              chart: { id: "basic-bar" },
              xaxis: { categories: ["Noticias", "Campañas"] }
            }}
            series={[
              {
                name: "Publicaciones",
                data: [seriesNoticias, seriesCampanas]
              }
            ]}
            type="bar"
            width="500"
          />
        </div>
      </div>
    </div>
  );
};

export default LineBar;