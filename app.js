import * as mod from "./modulos/index.js"; // Importamos todas las exportaciones del archivo "index.js" en el directorio "modulos" y las asignamos al objeto "mod".

let opcion, url = mod.URL; // Declaramos las variables "opcion" y "url". Asignamos a "url" el valor de "URL" que hemos importado desde "mod".

const solicitarParametro = indicador => { // Definimos una función llamada "solicitarParametro" que recibe un parámetro "indicador".
    let respuesta; // Declaramos una variable "respuesta" para almacenar la entrada del usuario.
    let regexParametro = /\D/i; // Creamos una expresión regular que verifica si el valor ingresado no es un dígito (es decir, contiene caracteres no numéricos).
    do {
        respuesta = prompt(`Ingrese el ${indicador}:`); // Pedimos al usuario que ingrese un valor, mostrando el indicador correspondiente.
    } while (!respuesta || !regexParametro.test(respuesta)); // Continuamos pidiendo el valor mientras "respuesta" esté vacía o contenga solo dígitos.

    return respuesta; // Retornamos la respuesta válida ingresada por el usuario.
}

const tareasPendientes = async () => { // Definimos una función asíncrona llamada "tareasPendientes".
    try { // Iniciamos un bloque try para manejar posibles errores.
        const usuarios = await mod.getUsuarios(url); // Obtenemos la lista de usuarios llamando a la función "getUsuarios" con la URL proporcionada.

        return await Promise.all( // Utilizamos Promise.all para esperar a que todas las promesas se resuelvan.
            usuarios.map(async user => { // Iteramos sobre cada usuario utilizando el método "map".
                const pendings = await mod.getTareasByUserIdStatus(url, user.id, false); // Obtenemos las tareas pendientes del usuario llamando a "getTareasByUser IdStatus".

                return { // Retornamos un nuevo objeto que combina los datos del usuario con sus tareas pendientes.
                    ...user, // Usamos el operador de propagación para incluir todas las propiedades del usuario.
                    tareasPendientes: pendings // Añadimos una nueva propiedad "tareasPendientes" que contiene las tareas pendientes del usuario.
                }
            })
        );
    } catch (error) { // Capturamos cualquier error que ocurra en el bloque try.
        console.error(`Error al obtener las tareas pendientes -> ${error}`); // Mostramos un mensaje de error en la consola con detalles del error.
    }
}

const usuariosPorUsername = async () => { // Definimos una función asíncrona llamada "usuariosPorUsername".
    try { // Iniciamos un bloque try para manejar posibles errores.
        let username = solicitarParametro("username"); // Llamamos a la función "solicitarParametro" para obtener el nombre de usuario del usuario.
        const usuarios = await mod.getUsersByUsername(url, username); // Obtenemos la lista de usuarios que coinciden con el nombre de usuario.

        return await Promise.all( // Utilizamos Promise.all para esperar a que todas las promesas se resuelvan.
            usuarios.map(async usuario => { // Iteramos sobre cada usuario utilizando el método "map".
                const allAlbums = await mod.getAlbumsByUserId(url, usuario.id); // Obtenemos todos los álbumes del usuario.

                let albumsConFotos = await Promise.all( // Utilizamos Promise.all para esperar a que todas las promesas de álbumes se resuelvan.
                    allAlbums.map(async album => { // Iteramos sobre cada álbum.
                        const albumFotos = await mod.getPhotosByAlbumId(url, album.id); // Obtenemos las fotos del álbum.

                        return { ...album, albumFotos }; // Retornamos un nuevo objeto que combina el álbum con sus fotos.
                    })
                );
                return { ...usuario, albumsConFotos }; // Retornamos un nuevo objeto que combina el usuario con sus álbumes que contienen fotos.
            })
        );
    } catch (error) { // Capturamos cualquier error que ocurra en el bloque try.
        console.error(`Error al obtener los usuarios por nombre de usuario -> ${error}`); // Mostramos un mensaje de error en la consola con detalles del error.
    }
}

const postPorTitulo = async () => { // Definimos una función asíncrona llamada "postPorTitulo".
    try { // Iniciamos un bloque try para manejar posibles errores.
        let titulo = solicitarParametro("titulo del post"); // Llamamos a la función "solicitarParametro" para obtener el título del post del usuario.
        const allPosts = await mod.getPostsByTitle(url, titulo); // Obtenemos todos los posts que coinciden con el título proporcionado.

        return await Promise.all( // Utilizamos Promise.all para esperar a que todas las promesas se resuelvan.
            allPosts.map(async post => { // Iteramos sobre cada post utilizando el método "map".
                const comentarios = await mod.getCommentsByPostId(url, post.id); // Obtenemos los comentarios del post llamando a "getCommentsByPostId".

                return { ...post, comentarios }; // Retornamos un nuevo objeto que combina el post con sus comentarios.
            })
        );
    } catch (error) { // Capturamos cualquier error que ocurra en el bloque try.
        console.error(`Error al obtener el post por título -> ${error}`); // Mostramos un mensaje de error en la consola con detalles del error.
    }
}

const nombreTelefonoUsuario = async () => { // Definimos una función asíncrona llamada "nombreTelefonoUsuario".
    try { // Iniciamos un bloque try para manejar posibles errores.
        const usuarios = await mod.getUsuarios(url); // Obtenemos la lista de usuarios llamando a la función "getUsuarios" con la URL proporcionada.

        return await Promise.all( // Utilizamos Promise.all para esperar a que todas las promesas se resuelvan.
            usuarios.map(async usuario => { // Iteramos sobre cada usuario utilizando el método "map".
                return { // Retornamos un nuevo objeto que contiene el nombre y el teléfono del usuario.
                    nombre: usuario.name, // Asignamos el nombre del usuario.
                    telefono: usuario.phone // Asignamos el teléfono del usuario.
                };
            })
        );
    } catch (error) { // Capturamos cualquier error que ocurra en el bloque try.
        console.error(`Error al obtener el nombre y teléfono de los usuarios -> ${error}`); // Mostramos un mensaje de error en la consola con detalles del error.
    }
}