module.exports = {
    name: 'setbienvenidas',
    aliases: ['sb','setwelcome','sw'],
    category: 'utiles',
    description: 'Para kickear a un usuario del servidor',

    run: async (client, message, args) => {
      const db = require('megadb')
        if (!message.member.permissions.has("ADMINISTRATOR"))
      return message.channel.send({embed: {
      color: "RED",
      description: `**No tienes los permisos suficientes para Setear la Bienvenidas**, ${message.author.username}`
    }
})
      let setBien = message.mentions.channels.first();
      if (!setBien){
      return message.channel.send({embed: {
      color: "RED",
      description: ":gear: | **Debes especificar un canal donde enviar las Bienvenidas**"
    }
})
      }
      
      let bd_db = new db.crearDB("setbienvenidas");  
      if (setBien === setBien) {
      } else {
      return message.channel.send(":no_entry: | **Las Bienvenidas ya estan seteadas en ese canal**")
      }
      bd_db.establecer(`${message.guild.id}`,setBien.id) 
      owner = message.guild.owner.user
      if(owner == true) {
        owner.send(`Se ha establecido las Bienvenidas en: ${args[0]} `)
      } else {
        
      }
      
      return message.channel.send({embed: {
      color: "RED",
      description: `:white_check_mark: | **Se ha establecido las Bienvenidas en: ${args[0]}** `
    }
})
      }
  }
