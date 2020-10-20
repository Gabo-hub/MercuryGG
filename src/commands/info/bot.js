const Discord = require ('discord.js')

module.exports = {

    name: 'bot',
    category: 'info',
    description: 'muestra toda la informacion de el bot',

    run: async (client, message, args) =>{
    const moment = require("moment");
   require('moment-duration-format');
   const actividad = moment.duration(client.uptime).format(" D [dias], H [hrs], m [mins], s [secs]");


            const embed = new Discord.MessageEmbed()
            .setColor(0x66ff66)

            .setAuthor(`Bot info`, client.user.avatarURL())
            .addField(`<:owner:760732506113966110> Dueño`, `Gabo#8763`, true)
            .addField(`🗄 Version`, `2.0`, true)
            .addField(`📁 Libreria`, `<:discord_js_logo:760956789012824155> Discord ^12.3.1\n<:javascript:760914087784874034> JavaScript`, true)
            .addField(`<:harddisk:760959813949063270> Memoria`, `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
            .addField(`🕑 Actualizado`, `${actividad}`, true)
            .addField(`<:748970810085081210:760732441043795978> Servidores`, `${client.guilds.cache.size.toLocaleString()}`, true)
            .addField(`<:users_logo:760957337845497926> Usuarios`, `${client.users.cache.size.toLocaleString()}`, true)
            .addField(`📤 Canales`, `${client.channels.cache.size.toLocaleString()}`, true)
            .setFooter(`MercuryGG | v2.0`, client.user.avatarURL())

            message.channel.send(embed);
}
}