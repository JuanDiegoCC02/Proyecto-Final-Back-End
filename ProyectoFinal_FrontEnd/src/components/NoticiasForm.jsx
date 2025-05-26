import React from 'react'
import "../styles/NoticiasForm.css"



function NoticiasForm() {
    return (
        <>
         <div className='mainContainerNoticia'>
            <h2 className='tituloNoticia'>Insertar Nombre Noticia</h2>
                <div className='containerNoticia'>
                <input className='inputTexto' type="text" placeholder='Nombre Noticia' />
                <select className='selectNoticias' name="" id="">
                    <option value="" selected disabled  >Seleccione</option>
                    <option value="noticia">Noticia</option>
                    <option value="campana">Campaña</option>
                </select>
                <input className='inputFile' type="file" />
                <button className='noticiasBtn'>Enviar</button>
                </div>
            </div>
        </>

    )
}

export default NoticiasForm