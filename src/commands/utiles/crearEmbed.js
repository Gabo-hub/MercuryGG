const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'embed',
    aliases: ['cembed'],
    category: 'moderacion',
    description: 'Para kickear a un usuario del servidor',
  run: async (bot, message, args) => {
    let permisos = message.member.hasPermission("MANAGE_MESSAGES")
    if (!permisos) return message.channel.send({embed: {
      color: "RED",
      description: '<a:yamete:712626713044975697> | **No tienes permisos suficientes para crear un Embed'
    }
})  

    //Esta variable es para ir entre nuestro progreso con el embed
    let i = 0;

    if(!args[0]){
      return message.channel.send({embed: {
      color: "RED",
      description: ':x: | **Debes mencionar un canal para enviar el embed!**'
    }
})  
    }

    //Si en caso pongamos un canal para enviar el embed
    const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name === args[0]) || message.channel;

    //Dato: También puedes mencionar un canal de otro servidor, algo así como hacer bot.channels.<propiedad>
    if(channel.guild.id !== message.guild.id) return message.channel.send("Debes mencionar un canal valido!");

    //Para los parámetros que requieran un link, usaremos este RegExp para validar
    const linkregex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/g

    //Las preguntas, cambienlas a su gusto
    let questions = ["Para salir coloca `salir` \nPara omitir algo colca: `nada` (excepto en los campos) \nDime un mensaje aparte del Embed", "Dime el autor del mensaje", "Dime un link o manda una imagen para colocarlo en la imagen del autor", "Dime un link para el autor", "Dime el Titulo del Embed", "Dime el enlace de el Embed", "Dime la descripción del Embed", "Dime un link o manda una imagen para colocarlo en la miniatura", "Dime un enlace de imagen o sube un archivo adjunto para colocarlo de imagen principal", "Dime el pie del Embed", "Dime un link o manda una imagen para colocarlo en el pie del Embed", "Dime el color con el que quieres el Embed", "Quieres Agregar más Campos al Embed? \`si o no\`"];

    //Enviamos nuestro mensaje y asignamos más variables. Nos servirán para ir entre datos.
    var embedComienza = new MessageEmbed()
    .setColor('RED')
    .setDescription(`${questions[0]}`)
    .setImage(`https://i.imgur.com/gD62FWd.png`)
    await message.channel.send(embedComienza)
    let msgContent = "";
    let author = "";
    let authorimg = "";
    let authorlink = "";
    let footer = "";

    //A medida que se hagan los cambios los pondremos en este embed.
    const embed = new MessageEmbed();

    //Creamos nuestro colector
    let collector = message.channel.createMessageCollector((m) => m.author.id === message.author.id, { idle: 120000 })
    collector.on("collect", async m => {
      //Para salir de aquí.
      if(m.content === "salir") return collector.stop("Exited");

      //Una condicional grande :)
      switch(i) {
        case 0:
          //Estaremos usando este formato, si ponen nada saltar el paso. Pero primero, siempre definiendo como se debe.
          if(m.content === "nada") {
            msgContent = undefined
          } else {
            msgContent = m.content;
          }

          //Sumar progreso
          i++

          //Enviar el siguiente mensaje
          await message.channel.send(questions[i])
          break;
          case 1:
          if(m.content === "nada") {
            //No puedes poner un autor sin primero el texto de quien es, nos saltamos los pasos.
            i = i + 3;
            await message.channel.send(questions[i]);
          } else {
            author = m.content
            i++;
            await message.channel.send(questions[i]);
          }
          break;
          case 2:
          if(m.content === "nada") {
            authorimg = undefined;
            i++
            await message.channel.send(questions[i]);
            //Lo haremos compatible tanto a links como a archivos adjuntos
          } else {
            if(!m.attachments.first() && !linkregex.test(m.content)) return message.channel.send("URL Invalida");
            else if (m.attachments.first()) {
              authorimg = m.attachments.first().url;
              i++
            } else if (linkregex.test(m.content)) {
              authorimg = m.content;
              i++;
            }
            await message.channel.send(questions[i]);
          }
          break;
          case 3:
          if(m.content === "nada") {
            authorlink = undefined;
            i++

            //Definiriamos las cosas de esta forma. Y lo mismo para los otros casos
            embed.setAuthor(author, authorimg, authorlink);
            await message.channel.send(questions[i]);
          } else {
            if(!linkregex.test(m.content)) return message.channel.send("URL Invalida");
            else {
              authorlink = m.content; 
              i++
            }
            embed.setAuthor(author, authorimg, authorlink);
            await message.channel.send(questions[i]);
          }
          break;
          case 4:
          if(m.content === "nada") {
            i++
          } else {
            embed.setTitle(m.content);
            i++
          }
          await message.channel.send(questions[i]);
          break;
          case 5:
          if(m.content === "nada") {
            i++
          } else if (linkregex.test(m.content)){
            embed.setURL(m.content);
            i++
          } else return message.channel.send("Invalid URL");
          await message.channel.send(questions[i]);
          break;
          case 6:
          if(m.content === "nada") {
            i++
          } else {
            embed.setDescription(m.content);
            i++
          }
          await message.channel.send(questions[i]);
          break;
          case 7:
          if(m.content === "nada") {
            i++
            await message.channel.send(questions[i]);
          } else {
            if(!m.attachments.first() && !linkregex.test(m.content)) return message.channel.send("Invalid URL");
            else if (m.attachments.first()) {
              embed.setThumbnail(m.attachments.first().url);
              i++
            } else if (linkregex.test(m.content)) {
               embed.setThumbnail(m.content);
              i++;
            }
            await message.channel.send(questions[i]);
          }
          break;
          case 8:
          if(m.content === "nada") {
            i++
            await message.channel.send(questions[i]);
          } else {
            if(!m.attachments.first() && !linkregex.test(m.content)) return message.channel.send("Invalid URL");
            else if (m.attachments.first()) {
              embed.setImage(m.attachments.first().url);
              i++
            } else if (linkregex.test(m.content)) {
               embed.setImage(m.content);
              i++;
            }
            await message.channel.send(questions[i]);
          }
          break;
          case 9:
          if(m.content === "nada") {
            footer = undefined
            i = i + 2;
          } else {
            footer = m.content;
            i++
          }
          await message.channel.send(questions[i]);
          break;
          case 10:
          if(m.content === "nada") {
            i++
            embed.setFooter(footer)
            await message.channel.send(questions[i]);
          } else {
            if(!m.attachments.first() && !linkregex.test(m.content)) return message.channel.send("Invalid URL");
            else if (m.attachments.first()) {
              embed.setFooter(footer, m.attachments.first().url)
              i++
            } else if (linkregex.test(m.content)) {
               embed.setFooter(footer, m.content)
              i++;
            }
            await message.channel.send(questions[i]);
          }
          break;
        case 11:
          if(m.content !== "nada") embed.setColor(m.content);
          i++
          await message.channel.send(questions[i]);
          break;
          case 12:
          //Finalizar el colector, para definir que acciones haremos pondremos una razón de porqué finalizó el colector
          if(m.content.toLowerCase() === "si") {
            collector.stop("field")
          } else if (m.content.toLowerCase() === "no") {
            collector.stop("Finished");
          } else return message.channel.send("Opcion Invalida!");
          break;
      }
    })
   collector.on("end", async (collected, reason) => {
      //Uso "exit" para no crear un embed
      if (reason === "Exited") {
        message.channel.send("Veo que no quieres un embed :(.");

        //Quiere fields. Para este caso llamaremos a una función que retornará una promesa. Si se resuelve devuelve el embed, si no devolverá "una razón". Asi lo programe....
      } else if(reason === "field") {
        fields(message, embed).then(embed => {
          channel.send(msgContent, embed);
        }).catch(reason => {
          //El usuario se demora mucho.
          if (reason === "idle") {
        message.channel.send("e tardaste mucho, Solo tienes [2 minutos].\nEjecuta este comando nuevamente si quieres un nuevo Embed");
      } else {
        //Caso raro de que termine por otra razón...
        message.channel.send("El Colector termino por: " + reason).catch(err => {});
      }
        });
      }
      else if(reason === "Finished") {
        //Terminó de hacer el embed
        channel.send(msgContent, embed);
      } else if (reason === "idle") {
        //El usuario se demora mucho
        message.channel.send("Te tardaste mucho, Solo tienes [2 minutos].\nEjecuta este comando nuevamente si quieres un nuevo Embed");
      } else {
        //Caso raro de que termine por otra razón...
        message.channel.send("El Colector termino por: " + reason).catch(err => {});
      }
    })
  },
  description: "Create a embed",
  aliases: [],
}

//función que usaremos para crear fields
function fields(message, embed) {
  return new Promise((resolve, reject) => {
    //Variables.
    let o = 1;
    let i = 0;
    let title = "";
    let des = "";

    //Se puede cambiar al gusto
    let arr = ["Dime el Nombre del Campo", "Dame el Valor del Campo", "Quieres que sea un campo horizontal? \`si o no\`", "Quieres otro campo? \`si o no\`"];
    message.channel.send(arr[i]);

    //Otro colector
    let collector = message.channel.createMessageCollector((m) => m.author.id === message.author.id, { idle: 120000 });
    collector.on("collect", m => {
      switch(i) {
        case 0:
          title = m.content
          i++;
          message.channel.send(arr[i]);
          break;
        case 1:
          des = m.content
          i++;
          message.channel.send(arr[i]);
          break;
        case 2:
          if(m.content.toLowerCase() === "si") {
            embed.addField(title, des, true)
            i++;
          } else if (m.content.toLowerCase() === "no") {
            embed.addField(title, des)
            i++;
          } else return message.channel.send("Opcion Invalida!");
          //No puedes crear más de 25 fields
          if (o <= 25) message.channel.send(arr[i]);
          else collector.stop("OK");
          break;
        case 3:
          //Si el usuario quiere más fields
          if(m.content.toLowerCase() === "si") {
            o++
            title = undefined
            des = undefined
            i = 0;
            message.channel.send(arr[i]);
          } else if (m.content.toLowerCase() === "no") {
            collector.stop("OK");
          } else return message.channel.send("Opcion Invalida!");
          break;
      }
    })
    collector.on("end", (collected, reason) => {
      if(reason === "OK") {
        //Resolver promesa con el nuevo embed :)
        resolve(embed);
      } else {
        //Denegar en caso algo haya sucedido.
        reject(reason);
      }
    })
  })
}
