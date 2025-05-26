import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import RegistroPage from '../pages/RegistroPage';
import InicioSesionPage from '../pages/InicioSesionPage';

function Routing() {
  return (
   <Router>
        <Routes>
            <Route path = '/registro' element = {<RegistroPage/>}/> 
            <Route path = '/inicio' element = {<InicioSesionPage/>}/> 

        </Routes>
   </Router>

  )
}

export default Routing