import React from 'react'
import Navbar from '../components/Navbar'
import ModeradorViews from  '../components/ModeradorViews'
import StripedColumnsExample from '../components/TablaUsuariosCom'
import Footer from '../components/Footer'
import "../styles/Moderador.css"
import Sidebar from '../components/Sidebar'

function Moderador() {
  return (
    <div>

    <nav>
    <Navbar/>
    </nav>

    <main className='cont-tablita'>
    <Sidebar />
    <StripedColumnsExample/>
    </main>

    <footer>
    <Footer />
    </footer>

    </div>
  )
}

export default Moderador