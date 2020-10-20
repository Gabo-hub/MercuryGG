const Discord = require ('discord.js')

module.exports = {
    name: 'stats',
    category: 'info',
    description: 'muestra los stats del servidor',

    run: async(client, message, args) => { 
    var server = message.guild;
    let online;
    let idle;
    let dnd;
    let offline;
    let active;

    online = server.members.cache.filter(
      m => m.user.presence.status === "online"
    ).size;

    idle = server.members.cache.filter(
      m => m.user.presence.status === "idle"
    ).size;

    dnd = server.members.cache.filter(
      m => m.user.presence.status === "dnd"
    ).size;

    offline = server.members.cache.filter(
      m => m.user.presence.status === "offline"
    ).size;

    active = online + idle + dnd;

    rmembers = server.approximateMemberCount;
    active = server.approximatePresenceCount;

    const bans = await message.guild.fetchBans()
      .then((bans) => bans.size)
      .catch(() =>  "No Puedo ver los Baneos");
  
    const embed = new Discord.MessageEmbed()
    .setAuthor('Información de '+ server.name)
    .addField ("🔌** Servidor**: ",  message.guild.name, true )
    .addField("👑** Dueño del servidor**:", message.guild.owner.user.tag, true)
    .addField("🔌** Fecha de creación**:", server.createdAt.toDateString(), true)
    .addField(':busts_in_silhouette: **Roles**', `${server.roles.cache.size}`,true)
    .addField(':card_box:  **Canales**',`${server.channels.cache.size}`,true)
    .addField("👑** Miembros**:", `${message.guild.members.cache.size}`, true )
    .addField(':beginner:**Números de Boost**',`${server.premiumSubscriptionCount}`,true)
    .addField("🌺** Nivel de verificacion**:", `${message.guild.verificationLevel}`,true)
    .addField("🗺** Región**: ", `${message.guild.region}`, true)
    .addField("👑** ID**:",  `${server.id}`, true)
    .addField(":radioactive: **Baneos**", bans, true)
    .addField(":man_technologist:**Conectados**", `**<a:5886_online:746499785711812738> Online:** ${online}\n  **<:idle:746521645895778479> Ausentes**: ${idle}\n**<:dnd:746521299798458398> No Molestar:** ${dnd}  **<:invisible:746521977396789279> Sin Conexión:** ${offline}`, true)                      
    .setThumbnail (message.guild.iconURL({ format: "png", dynamic: true, size: 1024 }))
    .setColor("RED")
    .setFooter(`MercuryGG | v2.0`, client.user.avatarURL())
    
    message.channel.send(embed)
    
    }
  }

