const { MessageEmbed } = require("discord.js");
const ms = require("ms");
module.exports = {
  name: "sorteo",
  description: "Create a simple sorteo",
  category: "utiles",
  run: async (client, message, args,prefix) => {
    if (!message.member.permissions.has("ADMINISTRATOR"))
      return message.channel.send({embed: {
      color: "RED",
      description: `**No tienes los permisos suficientes para hacer poll**, ${message.author.username}`
    }
}) 
    if (!args[0]) return message.channel.send({embed: {
      color: "RED",
      description: `:gear: | **Coloca Las Propiedades: ${prefix}sorteo <Canal> <Tiempo> <Descripcion>**`
    }
})
  
    if (!args[1]) return message.channel.send({embed: {
      color: "RED",
      description: `<:akkoShrug:705523099583643689> | **Debes especificar el tiempo que dura el Sorteo, Ejemplo: \`<1d>, <1h> o <1m>\`**`
    }
}) 

    if (
      !args[1].endsWith("d") &&
      !args[1].endsWith("h") &&
      !args[1].endsWith("m")
    )
      return message.channel.send({embed: {
      color: "RED",
      description: ":x: | **Ese no es un formato de tiempo no es valido:\`<1d>, <1h> o <1m>\`**"
    }
}) 
  
    
    let channel = message.mentions.channels.first();
    if (!channel) return message.channel.send({embed: {
      color: "RED",
      description: `<:akkoShrug:705523099583643689> | **Debes especificar el canal donde voy a enviar el Sorteo**`
    }
}) 
    let valor = args.slice(2).join(" ");
    if (!valor) return message.channel.send({embed: {
      color: "RED",
      description: `:moneybag: |**Valor no Especificado**`
    }
}) 
    
    
    message.channel.send({embed: {
      color: "RED",
      description: `**Sorteo creado exitosamente en ${channel}**`
    }
})  
    let m;
    const micro = ms(args[1])
    const segnudos = Math.floor(micro / 1000)
    let time = parseInt(segnudos)
    embed = new MessageEmbed()
      .setTitle(`<a:Rainbow_Hyper_Tada:766485266054643744> ¡Nuevo Sorteo! <a:Rainbow_Hyper_Tada:766485266054643744>`)
      .setDescription(
        `El Usuario: ${message.author} ha Hosteado un Sorteo de: **${valor}**\n\`Con un Tiempo de: ${String(time)} Segundos\``
      )
      .setTimestamp(Date.now())
      .setColor(`BLUE`);
    m = await channel.send({embed:embed});
    m.react("🎉");
    let count2 = setInterval(async () => {
    embed = new MessageEmbed()
      .setTitle(`<a:Rainbow_Hyper_Tada:766485266054643744> ¡Nuevo Sorteo! <a:Rainbow_Hyper_Tada:766485266054643744>`)
      .setDescription(
        `El Usuario: ${message.author} ha Hosteado un Sorteo de: **${valor}**\n\`Con un Tiempo de: ${String(time)} Segundos\``
      )
      .setTimestamp(Date.now())
      .setColor(`BLUE`);  
    await m.edit(time <= 0 ? embed:embed) //Si el tiempo llega a 0 sale el mensaje de que ya termino la cuenta
    time <= 0 ? clearInterval(count2) : time -= 5 //El numero bajara de 5 en 5.
    }, 4750)
    setTimeout(() => {
      if (m.reactions.cache.get("🎉").count <= 1) {
        message.channel.send(`Solo hubo ${m.reactions.cache.get("🎉").count} reacción **F**`);
        return message.channel.send(
          `**¡No reaccionó suficiente gente para que haya un ganador!**`
        );
      }

      let ganador = m.reactions.cache
        .get("🎉")
        .users.cache.filter((u) => !u.bot)
        .random();
     let embed2 = new MessageEmbed()
      .setTitle(`<a:Rainbow_Hyper_Tada:766485266054643744> ¡Ganador de el Sorteo! <a:Rainbow_Hyper_Tada:766485266054643744>`)
      .addField('Ganador',ganador)
      .addField('Valor',valor)
      .addField('Hosteado por:', message.author.tag)
      .setTimestamp(Date.now())
      .setColor(`BLUE`);
      m.edit({embed:embed2})
      channel.send(ganador.toString())
    }, ms(args[1]));
  },
};