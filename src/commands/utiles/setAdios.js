module.exports = {
    name: 'setdespedida',
    aliases: ['sd','setbye','sd'],
    category: 'utiles',
    description: 'Para kickear a un usuario del servidor',

    run: async (client, message, args) => {
      const db = require('megadb')
        if (!message.member.permissions.has("ADMINISTRATOR"))
      return message.channel.send({embed: {
      color: "RED",
      description: `**No tienes los permisos suficientes para Setear la Despedidas**, ${message.author.username}`
    }
})
      let setDesp = message.mentions.channels.first();
      if (!setDesp){
      return message.channel.send({embed: {
      color: "RED",
      description: ":gear: | **Debes especificar un canal donde enviar las Despedidas**"
    }
})
      }
      
      let bd_db = new db.crearDB("setDespedidas");  
      if (setDesp === setDesp) {
      } else {
      return message.channel.send(":no_entry: | **Las Despedidas ya estan seteadas en ese canal**")
      }
      bd_db.establecer(`${message.guild.id}`,setDesp.id) 
      owner = message.guild.owner.user
      owner.send(`Se ha establecido las Despedidas en: ${args[0]} `)
      return message.channel.send({embed: {
      color: "RED",
      description: `:white_check_mark: | **Se ha establecido las Despedidas en: ${args[0]}** `
    }
})
      }
  }