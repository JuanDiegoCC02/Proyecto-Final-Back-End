import React from 'react'
import AdmNoticias from '../components/AdmNoticias'
import NavBar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import PruebaNoticias from '../components/PruebaNoticias'

function NoticiasAdmin() {
  return (
    <div>

    <NavBar />
    <Sidebar />
    <PruebaNoticias />
    <Footer />

    </div>
  )
}

export default NoticiasAdmin