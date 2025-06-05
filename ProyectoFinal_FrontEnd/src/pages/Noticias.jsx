import React from 'react'
import NavBar from '../components/Navbar'
import NoticiasTitulo from '../components/NoticiasTitulo'
import NoticiasForm from '../components/NoticiasForm'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'



function Noticias() {
  return (
 <div>
  <nav>
    <NavBar/>
    
   </nav>,

  <main>
    <Sidebar />
    <NoticiasForm/>
     <NoticiasTitulo />
    
   
    
    </main>

    <footer>
      <Footer/>
    </footer>
   </div>
  )
}

export default Noticias