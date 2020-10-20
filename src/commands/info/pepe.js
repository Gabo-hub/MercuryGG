const Discord = require("discord.js")
const db = require('megadb')
module.exports = {
    name: "pepe", 

 run : async (client, message, args) => {
   let pepes = ["https://cdn.discordapp.com/emojis/428556266366042112.png?v=1","https://cdn.discordapp.com/emojis/428556281767526405.png?v=1","https://cdn.discordapp.com/emojis/428556377754042378.png?v=1","https://cdn.discordapp.com/emojis/428556448507625474.png?v=1","https://cdn.discordapp.com/emojis/428556467021545473.png?v=1","https://cdn.discordapp.com/emojis/428556295218659329.png?v=1","https://cdn.discordapp.com/emojis/428556308929576960.png?v=1","https://cdn.discordapp.com/emojis/428556486235389973.png?v=1","https://cdn.discordapp.com/emojis/428556326482739230.png?v=1","https://cdn.discordapp.com/emojis/428556352915505165.png?v=1"]

    
    let dapepe = Math.floor(Math.random() * pepes.length);

    let pepe10 = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setImage(pepes[dapepe]);

    let descubierto = new Discord.MessageEmbed()
    .setAuthor(message.author.username)
    .setThumbnail(message.author.displayAvatarURL())
    .setDescription("En hora buena has descubierto el comando oculto!")
    let pPepe_db = new db.crearDB("Primer_pepe");
  if (pPepe_db.tiene(`${message.author.id}`)) {
    pPepe_db = await pPepe_db.obtener(`${message.author.id}`) 
    message.channel.send(pepe10)
  } else {
    pPepe_db.establecer(message.author.id, {primerpepe: "Pepe", usuario: message.author.tag})
    message.channel.send(descubierto).then(m => {m.delete({timeout: 5000 })})
    message.channel.send(pepe10)
  }
  
  if (message.guild.member(message.author).deletable) {
  message.delete()
  } else {
    
  }
}
}