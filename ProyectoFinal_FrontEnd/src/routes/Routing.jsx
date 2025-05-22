import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import RegistroPage from '../pages/RegistroPage';

function Routing() {
  return (
   <Router>
        <Routes>
            <Route path = '/registro' element = {<RegistroPage/>}/> 
        </Routes>
   </Router>

  )
}

export default Routing