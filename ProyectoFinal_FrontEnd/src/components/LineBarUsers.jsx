// ApexChart.jsx
import React from 'react';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { GetUsuarios } from '../services/llamados_usuarios';

const LineBarUsers = ({ title, data, categories }) => {
    const [seriesUsuarios, setSeriesUsuarios] = useState(0);
 useEffect(() => {
  async function list() {   
    const datos = await GetUsuarios("api/usuarios");

    const filtradoUsuarios = datos.filter((item) => item.nombre_usuarios === "Usuarios");
    

  
    setSeriesUsuarios(filtradoUsuarios.length);

  }

  list();
}, []);

  const options = {
    chart: {
      height: 350,
      type: 'line',
      zoom: { enabled: false },
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'straight' },
    title: {
      text: title || 'Grafica Usuarios',
      align: 'left',
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: categories || ["total"],
    },
  };

  const series = [
    {
      name: 'Usuarios',
      data: data || [seriesUsuarios],
    },
  ];

  return (
    <div>
      <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default LineBarUsers;
