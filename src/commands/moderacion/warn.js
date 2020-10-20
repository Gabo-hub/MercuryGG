const Discord = require("discord.js")
const ms = require("ms")
module.exports = {
    name: "warn",
    alias: ["tm"],
    run:async (client, message, args, prefix) => {
let {crearDB} = require("megadb") 
let warns = new crearDB("warns"); 


let usuario = message.mentions.members.first() || message.guild.members.resolve(args[0])
let server = await message.guild.id
let razon = args[1] ? args.slice(1).join(' ') : 'No fue especificada' 
if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send({embed: {
      color: "RED",
      description: '<a:yamete:712626713044975697> \`|\`**No tienes permisos suficientes para hacer un warn**'
    }
}) 
if(!usuario) return message.channel.send({embed: {
      color: "RED",
      description: `<a:kanna_eats_ping:708886788357226537> | **Menciona una persona:**\`${prefix}warn <user> <razon>\``
    }
}) 

if(razon.length > 1024) return message.channel.send({embed: {
      color: "RED",
      description: `**La razón es demaciado larga :(, no puede exceder los 1024 caracteres**`
    }
}) 
if (usuario.user.bot === true) {
    message.channel.send({embed:{
      description: ":no_entry: | **No puedes Warnear a un Bot**",
      color: "RED"
    }})
    return;
  }

if(!warns.tiene(`${server}.${usuario}`)) {
warns.establecer(`${server}.${usuario}`, 1).catch(e => console.log(e))
} 
warns.sumar(`${server}.${usuario}`, 1).catch(e => console.log(e))
 
let warns3 = await warns.obtener(`${server}.${usuario}`).catch(e => console.log(e))
console.log(warns3)
let embed = new Discord.MessageEmbed()
.setTitle('<a:MonokumaBan:747575088798367834> » **Usuario Advertido**')
.addField('<:tttgun:747485083643936775> » **Usuario:**', `${usuario}`)
.addField('<:MrClean:747485084512157806> » **Advertido por:**', `${message.author}`)
.addField(':tickets: » **Razón:**', razon)
.addField(':anchor: » **Warns**',warns3)
.setColor('RED')
message.channel.send(embed).catch(e => console.log(e))
client.users.resolve(usuario).send({embed: {
  color: "RED",
  description:`Acabas de ser Advertido en el Servidor ${message.guild.name} por la razón: ${razon}, Número de Warns: ${warns3} :L`
    }
}).catch(e => console.log(e))

let warns2 = await warns.obtener(`${server}.${usuario}`).catch(e => console.log(e))
    }
}
/*
db.subtract(`warns_${usuario.id}`, 3)
setTimeout(() => {
usuario.roles.remove(muteRole)

}, 600000)
}
  }
}
> Como hago para hacer esto en un embed?https://cdn.discordapp.com/attachments/762479071870844949/764177188953129000/comandos.PNG
@𝑴𝒂𝑻𝒊𝒂𝒙𝟐𝟗#5561 
```js
.addField("titulo", "(Compra esta wea)[Link]")
```

*/ 