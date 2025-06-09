import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import RegistroPage from '../pages/RegistroPage';
import InicioSesionPage from '../pages/InicioSesionPage';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import Moderador from '../pages/Moderador';
import Noticias from '../pages/Noticias';
import TablaUsuarios from '../pages/tablaUsuarios';
import TablaComentarios from '../pages/TablaComentarios';
import NoticiasAdmin from '../pages/NoticiasAdmin';
import PruebaNoticias from '../components/PruebaNoticias';
import NoticiaFull from '../components/NoticiaFull';

function Routing() {
  return (
   <Router>
        <Routes>
            <Route path = '/registro' element = {<RegistroPage/>}/> 
            <Route path = '/inicio' element = {<InicioSesionPage/>}/> 
            <Route path = '/noticias' element = {<Noticias/>}/> 

            <Route path="/" element={<Home/>}/>
            <Route path="/contacto" element={<Contact/>}/>
            <Route path="/moderador" element={<Moderador/>}/>
            <Route path="/tablausuarios" element={<TablaUsuarios/>}/>
            <Route path="/tablacomentarios" element={<TablaComentarios/>}/>
            <Route path="/admin" element={<NoticiasAdmin/>}/>
            <Route path="/prueba" element={<PruebaNoticias/>}/>
            <Route path="/noticiafull" element={<NoticiaFull/>}/>


        </Routes>
   </Router>

  )
}

export default Routing