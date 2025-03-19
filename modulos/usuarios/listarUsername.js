import { solicitud } from "../index.js"; // Importamos la función "solicitud" desde el archivo principal del directorio módulos "index.js".

export const getUsersByUsername = async (url, username) => { // Definimos una función asíncrona llamada "getUsersByUsername" que recibe dos parámetros, "url" y "username".
    try { // Iniciamos un bloque try para manejar posibles errores.
        // Verificamos si "url" no está definida o si "username" no es una cadena.
        if (!url || typeof username !== "string") {
            throw new Error("Parámetros inválidos"); // Si la condición anterior se cumple, lanzamos un error con un mensaje específico.
        }
        // Hacemos una solicitud a la API usando la función "solicitud", interpolando la "url" y el "username" para obtener los usuarios que coinciden con el nombre de usuario.
        return await solicitud(`${url}/users?username=${username}`); 
    } catch (error) { // Capturamos cualquier error que ocurra en el bloque try.
        console.error(`Error al obtener los usuarios por nombre de usuario -> ${error}`); // Mostramos un mensaje de error en la consola con detalles del error.
    }
}