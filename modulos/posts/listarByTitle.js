import { getPosts } from "../index.js"; // Importamos la función "getPosts" desde el archivo principal del directorio módulos "index.js".

export const getPostsByTitle = async (url, title) => { // Definimos una función asíncrona llamada "getPostsByTitle" que recibe dos parámetros, "url" y "title".
    try { // Iniciamos un bloque try para manejar posibles errores.
        // Verificamos si "url" no está definida o si "title" no es una cadena.
        if (!url || typeof title !== "string") {
            throw new Error("Parámetros inválidos"); // Si la condición anterior se cumple, lanzamos un error con un mensaje específico.
        }
        const allPosts = await getPosts(url); // Obtenemos todos los posts llamando a la función "getPosts".

        let regexTitle = new RegExp(title, "i"); // Creamos una expresión regular para buscar el título, con la opción "i" para que ignore las mayúsculas.

        const coincidencesPost = allPosts.filter(post => regexTitle.test(post.title)); // Filtramos los posts que coinciden con el título.

        return coincidencesPost; // Retornamos los posts que coinciden con el título.
    } catch (error) { // Capturamos cualquier error que ocurra en el bloque try.
        console.error(`Error al obtener los posts por título -> ${error}`); // Mostramos un mensaje de error en la consola con detalles del error.
    }
}