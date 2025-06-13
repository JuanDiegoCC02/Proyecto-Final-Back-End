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
import PrivateRoutes from '../components/PrivateRoutes';
function Routing() {
  return (
   <Router>
        <Routes>
            {/*Rutas Privadas*/}
            <Route path="/admin" element={<PrivateRoutes children={<NoticiasAdmin/>} rol="administrador"/>}/>
            <Route path="/moderador" element={<PrivateRoutes children={<Moderador/>} rol="administrador"/>}/>
            <Route path="/tablacomentarios" element={<PrivateRoutes children={<TablaComentarios/>} rol="administrador"/>}/>
            <Route path="/tablausuarios" element={<PrivateRoutes children={<TablaUsuarios/>} rol="administrador"/>}/>

            {/*Rutas Publicas*/}
            <Route path="/" element={<Home/>}/>
            <Route path = '/registro' element = {<RegistroPage/>}/> 
            <Route path = '/inicio' element = {<InicioSesionPage/>}/> 
            <Route path = '/noticias' element = {<Noticias/>}/> 
            <Route path="/contacto" element={<Contact/>}/>
            <Route path="/noticiafull" element={<NoticiaFull/>}/>


        </Routes>
   </Router>

  )
}

export default Routing