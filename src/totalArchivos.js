function totalArchivos(ruta,extension) {
const fs = require("fs"); //Requerimos el modulo fs -> npm i fs
const cDirectorio = fs.readdirSync(ruta);//Definimos cDirectorio, que devolvera una lista de las carpetas/directorios
var n = 0 //Inicializamos la variable n que contendrá el total de los archivos con la extensión especificada
for (var i = 0; i < cDirectorio.length; i++) {
//El bucle se empleara para recorrer las carpetas contenidas en la lista cDirectorio
    var cadena = ruta + cDirectorio[i] + "/" 
//La variable cadena contiene el path de el directorio especificado
    var contenido = fs.readdirSync(cadena).filter(file => file.endsWith(extension))
//Contenido devuelve el total de archivos en cada carpeta con su extension especifica
    n += contenido.length; //Declaracion del contador que acumula la suma de los archivos de la carpeta
   }
return n
}
module.exports = {
    "totalA": totalArchivos
} //Exportamos la funcion totalArchivos con el alias de totalA

/**
 *  Uso de la funcion en otro archivo
 * const total = require('../../totalArchivos.js') con la ruta especifica del archivo
 * message.channel.send(`Archivos en total: ${total.totalA('./commands/',".js")}`) tener en cuenta la ruta y la extension de los archivos que se desean filtrar
*/



// console.log(cDirectorio[i].toUpperCase() + "-\n Archivos:(" + String(contenido) + ")\n Total:" + String(contenido.length))
//console.log(n)

