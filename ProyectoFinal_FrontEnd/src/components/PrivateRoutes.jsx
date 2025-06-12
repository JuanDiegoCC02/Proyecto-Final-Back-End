import React from 'react'
import { Link } from 'react-router-dom'

//Privada
    function PrivateRoutes({children}) {
        function usuarioValido() {
            const usuario = localStorage.getItem("admin")
            if (usuario) {
                return true
            }else{
                return false
            }
    }    
  return (
    <>
   {usuarioValido() ? children : <div>GO TO REGISTER <Link to={"/registro"}>Usted no tiene los permisos para ver esta página</Link></div>}
   </>

)
}

export default PrivateRoutes