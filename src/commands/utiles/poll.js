const Discord = require ('discord.js')
const ms = require('ms')
module.exports={
    name:"poll",
    description:"Para crear una encuesta",
    category:"funcion",
    run: async (client, message, args,prefix) => {
      if (!message.member.permissions.has("ADMINISTRATOR"))
      return message.channel.send({embed: {
      color: "RED",
      description: `**No tienes los permisos suficientes para hacer poll**, ${message.author.username}`
    }
}) 
      
      if (!args[0]){
      return message.channel.send({embed: {
      color: "RED",
      description: `:gear: | **Coloca Las Propiedades:**\`${prefix}poll Canal Tiempo "Titulo" "Descripcion"\``
    }
})
      }

      let votekickC = message.mentions.channels.first();
      if (!votekickC){
      return message.channel.send({embed: {
      color: "RED",
      description: ":gear: | **Debes especificar un canal donde enviar el Poll**"
    }
})
      }

      if (!args[1]) return message.channel.send({embed: {
      color: "RED",
      description: `<:akkoShrug:705523099583643689> | **Debes especificar el tiempo que dura el Sorteo, Ejemplo: \`<1d>, <1h> o <1m>\`**`
    }
})

      let titulo = args.slice(2).join(" ")
      const array = titulo.split('"')
      if(array[1] === undefined || array[3]  === undefined){
        return message.channel.send({embed: {
      color: "RED",
      description: `:gear: | **Tienes que colocar las comillas para separar el titulo a la descripcion:\n\`${prefix}poll #Ejempl 1m "Prueba" "Lo Haré bien?"\`**`
    }
})
      }
      console.log(array)
      if (!titulo) {
      return message.channel.send({embed: {
      color: "RED",
      description: `:gear: | **Debes especificar la titulo del Poll**`
    }
}) 
      }

      let descripcionp = args.slice(3).join(" ");
      if (!descripcionp){
      return message.channel.send({embed: {
      color: "RED",
      description: ":gear: | **Debes especificar la description del Poll**"
    }
}) 
      }

      if (
      !args[1].endsWith("d") &&
      !args[1].endsWith("h") &&
      !args[1].endsWith("m")
    ) return message.channel.send({embed: {
      color: "RED",
      description: ":x: | **Ese no es un formato de tiempo no es valido:\`<1d>, <1h> o <1m>\`**"
    }
}) 

    const micro = ms(args[1])
    const segundos = Math.floor(micro / 1000)

    const si_poll = "✅";
    const no_poll = "❎";
    let msg = await votekickC.send({embed: {
      color: "RANDOM",
      title: `${array[1]}`,
      description: `${array[3]}\n\`Voten Ahora! | Con un Tiempo de: ${segundos} Segundos\``
        }
    });
    
    await msg.react(si_poll);
    await msg.react(no_poll);
    const reacciones = await msg.awaitReactions(reaction => reaction.emoji.name === si_poll || reaction.emoji.name === no_poll, { time: ms(args[1])});
    var NO_Cuenta = 0
    var SI_Cuenta = 0
    var NO_Cuenta = reacciones.get(no_poll).count;
    var SI_Cuenta = reacciones.get(si_poll);

    if (SI_Cuenta == undefined) {
      var SI_Cuenta = 1;
    } else {
      var SI_Cuenta = reacciones.get(si_poll).count;
    }

    if (SI_Cuenta <= 1 && NO_Cuenta <= 1 ) {
        return votekickC.send({embed: {
      color: "RANDOM",
      description: `**No hubo suficientes Votos para Concretar el Poll**`
    }
});
}
    if (SI_Cuenta == NO_Cuenta) {
      return votekickC.send({embed: {
      color: "GREEN",
      description: `<:nose:762437094043156531> | Hubo un empate de: ${array[3]}`
    }
      });
    }

    if (SI_Cuenta > NO_Cuenta) {
       votekickC.send({embed: {
      color: "BLUE",
      description: `<:pepe_ama:757820049267359843> |  La gente Prefiere: ${array[3]}`
    }
});
    } else {

      votekickC.send({embed: {
      color: "RED",
      description: `<:peepoPANTIES:705520977097785515> | La gente **No** Quiere: \`${array[3]}\``
    }
});
    }
  }
};
