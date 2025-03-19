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

const allDataUser = async () => { // Definimos una función asíncrona llamada "allDataUser".
    try { // Iniciamos un bloque try para manejar posibles errores.
        const usuarios = await mod.getUsuarios(url); // Obtenemos la lista de usuarios llamando a la función "getUsuarios" con la URL proporcionada.
        
        return await Promise.all( // Utilizamos Promise.all para esperar a que todas las promesas se resuelvan.
            usuarios.map(async usuario => { // Iteramos sobre cada usuario utilizando el método "map".

                const allPosts = await mod.getPostsByUserId(url, usuario.id); // Obtenemos todos los posts del usuario.

                let postsConComentarios = await Promise.all( // Utilizamos Promise.all para esperar a que todas las promesas de posts se resuelvan.
                    allPosts.map(async post => { // Iteramos sobre cada post.
                        const commentsPost = await mod.getCommentsByPostId(url, post.id); // Obtenemos los comentarios del post.

                        return { ...post, commentsPost }; // Retornamos un nuevo objeto que combina el post con sus comentarios.
                    })
                );

                const allAlbums = await mod.getAlbumsByUserId(url, usuario.id); // Obtenemos todos los álbumes del usuario.

                let albumsConFotos = await Promise.all( // Utilizamos Promise.all para esperar a que todas las promesas de álbumes se resuelvan.
                    allAlbums.map(async album => { // Iteramos sobre cada álbum.
                        const albumFotos = await mod.getPhotosByAlbumId(url, album.id); // Obtenemos las fotos del álbum.

                        return { ...album, albumFotos }; // Retornamos un nuevo objeto que combina el álbum con sus fotos.
                    })
                );

                // Devolvemos el usuario junto con sus posts y comentarios, y sus álbumes y fotos
                return { ...usuario, postsConComentarios, albumsConFotos }; // Retornamos un nuevo objeto que combina el usuario con sus posts y álbumes.
            })
        );
    } catch (error) { // Capturamos cualquier error que ocurra en el bloque try.
        console.error(`Error al obtener todos los datos relacionados al usuario -> ${error}`); // Mostramos un mensaje de error en la consola con detalles del error.
    }
}

while (true) { // Iniciamos un bucle infinito que se ejecutará hasta que se rompa con un "break".
    
    do {
        opcion = parseInt(prompt("Ingrese el número del ejercicio que desea ejecutar (1 - 5 ó 0 para salir):")) ?? ""; // Pedimos al usuario que ingrese un número de ejercicio y lo convertimos a un entero.
    } while (Number.isNaN(opcion) || opcion > 5 || opcion < 0); // Continuamos pidiendo la opción mientras no sea un número válido (NaN) o esté fuera del rango permitido (0-5).
    
    if (opcion == 0) { // Si el usuario ingresa 0, finalizamos el programa.
        alert("Programa finalizado con éxito."); // Mostramos un mensaje de éxito.
        break; // Salimos del bucle.
    } 

    else { // Si la opción es válida (1-5), ejecutamos el ejercicio correspondiente.
        console.log(`Ejercicio ${opcion}:`); // Mostramos en la consola el número del ejercicio que se va a ejecutar.
        switch (opcion) { // Usamos un switch para determinar qué ejercicio ejecutar.
            case 1:
                await tareasPendientes().then(data => console.log(data)); // Llamamos a la función "tareasPendientes" y mostramos los datos en la consola.
                break;
        
            case 2:
                await usuariosPorUsername().then(data => data.length != 0 ?
                    console.log(data) : console.log("No hay información relacionada") // Llamamos a "usuariosPorUsername" y mostramos los datos o un mensaje si no hay información.
                );
                break;
        
            case 3:
                await postPorTitulo().then(data => data.length != 0 ?
                    console.log(data) : console.log("No hay información relacionada") // Llamamos a "postPorTitulo" y mostramos los datos o un mensaje si no hay información.
                );
                break;
        
            case 4:
                await nombreTelefonoUsuario().then(data => console.log(data)); // Llamamos a "nombreTelefonoUsuario" y mostramos los datos en la consola.
                break;
        
            case 5:
                await allDataUser().then(data => console.log(data)); // Llamamos a "allDataUser" y mostramos los datos en la consola.
                break;
        }
    }
}