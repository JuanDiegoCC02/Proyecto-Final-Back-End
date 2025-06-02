import React from 'react'
import "../styles/NoticiasForm.css"



function NoticiasForm() {

    

    return (
        <>
         <div className='mainContainerNoticia'>
            <h2 className='tituloNoticia'>Insertar Noticia</h2>
                <div className='containerNoticia'> 
                <input className='inputTexto' type="text" placeholder='Titulo Noticia' />
                 <input className='inputTexto' type="text" placeholder='Descripción Noticia' />
                <select className='selectNoticias' name="" id="">
                    <option value="" selected disabled  >Tipo de Publicación</option>
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