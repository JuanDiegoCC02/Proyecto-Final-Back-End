import React from 'react'

import Footer from '../components/Footer'
import NavBar from '../components/Navbar'
import NoticiasTitulo from '../components/NoticiasTitulo'
import Bienvenidos from '../components/Bienvenidos'
import CardHome from '../components/CardHome'
import Img_info from '../components/Img_info'
import { useState,useEffect } from 'react'
import { getUsers } from '../services/MainLlamados'
import CardsNoticias from '../components/CardNoticias'
import { useNavigate } from 'react-router-dom'
function Home() {
  const [noticias,setNoticias] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    async function traeNoticias() {
      const peticion = await getUsers("api/publicaciones")
      const filtro = peticion.filter((peticion)=> peticion.estado_publicacion === "publicada")
      setNoticias(filtro)
    }
    traeNoticias()
  }, [])

  return (
    <div>
        <NavBar />
        <Bienvenidos />
        <CardHome />
        <Img_info />
        <NoticiasTitulo/>
        <div className='d-flex flex-row gap-3'>
        {noticias.map((noticia) => {
          return (
            <CardsNoticias key={noticia.id} title={noticia.titulo} text={noticia.descripcion} imgSrc={noticia.img} getId={() => {
              localStorage.setItem("id_publicacion", noticia.id)
              navigate('/noticiafull')
            }} />
          );
        })}
        </div>


        <Footer />
    </div>
  )
}

export default Home