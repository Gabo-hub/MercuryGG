const Discord = require ('discord.js')
module.exports = {
    name: "ayuda",
    aliases: ["help"],
    category: "menus",
    description: "Menu de ayuda",
    run: async (client, message, args, prefix) => {
        let avatar = client.user.avatarURL()
        const embed = new Discord.MessageEmbed()
            embed.setAuthor(`Menu de Ayuda`)
            embed.setThumbnail(client.user.avatarURL())
            embed.setDescription('¡Hola! Bienvenid@ a el menu de Help, Si tienes un problema con el bot, o una sugerencia para mejorar el funcionamiento del mismo no dudes en contacta con mi desarrollador Gabo#8763.')
            embed.addField("<:help:760732502104604672> Comandos",`Para ver los comandos usa: \`${prefix}comandos\` para ver todos los comandos.\nPara cambiar prefix:\`${prefix}setprefix <prefix>\``, false)
            embed.addField('<:mas:760732506126548993> Aportar:',`Para porder ayudar a solucionar problemas o a implementar nuevas cosas\n \`${prefix}aportar <Titulo> <Descripción>\``)
            embed.addField('<:soporte:760914241225228348> Para más soporte usa:', `\`${prefix}invitar\`\n\`${prefix}invite\``, false)
            embed.setFooter(`MercuryGG | v2.0`, client.user.avatarURL())
            embed.setColor("RED");
        message.channel.send(embed);

    }
}