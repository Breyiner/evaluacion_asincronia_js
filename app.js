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