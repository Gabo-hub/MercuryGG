const Discord = require ('discord.js')
module.exports = {
    name: 'kick',
    category: 'moderacion',
    description: 'Para kickear a un usuario del servidor',

    run: async (client, message, args, prefix) =>{
        var embedper = new Discord.MessageEmbed()
        embedper.setTitle('No tengo permisos')
        embedper.setDescription(':no_entry: | **Revisa en los permisos suficientes para kickear reivisa si tengo activado el: \`KICK_MEMBERS\`**')
       let perms = message.guild.me.hasPermission("KICK_MEMBERS") 
       if (!perms) return message.channel.send(embedper)   
       let permsuser = message.member.hasPermission("KICK_MEMBERS")
       if (!permsuser) return message.channel.send({embed: {
      color: 3447003,
      description: "<a:yamete:712626713044975697> |**No tienes permisos suficientes para hacer un kick mi loko**"
    }
})
       let embedColor = ("RED") 
       let mentioned = message.mentions.users.first();
       let reason = args.slice(1).join(' ') 
       if(!mentioned) return message.channel.send({embed: {
      color: "RED",
      description: `<a:kanna_eats_ping:708886788357226537> | **Menciona una persona:**\`${prefix}kick <user> <razon>\``
    }
})
       if(!reason) return message.channel.send({embed: {
      color: "RED",
      description: `<:documentos:760732440745476128> | **Pon una razon para el kick:** \`${prefix}kick <user> <razon>\``
    }
})
       if (!message.guild.member(mentioned).kickable) return message.channel.send({embed: {
      color: "RED",
      description: '<:Kanna_Spook:720065311369461760> | **No puedo kickear a este usuario**'
    }
})
       message.guild.member(mentioned).kick(reason)
       
       
       const embed = new Discord.MessageEmbed()
       .setTitle("<a:MonokumaBan:747575088798367834> » **User Kick**")
       .setColor(embedColor)
       .addField("<:MrClean:747485084512157806> » **Kickeado por:**", message.author.tag)
       .addField('<:tttgun:747485083643936775> » **Kickeado:**', `<@${mentioned.id}>, (${mentioned.id})`)
       .addField(':tickets: » **Razon:**', reason)
       .setTimestamp()
       .setFooter(`MercuryGG | v2.0`, client.user.avatarURL())
       message.channel.send(embed)
    }
}