import React from 'react'
import "../styles/CardHome.css"


function CardHome() {
  return (
    <div className='CardContainer'>
        <div className='Card'>
        <div className='CardContent'>
        <h1>La mejor página de Noticias Ambientales en el país</h1>
        <hr className='CardBars' />
        <h2></h2>
        <h2>Somos una página de noticias ambientales donde los usuarios pueden reportar y realizar publicaciones de los 
        últimos incidentes ambientales que suceden en todo el país.
        </h2>
            <a href="" className='readMoreCard'></a>
        </div>
        <img className='UnflavoredCardImg' src="../src/logos/JphUnflavoredPowder.png" alt="" />
        </div>
   
        <div className='Card'>
        <div className='CardContent'>
            <h1>Ser un medio veridico y confiable al servicio de la población</h1>
            <hr className='CardBars' />
            <h2></h2>
            <br />
            <h2>Nos consideramos muy estrictos con la moderación de cada publicación realizada al igual que cumplan 
              con los terminos y condiciones de nuestra página.
            </h2>
            <a href="" className='readMoreCard'></a>
          
        </div>
        <img  className='ElectroCardImg' src="../src/logos/ElectrolytesCardImg.png" alt="" />

        </div>


    </div>
  )
}

export default CardHome