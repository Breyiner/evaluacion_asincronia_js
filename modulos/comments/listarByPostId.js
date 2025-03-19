import { solicitud } from "../index.js"; // Importamos la función "solicitud" desde el archivo principal del directorio modulos "index.js".

export const getCommentsByPostId = async (url, postId) => { // Definimos una función asíncrona que recibe dos parámetros, "url" y "postId".
    try { // Iniciamos un bloque try para manejar posibles errores.
        // Verificamos si "url" no está definida o si "postId" no es un número.
        if (!url || typeof postId !== "number") {
            throw new Error("Parámetros inválidos"); // Si la condición anterior se cumple, lanzamos un error con un mensaje específico.
        }
        // Hacemos una solicitud a la API usando la función "solicitud", interpolamos la "url" y el "postId" para obtener los comentarios del post.
        const respuesta = await solicitud(`${url}/comments?postId=${postId}`); 
        return respuesta; // Retornamos la respuesta obtenida de la solicitud.
    } catch (error) { // Capturamos cualquier error que ocurra en el bloque try.
        console.error(`Error al obtener los posts -> ${error}`); // Mostramos un mensaje de error en la consola con detalles del error.
    }                
}