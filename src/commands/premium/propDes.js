const db = require('megadb')
const Discord = require('discord.js')
module.exports = {
    name: 'propdespedida',
    aliases: ['pd','propbye'],
    category: 'utiles',
    description: 'Para kickear a un usuario del servidor',

    run: async (client, message, args,prefix) => {
      const db = require('megadb')
        let premium_db = new db.crearDB("premiums");;
                  if (!premium_db.tiene(message.author.id)){
      const { clean } = require('../../eventos/Utils.js')
      const nonono = new Discord.MessageEmbed
      nonono.setTitle('<:bye_bean:767487899599110174> |Menu de Propiedades Despedidas')
      nonono.addField('En Que Consiste?','<:NekoByeBye:767487899586265098>Este comando Sirve Para personalizar completamente el mensaje de Despedida de tu servidor <:NekoByeBye:767487899586265098>',false)
      nonono.addField('<a:KingproteaGao1:746848320735019061>Como puedo Conseguir El Premium?','Habla con Mi Creador \`Gabo#8763\` y El te dara todo los detalles',false)
      return message.channel.send(nonono)
      }

      if (!message.member.permissions.has("ADMINISTRATOR"))
      return message.channel.send({embed: {
      color: "RED",
      description: `:no_entry: | **No tienes los permisos suficientes para realizar este comando**, ${message.author.username}`
    }
})    
      if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
      return message.channel.send({embed: {
      color: "RED",
      description: ":x: | **No tengo los permisos suficientes para ejecutar este comando!**"
    }
})     
}
      if(!args[0]) {
      return  message.channel.send({embed: {
      color: "RED",
      description: `:gear: | **Coloca Las Propiedades de la Despedida: ${prefix}pd "Titulo" "Descripcion" "Link para el Fondo"**`
    }
})        
      }


      let titulo = args.slice(0).join(" ")
      const array = titulo.split('"')
      console.log(array)
      if(array[1] === undefined || array[3]  === undefined || array[5]  === undefined){
        return message.channel.send({embed: {
      color: "RED",
      description: `:gear: | **Tienes que colocar las comillas para separar las configuraciones:\n\`${prefix}pd "Bye" "Espero que hayas disfrutado" "bye.png"\`**`
    }
})    

      }

      let tienedb = new db.crearDB("setDespedidas");
      if (!tienedb.tiene(`${message.guild.id}`)) {
       return message.channel.send({embed: {
      color: "RED",
      description: `:no_entry: | **No tienes las Despedidas Seteadas**`
    }
})
      }
      let bd_db = new db.crearDB("despedidas");  
      bd_db.establecer(`${message.guild.id}.datos.foto`, array[5])
      bd_db.establecer(`${message.guild.id}.datos.titulo`, array[1])
      bd_db.establecer(`${message.guild.id}.datos.desc`, array[3])
       message.channel.send({embed: {
      color: "RED",
      description: `Se ha establecido las Propiedades con Exito: \n**Titulo:**${array[1]}\n**Descripcion:**${array[3]}\n**Foto:**${array[5]}`
    }
})
    }
}