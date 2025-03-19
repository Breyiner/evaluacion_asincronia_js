import { solicitud } from "../index.js"; // Importamos la función "solicitud" desde el archivo principal del directorio módulos "index.js".

export const getTareasByUserIdStatus = async (url, userId, status) => { // Definimos una función asíncrona llamada "getTareasByUserIdStatus" que recibe tres parámetros, "url", "userId" y "status".
    try { // Iniciamos un bloque try para manejar posibles errores.
        // Verificamos si "url" no está definida o si "userId" no es un número.
        if (!url || typeof userId !== "number") {
            throw new Error("Parámetros inválidos"); // Si la condición anterior se cumple, lanzamos un error con un mensaje específico.
        }
        // Hacemos una solicitud a la API usando la función "solicitud", interpolando la "url", "userId" y "status" para obtener las tareas del usuario con el estado especificado.
        const respuesta = await solicitud(`${url}/todos?userId=${userId}&completed=${status}`); 
        return respuesta; // Retornamos la respuesta obtenida de la solicitud.
    } catch (error) { // Capturamos cualquier error que ocurra en el bloque try.
        console.error(`Error al obtener las tareas pendientes: ${error}`); // Mostramos un mensaje de error en la consola con detalles del error.
    }
}