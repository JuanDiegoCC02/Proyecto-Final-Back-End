import React from 'react'
import NavBar from '../components/Navbar'
import NoticiasTitulo from '../components/NoticiasTitulo'
import NoticiasForm from '../components/NoticiasForm'
import Footer from '../components/Footer'



function Noticias() {
  return (
 <div>
  <nav>
    <NavBar/>
    
   </nav>,

  <main>
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