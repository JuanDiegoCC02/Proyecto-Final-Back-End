// Llamados Usuarios
async function GetUsuarios() {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/usuarios/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching user");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user", error);
    throw error;
  }
}



// Llamado Post de Usuarios
async function PostUsuarios(obj) {
    try {
        const response = await fetch ("http://127.0.0.1:8000/api/usuarios/",{
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify(obj)
        });
        if (!response.ok){
            throw new Error("Error fetching user")
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching user", error);
        throw error;
    }
}



// Llamado Uptade de Usuarios
async function UpdateUsuarios(obj, id) 
{
    try {
        const response = await fetch("http://127.0.0.1:8000/api/usuarios/"+id+"/", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });

     
        return await response.json();
    } catch (error) {
        console.error('Error update user:', error);
        throw error;
    }
}



//  Llamado Delete de Usuarios
async function DeleteUsuarios(id) {
    try {
        
        const response = await fetch(`http://127.0.0.1:8000/api/usuarios/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error deleting user with id ${id}`);
        }

        return { message: `User with id ${id} deleted successfully` };
    } catch (error) {
        console.error('Error deleting User:', error);
        throw error;
    }
}



// Exportacion de los llamados
export{
    GetUsuarios,
    PostUsuarios,
    UpdateUsuarios,
    DeleteUsuarios,
}