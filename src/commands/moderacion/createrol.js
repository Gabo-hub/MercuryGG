const Discord = require('discord.js')
const role = require('discord.js')
module.exports = {
    name: "createrole",
    aliases: ["cr","createrol"],
    description: "Bulk delete messages",
    run: async (client, message, args) => {
        
        if (!args[0]) return message.channel.send({embed: {
      color: "RED",
      description: ':no_entry: | **Ingrese el nombre del rol a crear.**'
    }
}) 
        let nombre = args.join(' ') 
        var guild = message.guild;
        
        var perms = message.member.hasPermission("MANAGE_ROLES");
        if (!perms) return message.channel.send({embed: {
      color: "RED",
      description: ":no_entry: | **No tienes Permisos para usar este comando.**"
    }
})           
        var mispermisos = message.guild.me.hasPermission("MANAGE_ROLES");
        if (!mispermisos) return message.channel.send({embed: {
      color: "RED",
      description: ":no_entry: | **No tengo Permisos para ejecutar este comando.**"
    }
}) 
            guild.roles.create({
                data: {
                  name: `${nombre}`,
                  color: 'RANDOM',
                },
                reason: 'Necesitamos un rol para las personas Super Cool',
              }).then(role => message.channel.send({embed: {
      color: "RED",
      description: ':white_check_mark: | **Nuevo rol creado: '+nombre+'.**'
    }
}));
      
    }
}  