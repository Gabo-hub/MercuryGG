const Discord = require ('discord.js')
module.exports = {
    name: "mute",
    aliases: ["m"],
    description: "añadir un rol a una persona",

    run: async (client, message, args) => {
        if (!message.guild.me.permissions.has('MUTE_MEMBERS')) {
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
          
          let persona = message.mentions.members.first()  //por id
            
          if (!persona) return message.channel.send({embed: {
      color: "RED",
      description: '<a:shocked:746848367480406051> |**Tienes que mencionar a un usuario para mutear**.'
    }
}) 
          let Rol = message.guild.roles.cache.find(r => r.name == 'Muted')
          
          if(!Rol) {
          await message.guild.roles.create({ data: { name: 'Muted', permissions: ['CHANGE_NICKNAME','CREATE_INSTANT_INVITE','VIEW_CHANNEL','READ_MESSAGE_HISTORY','ADD_REACTIONS'] } });
          } else if (!Rol.editable) {
            return message.channel.send({embed: {
      color: "RED",
      description: '<a:KingproteaGao2:746848321020100728> |**No puedo mutear a esta persona :(.\nEsto pasa cuando el usuario está por encima de mi rol más alto**.'
    }
}) 
          } 

          if(persona.roles.cache.has(Rol))
             return message.channel.send({embed: {
      color: "RED",
      description: "<:monkaStab:705520945368006697> |**Me estas intentando engañar? El user ya esta muteado -.-**"
    }
}) 
          Rol = message.guild.roles.cache.find(r => r.name == 'Muted')
          persona.roles.add(Rol)
            .then(() => {
                var embed = new Discord.MessageEmbed()
                embed.setTitle('<a:verified:746839337768845422> Usuario Muteado')
                embed.setDescription(`Ha sido muteado el miembro:**${persona.user.username}**`)
                embed.setFooter(`MercuryGG | v2.0`, client.user.avatarURL())
              message.channel.send(embed)
              message.delete()
            })
        
    }
}