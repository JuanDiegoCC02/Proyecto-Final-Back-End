import React from 'react'
import Navbar from '../components/Navbar'
import ModeradorViews from  '../components/ModeradorViews'
import StripedColumnsExample from '../components/tablaUsuarios'
import Footer from '../components/Footer'
import "../styles/Moderador.css"

function Moderador() {
  return (
    <div>

    <nav>
    <Navbar/>
    </nav>

    <main className='cont-tablita'>
    <StripedColumnsExample/>
    </main>

    <footer>
    <Footer />
    </footer>

    </div>
  )
}

export default Moderador