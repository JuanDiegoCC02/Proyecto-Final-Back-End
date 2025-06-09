import React from 'react'
import { useState } from 'react'

const Cloudinary = () => {

    const preset_name = "cloudinary01";
    const cloud_name = "dqkqgx1as"

    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false)


    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', preset_name);

        setLoading(true);
        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
                method: 'POST',
                body: data
            });
            const result = await response.json();
            setImage(result.secure_url);
            setLoading(false);

             localStorage.getItem("img")


            console.log(result);
            console.log('Url Imagen:', result.secure_url);
            localStorage.setItem("img", result.secure_url); // Guardar la URL en localStorage
        } catch (error) {
            console.error('Error uploading image:', error);
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Upload Image</h1>

            {/*1 - El siguiente input type file envia la imagen por el evento al handler uploadImage */}

            <input
                type="file"
                name="file"
                placeholder="Upload an image"
                onChange={uploadImage}
            />

            {/* ------------------------------------------------------------------------------------ */}


            {/* 9 - Si loading true, Mostramos Loading, si no mostramos la imagen la cual su url deberia estar cargada en un estado local */}
            {loading ? (
                <h3>Loading...</h3>
            ) : (
                <img src={image} alt="imagen subida" />
            )}
            {/* ------------------------------------------------------------------------------------ */}
        </div>
    );
}

export default Cloudinary
