var Discord = require('discord.js');
module.exports = {
  name: 'say',
	category: 'Owner',
  run: async (client, message, args) => {
     if(!["637346259266699296", "ID 2", "Etc"].includes(message.author.id)) return message.channel.send('Solo el Owner puede usar este code')
        let argss = await args.slice(1).join(' ');
        let canal = message.mentions.channels.first();
        canal.send(argss)
        
  
  }
}
