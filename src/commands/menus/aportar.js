const Discord = require ('discord.js')
module.exports = {
    name: 'aportar',
    category: 'menus',
    description: 'aportar con el reporte de bug o sugerencias',

    run: async (client, message, args,prefix) => { 
        let cooldown= new Set();
        if(cooldown.has(message.author.id)){
        message.channel.send({embed : {
          description: message.author.username+" | Debes utilizar el comando despues de 10seg"
        }});
        return;
        }
        cooldown.add(message.author.id);
        setTimeout(() => {
        cooldown.delete(message.author.id);
        }, 10000);
        
        var server = message.guild;
        if (message.author.bot) return; 
        let owner = '637346259266699296'
        let tema = args[0];
        let pruebas = args.slice(1).join(' ');
        const solo = new Discord.MessageEmbed() 
        .setTitle('**Aporte**')
        .setDescription(`**Tipos de Aportes mas comunes: **Bug o una Sugerencia\n**Detalles:** Los aportes van a ser anonimos menos para el owner del bot\n**Ejemplo con el Titulo y Descripción:** \`${prefix}aportar Bug El comando mute no funciona\``)
        .setImage('https://cdn.discordapp.com/attachments/736372499872350349/755203942882738267/unknown.png')
        .setThumbnail('https://i.pinimg.com/originals/2b/a0/40/2ba0401119850faa26b5a83b45c39f8f.gif')
        .setFooter("MercuryGG | v2.0", client.user.displayAvatarURL())
        .setColor('RED')
        if(!tema) return message.channel.send(solo) 
      
        
        const embed = new Discord.MessageEmbed()
         .setTitle(`:e_mail: | **Aporte de:** ${message.author.username}`)
         .setDescription(`**Tema: **${tema}\n **Descripción: **${pruebas}\n **Desde:** ${server.name}`)
         .setThumbnail(`https://media.discordapp.net/attachments/576980879226961935/577344574931075072/carta.gif`)
         .setColor('RED')
         .setFooter("MercuryGG | v2.0", client.user.displayAvatarURL())
       
        message.channel.send(":white_check_mark: | **Aporte enviado**").then(msg => msg.delete({timeout: 10000}));        
        client.users.resolve(owner).send(embed).then(m =>  m.react("\u2709"))
    }
}
