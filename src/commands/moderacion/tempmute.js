const Discord = require("discord.js")
const ms = require("ms")
module.exports = {
    name: "tempmute",
    alias: ["tm"],
    run:async (client, message, args, prefix) => {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]); //mención o ID del usuario para mutearlo
        if (!user) return message.channel.send({embed: {
          description: `<a:kanna_eats_ping:708886788357226537> | **Menciona una persona:**\`${prefix}tempmute <user> <tiempo> <razon>\``
        }
        }).then(m => m.delete({ timeout: 5000 })) //si no menciona o pone la ID de un usuario que haga un retorno
        if(!message.member.hasPermission("MUTE_MEMBERS", "BAN_MEMBERS", "KICK_MEMBERS")) return message.channel.send({embed :{
          description: ":x: |** No tienes Permisos para usar este comando.**",
          color : "RED"
          }
        }) //si no tiene los permisos retorna al usuario que ejecuto el comando
        
        if(!message.guild.me.hasPermission("MUTE_MEMBERS", "BAN_MEMBERS", "KICK_MEMBERS")) return message.channel.send({embed :{
          description: ":x: |** No tengo Permisos para ejecutar este comando.**",
          color : "RED"
          }
        })

    const mutetiempo = new Discord.MessageEmbed()
      .setDescription(
        ":x: | **No especificaste el tiempo | Formato: (1s (Segundo) | 1h (Hora) / 1d (Dia))**"
      )
      .setColor("RED");
    let mutetime = args[1];
    if (!mutetime) return message.channel.send(mutetiempo).then(m => m.delete({ timeout: 5000 })) //para poner el tiempo del mute con el modulo ms
    
    let razon = args.slice(2).join(" ") //definimos razón

    const reason = new Discord.MessageEmbed()
      .setDescription(":x: | **No has escrito una razon**")
      .setColor("RED");
    if (!razon) return message.channel.send(reason).then(m => m.delete({ timeout: 5000 })) //si no escribio ninguna razón le retorna el embed

        let rol = message.guild.roles.cache.find(x => x.name === "Muted") //definimos rol y hacemos que busque el role Silence
        if(!rol) { //Verificamos si el role existe y abrimos
            message.guild.roles.create({ //Creamos el role
            data: { name: 'Muted', //Especificamos el nombre del role
            reason: 'Mute role'}
            }).then(role => { //Recibimos la información del role
                message.guild.channels.cache.forEach(x => x.updateOverwrite(role.id, { //Utilizamos forEach para que ejecute esta acción por cada canal, vendr­a siendo un canal y utilizamos el metodo updateOverwrite para actualizar los permisos del role en cada canal 
                SEND_MESSAGES: false //Denegamos el permiso Enviar mensajes 
                  }))

                  user.roles.add(rol) //Le añadimos el role al usuario
                  
                  })
                  }else{ //Si el role existe abrimos
                  user.roles.add(rol)
                  }
        
        if(user.roles.cache.has(rol))
             return message.channel.send("<:monkaStab:705520945368006697> |**Me estas intentando engañar? El user ya esta muteado -.-**")
        let mutechannel;

        const db = require("megadb")
         let bd_db = new db.crearDB("setlogs");
         if(bd_db.tiene(`${message.guild.id}`)){
        ida = await bd_db.obtener(`${message.guild.id}-datos-muteUpdate`,"-")
        mutechannel = await message.guild.channels.cache.get(ida)
        let embed = new Discord.MessageEmbed()
        .setAuthor("| User Muteado", client.user.avatarURL())
        .addField('Muteado:', user, false)
        .addField('Muteado por:', message.author.username, false)
        .addField('Razon:', razon, false)
        .addField(`Tiempo en segundos`, `**${args[1]}**`, false)
        .setTimestamp()
        .setColor("RANDOM")
        .setFooter(`MercuryGG | v2.0`, client.user.avatarURL())
        mutechannel.send(embed)
        setTimeout(function() { //cuando termina el tiempo del mute remueve el role
            user.roles.remove(rol);
            let embed3 = new Discord.MessageEmbed()
            .setAuthor("| User Unmuteado", client.user.avatarURL())
            .addField('Usuario',user,true)
            .addField("Moderador",message.author.username,true)
            .addField("Razon", razon, true)
            mutechannel.send(embed3)}, ms(mutetime));
        } else {
        let embed = new Discord.MessageEmbed()
        .setAuthor("| User Muteado", client.user.avatarURL())
        .addField('Muteado:', user, false)
        .addField('Muteado por:', message.author.username, false)
        .addField('Razon:', razon, false)
        .addField(`Tiempo en segundos`, `**${args[1]}**`, false)
        .setTimestamp()
        .setColor("RANDOM")
        .setFooter(`MercuryGG | v2.0`, client.user.avatarURL())
        message.channel.send(embed)
        setTimeout(function() {
            user.roles.remove(rol);
            message.channel.send(`:white_check_mark: | **<@${user.id}> ha sido unmuteado del servidor.**`);
          }, ms(mutetime));
        }
    }
}
