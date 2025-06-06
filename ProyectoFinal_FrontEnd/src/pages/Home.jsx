import React from 'react'

import Footer from '../components/Footer'
import NavBar from '../components/Navbar'
import NoticiasTitulo from '../components/NoticiasTitulo'
import Bienvenidos from '../components/Bienvenidos'
import CardHome from '../components/CardHome'
import Img_info from '../components/Img_info'

function Home() {
  return (
    <div>
        <NavBar />
        <Bienvenidos />
        <CardHome />
        <Img_info />
        <NoticiasTitulo/>
        <Footer />
    </div>
  )
}

export default Home