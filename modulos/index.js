export { URL, solicitud } from './helpers/index.js'; // Exportamos la constante "URL" y la función "solicitud" desde el archivo "index.js" en el directorio "helpers" para que puedan ser utilizadas en otros módulos.

export { getUsuarios, getUsersByUsername } from './usuarios/index.js'; // Exportamos las funciones "getUsuarios" y "getUsersByUsername" desde el archivo "index.js" en el directorio "usuarios".

export { getTareasByUserIdStatus } from './tareas/index.js'; // Exportamos la función "getTareasByUser IdStatus" desde el archivo "index.js" en el directorio "tareas".

export { getPosts, getPostsByTitle, getPostsByUserId } from './posts/index.js'; // Exportamos las funciones "getPostsByTitle" y "getPostsByUser Id" desde el archivo "index.js" en el directorio "posts".

export { getCommentsByPostId } from './comments/index.js'; // Exportamos la función "getCommentsByPostId" desde el archivo "index.js" en el directorio "comments".

export { getAlbumsByUserId } from './albums/index.js'; // Exportamos la función "getAlbumsByUser Id" desde el archivo "index.js" en el directorio "albums".

export { getPhotosByAlbumId } from './fotos/index.js'; // Exportamos la función "getPhotosByAlbumId" desde el archivo "index.js" en el directorio "fotos".