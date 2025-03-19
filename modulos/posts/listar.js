import { solicitud } from "../index.js"; // Importamos la función "solicitud" desde el archivo principal del directorio módulos "index.js".

export const getPosts = async url => { // Definimos una función asíncrona llamada "getPosts" que recibe un parámetro, "url".
    try { // Iniciamos un bloque try para manejar posibles errores.
        // Verificamos si "url" no está definida.
        if (!url) {
            throw new Error("Parámetro 'url' inválido"); // Si "url" no está definida, lanzamos un error con un mensaje específico.
        }
        return await solicitud(`${url}/posts`); // Hacemos una solicitud a la URL interpolando el endpoint "/posts" y retornamos la respuesta obtenida.
    } catch (error) { // Capturamos cualquier error que ocurra en el bloque try.
        console.error(`Error al obtener los posts -> ${error}`); // Mostramos un mensaje de error en la consola con detalles del error.
    }
}