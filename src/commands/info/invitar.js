const Discord = require ('discord.js')

module.exports = {

    name: 'invitar',
    aliases: ["invite","invi"],
    category: 'info',
    description: 'invitar a los users a el servidor',

    run: async (client, message, args) =>{
    const embed = new Discord.MessageEmbed
    embed.setTitle("Invitaciones", client.user.avatarURL())
    embed.setThumbnail(client.user.avatarURL())
    embed.setColor("RED")
    embed.addField('<:botinvite:760916972362793011> Invitarme a tu servidor!','[Link de Invitacion](https://discord.com/oauth2/authorize?client_id=699345392604676146&permissions=8&scope=bot)',true)
    embed.addField('<:server:760915474208391188> Servidor Oficial!','[MercuryGG Support](https://discord.gg/hdqA2w5)',false)
    embed.addField('<:748970810085081210:760728299218403338> Invitalos desde la Web!','[Discordea](https://discordea.net/profile/mercurygg-support/)',true)
    .setFooter(`MercuryGG | v2.0`, client.user.avatarURL())
    message.channel.send(embed);


    }
}