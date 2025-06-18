import React from 'react'
import NavBar from '../components/Navbar'
import NoticiasTitulo from '../components/NoticiasTitulo'
import NoticiasForm from '../components/NoticiasForm'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'

import { useState,useEffect } from 'react'
import { getUsers } from '../services/MainLlamados'
import CardsNoticias from '../components/CardNoticias'
import { useNavigate } from 'react-router-dom'


function Noticias() {
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
  <nav>
    <NavBar/>
    
   </nav>,

  <main>
    <Sidebar />
    <NoticiasForm/>
     <NoticiasTitulo />
     <div className='d-flex flex-row gap-3 flex-wrap mx-auto justify-content-center'>
        {noticias.map((noticia) => {
          return (
            <CardsNoticias key={noticia.id} title={noticia.titulo} text={noticia.descripcion} imgSrc={noticia.img} getId={() => {
              localStorage.setItem("id_publicacion", noticia.id)
              navigate('/noticiafull')
            }} />
          );
        })}
        </div>
   
    
    </main>

    <footer>
      <Footer/>
    </footer>
   </div>
  )
}

export default Noticias