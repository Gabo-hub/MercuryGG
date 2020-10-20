const Discord = require('discord.js')
const validateFlag = f => f === 'true' || f === 'false' || f === 'null';
const IGNORED = new Set([
  // PLACE YOUR CHANNEL IDS HERE
]);
module.exports = {
  name: 'lockdown',
    category: 'moderacion',
    description: 'Para kickear a un usuario del servidor',
  run: async (client, message, args, prefix) => {
    let permsuser = message.member.hasPermission("ADMINISTRATOR") 
        if (!permsuser) return message.channel.send({embed: {
      color: "RED",
      description: "<a:yamete:712626713044975697> | **No tienes permisos suficientes para hacer un lockdown**"
    }
})
    let mispermsuser = message.guild.me.hasPermission("ADMINISTRATOR") 
        if (!mispermsuser) return message.channel.send({embed: {
      color: "RED",
      description: ":no_entry: | **No tengo permisos suficientes para hacer un lockdown**"
    }
})
    let hola = args.join(" ")
      if(!args[0]) {
      return message.channel.send({embed: {
        description : `Lockdown se utiliza para casos de raid bloquea todos los canales\n si quieres usarlo coloca: \`${prefix}lockdown <ROL_ID> true | false | null\``,
        color: 'GREEN'
      }
      })
      }
    let [ roleId, flag ] = hola.split(' ');
    if(!isNaN(roleId) && validateFlag(flag.toLowerCase())) {
      if(message.guild.roles.cache.has(roleId)) {
        flag = flag.toLowerCase() === 'true' ? true : (flag.toLowerCase() === 'false' ? false : null);
        const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
        let msg;
        let embed;
        if(args[1] == "true"){
        embed = new Discord.MessageEmbed()
        .setDescription("<a:LoadingEmote:766405338508427314> | **Activando** ")
        .setColor('RED');
        msg = await message.channel.send({embed:embed})
        } else {
        embed = new Discord.MessageEmbed()
        .setDescription("<a:LoadingEmote:766405338508427314> | **Desactivando**")
        .setColor('GREEN');  
        msg = await message.channel.send({embed:embed})
        }
        channels.forEach(channel => {
          if(!IGNORED.has(channel.id)) {
            channel.updateOverwrite(roleId, {
              SEND_MESSAGES: !flag
            }).then(g => {
              if(flag) {
                if(!g.name.endsWith('🔒')) {
                  g.edit({ name: g.name + ' 🔒'});
                }
              } else {
                g.edit({ name: g.name.replace(/\s*🔒/, '')});
              }
            })
            .catch(err => console.log(err));
          } else {
    
          }
        });
        listo = new Discord.MessageEmbed()
        .setDescription(":ok_hand: | **Listo**")
        .setColor('GREEN');
        msg.edit({embed:listo}) 
      }
      else {
        message.channel.send({embed: {
          description: 'Ese Rol No Es valido',
          color: 'RED'
        }});
       
      }
       
    }

  }
}