const Discord = require ('discord.js')
module.exports = {
    name: 'desarrollador',
    category: 'menus',
    description: 'menu para ayudar a el desarrollador',

    run: async (client, message, args) => {
        link = 'https://media1.tenor.com/images/cf5f22fb6299e0a83d4b6f0131c6923c/tenor.gif?itemid=15012780'
        link.height=421
        link.width=862
        const embed = new Discord.MessageEmbed()
        .setTitle ("<a:9266_arrow_rainbow:746441892866293870> Apoya a mi Desarrolador")
        .setColor ("RED")
        .setThumbnail ("https://media1.tenor.com/images/cbb57b0b2aa0ccd3a29ff2d9f62b1439/tenor.gif?itemid=16314048")
        .setImage(link)
        .addField ('<a:9266_arrow_rainbow:746441892866293870> Canal:', '[Link del Canal](https://www.youtube.com/channel/UCw0r7qBn1x12D6zobrp2wVQ)', false)
        .setFooter(`MercuryGG | v2.0`, client.user.avatarURL())
        message.channel.send (embed);

    }
}