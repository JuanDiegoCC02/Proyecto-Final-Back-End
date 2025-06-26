// ApexChart.jsx
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { GetUsuarios } from '../services/llamados_usuarios';
import "../styles/LineBarUsers.css"

const LineBarUsers = ({ title }) => {
  const [chartData, setChartData] = useState({
    series: [],
    categories: [],
  });

  useEffect(() => {
    async function list() {
      const datos = await GetUsuarios();

      // Agrupar usuarios por fecha 
      const conteoPorFecha = {};

      datos.forEach((usuario) => {
        
        const fecha = new Date(usuario.date_joined).toISOString().split('T')[0];
        conteoPorFecha[fecha] = (conteoPorFecha[fecha] || 0) + 1;
      });

      // Ordenar fechas y construir datos
      const fechasOrdenadas = Object.keys(conteoPorFecha).sort();
      const conteos = fechasOrdenadas.map((fecha) => conteoPorFecha[fecha]);

      setChartData({
        series: [{ name: 'Usuarios registrados', data: conteos }],
        categories: fechasOrdenadas,
      });
    }

    list();
  }, []);

  const options = {
    chart: {
      height: 350,
      type: 'line',
      zoom: { enabled: false },
    },
    colors: ['#448354'], // Color de la Linea del Grafico verde oscuro 
    dataLabels: { enabled: false },
    stroke: { curve: 'straight' },
    title: {
      text: title || 'Regitro de Usuarios por Fecha',
      align: 'left',
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // Fondo del fondo blanco
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: chartData.categories,
      title: { text: 'Fecha de registro' },
    },
    yaxis: {
      title: { text: 'Cantidad de usuarios' },
    },
  };

  return (
    <div className='grafico-usuarios-container'>
      <ReactApexChart options={options} series={chartData.series} type="line" height={350}  />
    </div>
  );
};

export default LineBarUsers;
