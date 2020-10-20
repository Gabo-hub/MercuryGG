const shorten = require("isgd");
module.exports = {
    name: 'short',
    aliases: ['cortar'],
    category: 'moderacion',
    description: 'Para kickear a un usuario del servidor',

    run: async (client, message, args) =>{
      if(!args[0]) return message.channel.send({embed: {
      color: "RED",
      description: ':link: | **Coloca un Link para poder Cortar: \`Link\` + \`Nombre (Opcional)\`**'
    }
})
      if(!args[1]) { //Si no pone un texto para link personalizado.
      shorten.shorten(args[0], 
      function(res) {
      if (res.startsWith('Error:')) return  message.channel.send({embed: {
      color: "RED",
      description: '<a:shocked:746848367480406051> | **Usa una URL válida.**'
    }
})
      message.channel.send({embed: {
      color: 3447003,
      title: 'Link',
      description: res
         }
      });
       })
      } else { //Por si si ponen un texto para link personalizado
      shorten.custom(args[0], args[1], function(res) { //esta funcion acorta el link con el texto personalizado
       if (res.startsWith('Error:')) return message.channel.send(`**${res}**`); 
      
      message.channel.send({embed: {
      color: 3447003,
      title: 'Link',
      description: res
        }
      }); //Envia el link personalizado y acortado 
    })
  }




    }
}