const Discord = require("discord.js")
module.exports = {
  name: "votekick",
  alias: ["vk"],
  run: async (client, message, args, prefix) => {
    let kickuser = message.mentions.users.first();
    if (!kickuser) {
      return  message.channel.send({embed: {
      color: "RED",
      description: ":x: | **Debes Mencionar a alguien**"
    }
})
    }

    if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
      return message.channel.send({embed: {
      color: "RED",
      description: ":x: | **Necesito el permiso \"KICK_MEMBERS\" para realizar este comando!**"
    }
}) .catch(console.error);
    }
    let votekickC = message.mentions.channels.first();
    if (!votekickC){
      message.channel.send({embed: {
      color: "RED",
      description: ":x: | **Debes especificar un canal donde enviar el Vote Kick**"
    }
})
    }
    const kickear = "✅";
    const noKickear = "❎";
    let msg = await votekickC.send({embed: {
      color: "RANDOM",
      fields: [{
          name: "Vote Kick",
          value: `Usuario:${kickuser}\n\`Voten Ahora! | Tiempo 10m\``
            }
          ]
        }
    });
    await msg.react(kickear);
    await msg.react(noKickear);

    const reacciones = await msg.awaitReactions(reaction => reaction.emoji.name === kickear || reaction.emoji.name === noKickear, { time: 600000 });
    var NO_Cuenta = 0
    var SI_Cuenta = 0
    var NO_Cuenta = reacciones.get(noKickear).count;
    var SI_Cuenta = reacciones.get(kickear);

    if (SI_Cuenta == undefined) {
      var SI_Cuenta = 1;
    } else {
      var SI_Cuenta = reacciones.get(kickear).count;
    }

    var sumsum = new Discord.MessageEmbed()

      .addField("Votacion Terminada:", "----------------------------------------\n" +
        `Votos Totales (NO): **${NO_Cuenta - 1}**\n` +
        `Votos Totales (Si): **${SI_Cuenta - 1}**\n` +
        "----------------------------------------\n" +
        "NOTA: Se necesitan (3+) Votos\n" +
        "----------------------------------------", true)

      .setColor("0x#FF0000")

    await votekickC.send({ embed: sumsum });

    if (SI_Cuenta >= 4 && SI_Cuenta > NO_Cuenta) {

      kickuser.kick().then(member => {
        votekickC.send({embed: {
      color: "RED",
      description: `${kickuser} Ha sido Kickeado Exitosamente`
    }
});
      })
    } else {

      votekickC.send({embed: {
      color: "BLUE",
      description: `${kickuser} Se ha Salvado`
    }
});
    }

  }
}
