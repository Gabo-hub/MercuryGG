const Discord = require('discord.js')
module.exports = {
        name: "clear",
        description: "Bulk delete messages",
  run: async (clien, message, args) => {
    const permisoBot = new Discord.MessageEmbed()
      .setDescription(
        ":x: | **No tengo permisos para hacer clear**"
      )
      .setColor("RED");
    if(!message.guild.me.permissionsIn(message.channel).has('MANAGE_MESSAGES')){
        return message.channel.send(permisoBot)
      }

      const permisoUser = new Discord.MessageEmbed()
      .setDescription(
        ":x: | **No tienes permisos para hacer clear**"
      )
      .setColor("RED");
      
      if(!message.member.permissionsIn(message.channel).has('MANAGE_MESSAGES')){
        return message.channel.send(permisoUser)
      }
      
      if(!args) return message.channel.send({embed: {
      color: "RED",
      description: ":no_entry: | **Escriba la cantidad de mensajes a eliminar**"
    }
    })
      let cantidad = parseInt(args[0])
      
      if(!cantidad || isNaN(cantidad)) return message.channel.send({embed: {
      color: "RED",
      description: ':no_entry: | **Introduce un numero por favor**'
    }
    })
      
      if(cantidad > 100){
        message.channel.send({embed: {
      color: 3447003,
      description: ':no_entry: | **El maximo de mensajes que puedo borrar es 100, por lo tanto lo establecere automaticamente ahi**'
    }
    })
        cantidad = 100
      }
      
      message.channel.messages.fetch({
        limit: cantidad + 1
      }).then(mensajes => {
        message.channel.bulkDelete(
          mensajes.filter(m => !m.pinned) //para no borrar los mensajes anclados
        ).then(() => {
          message.channel.send(`:white_check_mark: | **Listo, borre los ${cantidad} mensajes :ok_hand:**`).then(m => m.delete({timeout: 10000}))
        }).catch(e => {
          message.channel.send('Ocurrio un error y no pude borrar los mensajes')
        })
      })
    }
}
