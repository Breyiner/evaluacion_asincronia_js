// Definimos una función asíncrona llamada "solicitud" 
// Esta función recibe un parámetro, url (la URL a la que se hará la solicitud)
export const solicitud = async url => {
    // Hacemos una solicitud a la URL usando fetch y esperamos la respuesta
    const peticion = await fetch(url);
    
    // Verificamos si la respuesta fue exitosa
    if (!peticion.ok) {
        throw new Error("Error en la solicitud"); // Si no fue exitosa, lanzamos un error con un mensaje específico
    }

    // Convertimos la respuesta en formato JSON y esperamos a que se complete
    const data = await peticion.json();
    
    // Devolvemos los datos obtenidos en formato JSON
    return data;
}