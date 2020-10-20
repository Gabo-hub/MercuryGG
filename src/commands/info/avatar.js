const Discord = require ('discord.js')

module.exports = {

    name: 'avatar',
    category: 'info',
    description: 'muestra el avatar de el usuario',

    run: async (client, message, args) => { 
    let user = message.mentions.users.first() 
    || client.users.cache.get(args[0])
    || client.users.cache.find(x => (args)?(x.tag === args.join(" ")):undefined)
    || message.author
  
    const embed = new Discord.MessageEmbed()    
           .setDescription(`[Link de el Avatar](${user.avatarURL()})`)
           .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
           .setColor(message.guild.member(user).displayHexColor)
           .setTitle((message.author == user)?`<a:9266_arrow_rainbow:746441892866293870> Tu avatar ${user.tag}`:`<a:9266_arrow_rainbow:746441892866293870> Avatar de ${user.tag}`)
           .setFooter(`Avatar pedido por: ${message.author.tag}`, message.author.displayAvatarURL());

            message.channel.send({embed: embed});

        
    }
    }