module.exports = {
    name: 'setlogs',
    aliases: ['sl','setlogs'],
    category: 'utiles',
    description: 'Para kickear a un usuario del servidor',

    run: async (client, message, args) => {
      if(!["637346259266699296", "ID 2", "Etc"].includes(message.author.id)) return;
      const db = require('megadb')
        if (!message.member.permissions.has("MANAGE_MESSAGES"))
      return message.channel.send({embed: {
      color: "RED",
      description: `**No tienes los permisos suficientes para Setear los Logs**, ${message.author.username}`
    }
})    
    let mispermsuser = message.guild.me.hasPermission("ADMINISTRATOR","VIEW_AUDIT_LOG","VIEW_CHANNEL","SEND_MESSAGES","MANAGE_MESSAGES") 
        if (!mispermsuser) return message.channel.send({embed: {
      color: "RED",
      description: ":no_entry: | **No tengo permisos suficientes para setear los Logs revisa estos permisos:** \`VIEW_AUDIT_LOG\`,\`VIEW_CHANNEL\`,\`SEND_MESSAGES\`,\`MANAGE_MESSAGES\`,\`MANAGE_ROLES\` o \`ADMINISTRATOR\`"
    }
})

      let setLogs = message.mentions.channels.first();
      if (!setLogs){
      return message.channel.send({embed: {
      color: "RED",
      description: ":gear: | **Debes especificar un canal donde enviar las Logs**"
    }
})
      }
      
      let bd_db = new db.crearDB("setlogs");  
      if (setLogs === setLogs) {
      } else {
      return message.channel.send(":no_entry: | **Los Logs ya estan seteadas en ese canal**")
      }
      bd_db.establecer(`${message.guild.id}.datos.canal`,setLogs.id)
      bd_db.establecer(`${message.guild.id}.datos.messageUpdate`,setLogs.id)
      bd_db.establecer(`${message.guild.id}.datos.rolUpdate`,setLogs.id)  
      bd_db.establecer(`${message.guild.id}.datos.canalChange`,setLogs.id)
      bd_db.establecer(`${message.guild.id}.datos.serverUpdate`,setLogs.id)
      bd_db.establecer(`${message.guild.id}.datos.nombreUptade`,setLogs.id)
      bd_db.establecer(`${message.guild.id}.datos.muteUpdate`,setLogs.id)

      owner = message.guild.owner.user
      owner.send(`Se ha establecido logs en: ${args[0]} `)
      return message.channel.send({embed: {
      color: "RED",
      description: `:white_check_mark: | **Se ha establecido los logs en: ${args[0]}** `
    }
})
      }
  }