const Discord = require ('discord.js')
const total = require('../../totalArchivos.js')
module.exports = {
    name: "commands",
    aliases: ["comandos","command"],
    category: "menus",
    description: "Menu de Comandos",
    run: async (client, message, args) => {
        if(["ID 1", "ID 2", "Etc"].includes(message.author.id)) { 
            const embed = new Discord.MessageEmbed()
            .setTitle ('Menu de Comandos')
            .addField('<:4508_SHIELD:746439101208723457> Moderación', '\`clear\` | \`kick\` | \`ban\` | \`addrole\` | \`createrole\` | \`mute\` | \`tempmute\` | \`lockdown\` | \`warn\` | \`votekick\` | Más Proximamente', false)
            .addField(`<:4055_Document_Folder:746439104161513583> Informacion`,'\`desarrollador\` | \`stats\` | \`info\` | \`bot\` | \`invitar\` | \`canales\`| \`covid-g\` | \`covid-c\`| \`avatar\` | \`ping\` | Más Proximamente', false)
            .addField(':dividers: Utiles', ' \`embed\` | \`poll\` | \`short\` | \`emoji\` | \`sorteo\` | \`npm\` | \`setbienvenidas|sb\` | \`delbienvenidas|delb\` | \`setdespedida\` | Más Proximamente', false)
            .addField('<a:1000_BITS:746839345834623088> Premium',' \`propbienvenidas | pb\` | \`propdespedida | pd\` | Más Proximamente',false)
            .addField('<:server:760915474208391188> Beta-Testers','\`snipe\` | \`setlogs\`')
            .addField('<:SataniaThumbsUp:705523269326864465> Extras', '\`aportar\` | \`help\` |\`comandos\` ')
            .setFooter(`MercuryGG | v2.0 | Comandos en total: ${total.totalA('./commands/',".js") - 3}`, client.user.avatarURL())
            .setColor("RED");
        message.channel.send(embed);
          }else if(message.author.id !== "637346259266699296") { 
          const embed = new Discord.MessageEmbed()
            .setTitle ('Menu de Comandos')
            .addField('<:4508_SHIELD:746439101208723457> Moderación', '\`clear\` | \`kick\` | \`ban\` | \`addrole\` | \`createrole\` | \`mute\` | \`tempmute\` | \`lockdown\` | \`warn\` | \`votekick\` | Más Proximamente', false)
            .addField(`<:4055_Document_Folder:746439104161513583> Informacion`,'\`desarrollador\` | \`stats\` | \`info\` | \`bot\` | \`invitar\` | \`canales\`| \`covid-g\` | \`covid-c\`| \`avatar\` | \`ping\` | Más Proximamente', false)
            .addField(':dividers: Utiles', ' \`embed\` | \`poll\` | \`short\` | \`emoji\` | \`sorteo\` | \`npm\` | \`setbienvenidas|sb\` | \`delbienvenidas|delb\` | \`setdespedida\` | Más Proximamente', false)
            .addField('<a:1000_BITS:746839345834623088> Premium',' \`propbienvenidas | pb\` | \`propdespedida | pd\` | Más Proximamente',false)
            .addField('<:SataniaThumbsUp:705523269326864465> Extras', '\`aportar\` | \`help\` |\`comandos\` ')
            .setFooter(`MercuryGG | v2.0 | Comandos en total: ${total.totalA('./commands/',".js") - 4}`, client.user.avatarURL())
            .setColor("RED");
        message.channel.send(embed);
        }else{
          const embed = new Discord.MessageEmbed()
            .setTitle ('Menu de Comandos')
            .addField('<:4508_SHIELD:746439101208723457> Moderación', '\`clear\` | \`kick\` | \`ban\` | \`addrole\` | \`createrole\` | \`mute\` | \`tempmute\` | \`lockdown\` | \`warn\` | \`votekick\` | \`setlogs\` | Más Proximamente', false)
            .addField(`<:4055_Document_Folder:746439104161513583> Informacion`,'\`desarrollador\` | \`stats\` | \`info\` | \`bot\` | \`invitar\` | \`canales\`| \`covid-g\` | \`covid-c\`| \`avatar\` | \`ping\` | Más Proximamente', false)
            .addField(':dividers: Utiles', ' \`embed\` | \`poll\` | \`short\` | \`emoji\` | \`sorteo\` | \`npm\` | \`setbienvenidas|sb\` | \`delbienvenidas|delb\` | \`setdespedida\` | Más Proximamente', false)
            .addField('<a:1000_BITS:746839345834623088> Premium',' \`propbienvenidas | pb\` | \`propdespedida | pd\` | Más Proximamente',false)
            .addField('<:owner:760732506113966110> Owner','\`eval\` | \`say\` | \`addpremium\`')
            .addField('<:server:760915474208391188> Beta-Testers','\`snipe\` | \`setlogs\`')
            .addField('<:SataniaThumbsUp:705523269326864465> Extras', '\`aportar\` | \`help\` |\`comandos\` ')
            .setFooter(`MercuryGG | v2.0 | Comandos en total: ${total.totalA('./commands/',".js") - 1}`, client.user.avatarURL())
            .setColor("RED");
        message.channel.send(embed);
        }

    }
}
