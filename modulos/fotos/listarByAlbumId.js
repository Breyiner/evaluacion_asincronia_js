import { solicitud } from "../index.js"; // Importamos la función "solicitud" desde el archivo principal del directorio módulos "index.js".

export const getPhotosByAlbumId = async (url, albumId) => { // Definimos una función asíncrona que recibe dos parámetros, "url" y "albumId".
    try { // Iniciamos un bloque try para manejar posibles errores.
        // Verificamos si "url" no está definida o si "albumId" no es un número.
        if (!url || typeof albumId !== "number") {
            throw new Error("Parámetros inválidos"); // Si la condición anterior se cumple, lanzamos un error con un mensaje específico.
        }
        // Hacemos una solicitud a la API usando la función "solicitud", interpolamos la "url" y el "albumId" para obtener las fotos del álbum.
        const respuesta = await solicitud(`${url}/photos?albumId=${albumId}`); 
        return respuesta; // Retornamos la respuesta obtenida de la solicitud.
    } catch (error) { // Capturamos cualquier error que ocurra en el bloque try.
        console.error(`Error al obtener los albums -> ${error}`); // Mostramos un mensaje de error en la consola con detalles del error.
    }                
}