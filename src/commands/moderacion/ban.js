const Discord = require('discord.js')
module.exports = {
    name: 'ban',
    category: 'moderacion',
    description: 'Para banear a un usuario del servidor',

    run: async (client, message, args,prefix) => {

        let perms = message.guild.me.hasPermission("BAN_MEMBERS") 
        if (!perms) return  message.channel.send({embed: {
      color: "RED",
      description: "<a:yamete:712626713044975697> | **No tengo los permisos suficientes para hacer un ban ricolino revisa mis permisos**"
    }
})

        let permsuser = message.member.hasPermission("BAN_MEMBERS") 
        if (!permsuser) return message.channel.send({embed: {
      color: "RED",
      description: "<a:yamete:712626713044975697> | **No tienes permisos suficientes para hacer un ban**"
    }
})
         
        let embedColor = ("RED") 
        let mentioned = message.mentions.users.first();
        let reason = args.slice(1).join(' ') 

        if (!mentioned) return message.channel.send({embed: {
      color: "RED",
      description: `<a:kanna_eats_ping:708886788357226537> | **Menciona una persona:**\`${prefix}ban <user> <razon>\``
    }
})
        if (!reason) return message.channel.send({embed: {
      color: "RED",
      description: `<:documentos:760732440745476128> | **Pon una razon para el baneo:**\` ${prefix}ban <user> <razon>\``
    }
})

        if (!message.guild.member(mentioned).bannable) return message.channel.send({embed: {
      color: "RED",
      description: '<:Kanna_Spook:720065311369461760> | **No puedo banear a este usuario**'
    }
})
        message.guild.member(mentioned).ban(reason)

        var embed = new Discord.MessageEmbed()
            .setTitle("<a:BanHammer:747483827592757289> » **Baneadisimo**")
            .setColor(embedColor)
            .addField("<:MrClean:747485084512157806> » **Baneado por:**", message.author.tag)
            .addField('<:tttgun:747485083643936775> » **Baneado:**', `<@${mentioned.id}>, (${mentioned.id})`)
            .addField(':tickets: » **Razon:**', reason)
            .setImage(`https://media1.tenor.com/images/459e6388894ecf845ee7db65476d153e/tenor.gif?itemid=16047504`)
            .setTimestamp()
            .setFooter(`MercuryGG | v2.0`, client.user.avatarURL())
        message.channel.send(embed)
        
        var embed2 = new Discord.MessageEmbed
        embed2.setTitle('Usuario Baneado con exito')
        embed2.addField("**Server:**", `${message.guild.name}`)
        embed2.addField('**Baneado:**', `<@${mentioned.id}>, (${mentioned.id})`)
        embed2.addField('**Razon:**', reason)
        embed2.setColor(embedColor)
        embed2.setFooter(`MercuryGG | v2.0`, client.user.avatarURL())
        message.author.send(embed2)
    }
}
