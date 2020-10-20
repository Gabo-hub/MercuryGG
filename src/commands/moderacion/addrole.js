const Discord = require ('discord.js')
module.exports = {
    name: "addrole",
    aliases: ["addroles","ar","addrol"],
    description: "añadir un rol a una persona",

    run: async (client, message, args) => {
        if (!message.guild.me.permissions.has('MANAGE_ROLES')) {
            return message.channel.send({embed: {
      color: "RED",
      description: '<a:100_bits:746847390291460277> |**No tengo suficientes permisos para ejecutar el comando**.'
    }
}) 
        }
          
          if (!message.member.permissions.has('MANAGE_ROLES')) {
            return message.channel.send({embed: {
      color: "RED",
      description: '<a:1000_BITS:746839345834623088> |**No tienes los Permisos suficientes permisos para ejecutar el comando**.'
    }
}) 
          }
          
          let persona = message.mentions.members.first() || //por mencion
            message.guild.members.resolve(args[0]) //por id
            
          if (!persona) return message.channel.send({embed: {
      color: "RED",
      description: '<a:shocked:746848367480406051> |**Tienes que mencionar a un usuario o mandar la id para agregarle el rol**.'
    }
})        
          if(!args[1]){
            return message.channel.send({embed: {
      color: "RED",
      description: '<a:shocked:746848367480406051> |**Tienes que mencionar el rol o mandarme la id para añadir**'
    }
}) 
          }
          
          let rol = message.mentions.roles.first() || //por mencion
            message.guild.roles.resolve(args[1]) || //por id
            message.guild.roles.cache.find(r => r.name == args.slice(1).join(' ')) //por nombre
          
          if (!rol) {
            return message.channel.send({embed: {
      color: "RED",
      description: '<:akkoShrug:705523099583643689> |**Rol no encontrado en el servidor**'
    }
}) 
          } else if (!rol.editable) {
            return message.channel.send({embed: {
      color: "RED",
      description: '<a:KingproteaGao2:746848321020100728> |**Debe seleccionar un rol de menor jerarquia.\nEsto pasa cuando el rol que quieres añadir está por encima de mi rol más alto**.'
    }
}) 
          } else if (rol.comparePositionTo(message.member.roles.highest) > 0) {
            return message.channel.send({embed: {
      color: "RED",
      description: '<a:KingproteaGao2:746848321020100728> |**Debe seleccionar un rol de menor jerarquia.\nEsto pasa cuando el rol que quieres añadir está por encima de mi rol más alto**.'
    }
}) 
          }
          
          if(persona.roles.cache.has(rol.id)) return message.channel.send({embed: {
      color: "RED",
      description: "<:monkaStab:705520945368006697> |**Me estas intentando engañar? Ya tienes el rol -.-**"
    }
}) 
            //ya tiene el rol
          
          persona.roles.add(rol)
            .catch(e => message.reply('Ocurrio un **error**'))
            .then(() => {
                var embed = new Discord.MessageEmbed
                embed.setTitle('<a:verified:746839337768845422> Rol agregado.')
                embed.setDescription(`He agregado el rol: **${rol.name}** a el miembro:**${persona.user.username}**`)
                embed.addField('Admin/Mod responsable:', message.author.username, false)
                embed.setFooter(`MercuryGG | v2.0`, client.user.avatarURL())
              message.channel.send(embed)
            })
        }
    }