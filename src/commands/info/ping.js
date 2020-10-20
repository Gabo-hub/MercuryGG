const Discord = require ('discord.js')
module.exports = {
    name: 'ping',
    category: 'info',
    description: 'muestra la latencia de ejecucion de comandos',

    run: async(client, message, args) => { 
    const Discord = require('discord.js')

    message.channel.send(new Discord.MessageEmbed()
        .setDescription(`[📨] Envio de Mensaje: **${Math.floor(Date.now() - message.createdTimestamp)}ms**\n[🛰️] Light Ping: **${client.ws.ping}ms**`)
        .setColor('RANDOM')
        .setFooter(`MercuryGG | v2.0`, client.user.avatarURL())
    )
    }
}
