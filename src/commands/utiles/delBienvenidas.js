module.exports = {
    name: 'delbienvenidas',
    aliases: ['delb'],
    category: 'utiles',
    description: 'Para kickear a un usuario del servidor',

    run: async (client, message, args) => {
      const db = require('megadb')
        if (!message.member.permissions.has("ADMINISTRATOR"))
      return message.channel.send({embed: {
      color: "RED",
      description: `**No tienes los permisos suficientes para Eliminar las Bienvenidas**, ${message.author.username}`
    }
})
      let tienedb = new db.crearDB("setbienvenidas");
      if (!tienedb.tiene(`${message.guild.id}`)) {
       return message.channel.send({embed: {
      color: "RED",
      description: `:no_entry: | **No tienes las bienvenidas Seteadas**`
    }
})
      }

      let bd_db = new db.crearDB("setbienvenidas");  
      
      bd_db.eliminar(`${message.guild.id}`) 
      owner = message.guild.owner.user
      owner.send(`:white_check_mark: | **Se han Eliminado las Bienvenidas**`)
      return message.channel.send({embed: {
      color: "RED",
      description: `:white_check_mark: | **Se han Eliminado las Bienvenidas**`
    }
})
      }
  }