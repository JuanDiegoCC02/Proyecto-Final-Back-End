import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import RegistroPage from '../pages/RegistroPage';
import InicioSesionPage from '../pages/InicioSesionPage';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import Moderador from '../pages/Moderador';

function Routing() {
  return (
   <Router>
        <Routes>
            <Route path = '/registro' element = {<RegistroPage/>}/> 
            <Route path = '/inicio' element = {<InicioSesionPage/>}/> 

            <Route path="/" element={<Home/>}/>
            <Route path="/contacto" element={<Contact/>}/>
            <Route path="/moderador" element={<Moderador/>}/>

        </Routes>
   </Router>

  )
}

export default Routing