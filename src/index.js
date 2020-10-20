const { Client, Collection, MessageEmbed } = require("discord.js");
let { readdirSync } = require('fs');
const db = require('megadb')
let cooldown= new Set();
const Discord = require('discord.js')
const fs = require("fs");
const client = new Discord.Client({ disableEveryone: true , ws: { intents: Discord.Intents.ALL } })

// Collections
client.commands = new Collection();
client.aliases = new Collection();


// Run the command loader
["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

client.on('ready', () => {
  console.log(`Hi, MercuryGG is now online!`);
  setInterval(() => {
    const estados = ["En Mantenimiento",`m/help | Estoy en ${client.guilds.cache.size} servidores.`, "Soporte: https://discord.gg/hdqA2w5", "Awa de coco"];
    const random = Math.floor(Math.random() * estados.length);
    client.user.setPresence({
      activity: {
      name: estados[0],
      url: 'https://www.twitch.tv/cratermaik',
      type: "STREAMING"
       },
      status: "online",
    });
  }, 60000);
});

const queue = new Map();

client.on("message", async message => {
  let prefix;
  let prefix_db = new db.crearDB("Prefixes");
  if (prefix_db.tiene(`${message.guild.id}`)) {
    prefix = await prefix_db.obtener(`${message.guild.id}`)
  } else {
    prefix = "m/"
  }

  if (message.channel.type === 'dm') return;
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;

  const serverQueue = queue.get(message.guild.id);

  if (!message.member) message.member = await message.guild.fetchMember(message);

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;


  let command = client.commands.get(cmd);

  if (!command) command = client.commands.get(client.aliases.get(cmd));

  const nonono = new Discord.MessageEmbed
    nonono.setTitle('Mantenimiento')
    nonono.setDescription('El Bot ahora mismo esta en mantenimiento por errores que estan saltando en la consola **No te preocupes no afecta en nada a los comandos** solo es para limpiar/depurar el bot')
    nonono.setColor("GREEN")
    if(!["637346259266699296", "453261102738833408", "Etc"].includes(message.author.id)) return message.channel.send(nonono)
  
    console.log(message.author.username+" "+message.content)
    
  if (cmd === 'setprefix') {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(":no_entry: | **No tienes permisos para ejecutar este comando**")
    if (!args[0]) return message.channel.send(':no_entry: | **Tienes que poner un prefix**')
    var nuevoPrefix = args[0]
    if (prefix != nuevoPrefix) {
    } else {
      return message.channel.send(":no_entry: | **Este prefix ya esta seteado**")
    }
    prefix_db.establecer(`${message.guild.id}`, args[0])
    return message.channel.send(`:white_check_mark: | **El prefix acaba de ser cambiado a: ${args[0]}**`)
  }


  if (command)
    command.run(client, message, args,prefix);
}); 
client.on('guildBanAdd', async (guild, user) => {
	const fetchedLogs = await guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_BAN_ADD',
	});
	// Since we only have 1 audit log entry in this collection, we can simply grab the first one
	const banLog = fetchedLogs.entries.first();

	// Let's perform a coherence check here and make sure we got *something*
	if (!banLog) return console.log(`${user.tag} was banned from ${guild.name} but no audit log could be found.`);

	// We now grab the user object of the person who banned the user
	// Let us also grab the target of this action to double check things
	const { executor, target } = banLog;

	// And now we can update our output with a bit more information
	// We will also run a check to make sure the log we got was for the same kicked member
	if (target.id === user.id) {
		console.log(`${user.tag} got hit with the swift hammer of justice in the guild ${guild.name}, wielded by the mighty ${executor.tag}`);
	} else {
		console.log(`${user.tag} got hit with the swift hammer of justice in the guild ${guild.name}, audit log fetch was inconclusive.`);
	}
});

client.on("messageDelete", async(message) => {
 const db = require("megadb")
    let messageDel;
    let bd_db = new db.crearDB("setlogs");
    if(bd_db.tiene(`${message.guild.id}`)){
        ida = await bd_db.obtener(`${message.guild.id}-datos-messageUpdate`,"-")
        messageDel = await message.guild.channels.cache.get(ida)
    }
  if(message.author.bot) {
    return
  }
  let logs = await message.guild.fetchAuditLogs({type:"MESSAGE_DELETED"});
  let entry = logs.entries.first();
  if(!message.guild.me.permissions.has("VIEW_AUDIT_LOG")) return
  if(!message.guild.me.permissions.has("VIEW_CHANNEL")) return
  if(!message.guild.me.permissions.has("SEND_MESSAGES")) return
  if(!message.guild.me.permissions.has("MANAGE_MESSAGES")) return
  if(!message.guild.me.permissions.has("MANAGE_ROLES")) return
  const efe = new Discord.MessageEmbed()
  .setAuthor("| Mensaje eliminado",client.user.avatarURL())
  .setThumbnail(message.author.displayAvatarURL())
  .setColor("RANDOM")
  .addField("Eliminado Por:", entry.executor.username)
  .addField("Eliminado En:", message.channel)
  .addField("Autor del Mensaje:", message.author.username)
  .addField("Mensaje Borrado:", `\`\`\`${message.content}\`\`\``);
  if(!messageDel) return;
  console.log(messageDel+"  mensaje eliminado")
  messageDel.send(efe)
})

client.on("messageUpdate", async(oldMessage,newMessage) =>{
    const db = require("megadb")
    let messageUpdate;
    let bd_db = new db.crearDB("setlogs");
    if(bd_db.tiene(`${oldMessage.guild.id}`)){
        ida = await bd_db.obtener(`${oldMessage.guild.id}-datos-messageUpdate`,"-")
        messageUpdate = await oldMessage.guild.channels.cache.get(ida)
  }
  if(oldMessage.author.bot) {
    return
  }
  if(!oldMessage.guild.me.permissions.has("VIEW_AUDIT_LOG")) return
  if(!oldMessage.guild.me.permissions.has("VIEW_CHANNEL")) return
  if(!oldMessage.guild.me.permissions.has("SEND_MESSAGES")) return
  if(!oldMessage.guild.me.permissions.has("MANAGE_MESSAGES")) return
  if(!oldMessage.guild.me.permissions.has("MANAGE_ROLES")) return
  const efe = new Discord.MessageEmbed()
  .setAuthor("| Mensaje Actualizado",client.user.avatarURL())
  .setColor("RANDOM")
  .addField("Actualizado En:", newMessage.channel)
  .addField("Mensaje:", `\`\`\`${oldMessage.content}\`\`\``)
  .addField("Nuevo Mensaje:", `\`\`\`${newMessage.content}\`\`\``)
  if(!messageUpdate) return;
  console.log(messageUpdate+"  mensaje actualizado")
  messageUpdate.send(efe)
  return  
})

client.on("guildMemberUpdate", async(oldMember,newMember) => {
if(!oldMember.guild.me.permissions.has("VIEW_AUDIT_LOG")) return
if(!oldMember.guild.me.permissions.has("VIEW_CHANNEL")) return
if(!oldMember.guild.me.permissions.has("SEND_MESSAGES")) return
if(!oldMember.guild.me.permissions.has("MANAGE_MESSAGES")) return
if(!oldMember.guild.me.permissions.has("MANAGE_ROLES")) return
//Actualizacion de Roles
if(oldMember.roles.cache.size < newMember.roles.cache.size) {
  const db = require("megadb")
  let rolUpdate;
  let bd_db = new db.crearDB("setlogs");
  if(bd_db.tiene(`${oldMember.guild.id}`)){
        ida = await bd_db.obtener(`${oldMember.guild.id}-datos-rolUpdate`,"-")
        rolUpdate = await oldMember.guild.channels.cache.get(ida)
  }
  let roleAdded = newMember.roles.cache.find((r) => !oldMember.roles.cache.has(`${r.id}`));
  if(roleAdded.name == "Muted") return;
  let logs = await oldMember.guild.fetchAuditLogs({type: "MEMBER_ROLE_UPDATE"});
  let entry = logs.entries.first()
  
  const embedAdded = new Discord.MessageEmbed()
  .setAuthor("| Rol Añadido",client.user.avatarURL())
  .setThumbnail(oldMember.user.avatarURL())
  .setColor("RANDOM")
  .addField("Rol Añadido", `${roleAdded}`)
  .addField("Usuario",`${newMember.displayName}`)
  .addField("Moderador", entry.executor.username)
  if(!rolUpdate) return;
  console.log(rolUpdate+"  rol añadido")
  rolUpdate.send(embedAdded)


}else if(oldMember.roles.cache.size > newMember.roles.cache.size) {
  const db = require("megadb")
  let rolUpdate;
  let bd_db = new db.crearDB("setlogs");
  if(bd_db.tiene(`${oldMember.guild.id}`)){
        ida = await bd_db.obtener(`${oldMember.guild.id}-datos-rolUpdate`,"-")
        rolUpdate = await oldMember.guild.channels.cache.get(ida)
  }
  let roleRemoved = oldMember.roles.cache.find((r) => !newMember.roles.cache.has(r.id))
  if(roleRemoved.name == "Muted") return;
  let logs = await oldMember.guild.fetchAuditLogs({type: "MEMBER_ROLE_UPDATE"});
  let entry = logs.entries.first();
  const embedRemoved = new Discord.MessageEmbed()
  .setAuthor("| Rol Removido",client.user.avatarURL())
  .setThumbnail(oldMember.user.avatarURL())
  .setColor("RANDOM")
  .addField("Rol Removido", `${roleRemoved}`)
  .addField("Usuario",`${newMember.displayName}`)
  .addField("Moderador", entry.executor.username)
  if(!rolUpdate) return;
  console.log(rolUpdate+"  rol removido")
  rolUpdate.send(embedRemoved)
}

//Actualizacion de Nombre
if(oldMember.nickname !== newMember.nickname) {
  const db = require("megadb")
    let nombreUptade;
    let bd_db = new db.crearDB("setlogs");
    if(bd_db.tiene(`${oldMember.guild.id}`)){
        ida = await bd_db.obtener(`${oldMember.guild.id}-datos-nombreUptade`,"-")
        nombreUptade = await oldMember.guild.channels.cache.get(ida)
  }
  const efe = new Discord.MessageEmbed()
  .setAuthor("| User Actualizado",client.user.avatarURL())
  .setThumbnail(oldMember.user.avatarURL())
  .setColor("RANDOM")
  .addField("Viejo nick:", oldMember.displayName)
  .addField("Nuevo nick:", newMember.displayName)
  if(!nombreUptade) return;
  console.log(nombreUptade)
  nombreUptade.send(efe+"  user actualizado")
}
});

client.on("guildMemberAdd", async member => {
  let foto;
  let titulo;
  let desc;
  let bd_db = new db.crearDB("bienvenidas");
  if (bd_db.tiene(`${member.guild.id}`)) {
    foto = await bd_db.obtener(`${member.guild.id}-datos-foto`, "-")
    titulo = await bd_db.obtener(`${member.guild.id}-datos-titulo`, "-")
    desc = await bd_db.obtener(`${member.guild.id}-datos-desc`, "-")
  } else {
    foto = "https://androidayuda.com/app/uploads-androidayuda.com/2015/11/Imagen-fondo.jpg"
    titulo = "Welcome"
    desc = 'We hope you enjoy!'
  }
  var canal;
  let bd2_db = new db.crearDB("setbienvenidas");
  if (bd2_db.tiene(`${member.guild.id}`)) {
  canal = await bd2_db.obtener(`${member.guild.id}`)  
  } else {
    return
  }
  
  if(!member.guild.me.permissions.has("ADMINISTRATOR")) return
  if(!member.guild.me.permissions.has("VIEW_AUDIT_LOG")) return
  if(!member.guild.me.permissions.has("VIEW_CHANNEL")) return
  if(!member.guild.me.permissions.has("SEND_MESSAGES")) return
  if(!member.guild.me.permissions.has("MANAGE_MESSAGES")) return

const { registerFont } = require('canvas');
registerFont('fonts/GrenzeGotisch-Bold.ttf', { family: 'Grenze-Bold' });
registerFont('fonts/Roboto-Black.ttf', { family: 'Roboto-Black' });
registerFont('fonts/TitanOne-Regular.ttf', { family: 'TitanOne-Regular' });
registerFont('fonts/ChangaOne-Regular.ttf', { family: 'ChangaOne-Regular' });
registerFont('fonts/uni-sans.heavy-caps.otf', { family: 'uni-sans' });
const Zeew = require("zeew"); 
const Canvas = require("canvas")
const Discord = require("discord.js")

const canvas = Canvas.createCanvas(800,360)
const ctx = canvas.getContext("2d")

//Fondo https://w.wallhaven.cc/full/2e/wallhaven-2eroxm.jpg
//Puedes usar un link directo al wallpaper, pero esto puede presentar un retraso al enviar la imagen
const background = await Canvas.loadImage(foto)
ctx.drawImage(background, 0, 0, 862, 421)

//Titulo
ctx.font = "70px ChangaOne-Regular";
ctx.fillStyle = "#FFFFFF"
ctx.textAlign = "center"
ctx.textBaselin = "hanging"
ctx.fillText(`${titulo}`, canvas.width/2, 250)
ctx.fillStyle = "#FFFFFF"
ctx.font = "55px ChangaOne-Regular";
ctx.fillText(`${member.user.username}`, canvas.width/2, 300)
ctx.font = "35px TitanOne-Regular";
ctx.textAlign = "center"
ctx.textBaselin = "hanging"
ctx.fillStyle = "#FFFFFF"
ctx.fillText(`Esperamos Que Te Diviertas Y Disfrutes`, canvas.width/2, 350)
const y= 30, radio= 85, x=canvas.width/2-radio
//Borde del avatar
ctx.beginPath()
ctx.arc(x+radio, y+radio, radio +5, 0, Math.PI * 2, true)
ctx.fillStyle = "##FFFFFF"
ctx.fill()
ctx.stroke()
ctx.closePath()

//Circulo para cortar el avatar
ctx.save()
ctx.beginPath()
ctx.arc(x+radio, y+radio, radio, 0, Math.PI * 2, true)
ctx.closePath()
ctx.clip()

//Avatar
const imagen = await Canvas.loadImage(member.user.displayAvatarURL({dynamic: false, size:256, format:"png"}))
ctx.drawImage(imagen, x, y, radio*2, radio*2)

const attach = new Discord.MessageAttachment(canvas.toBuffer(),"bienvenida.png")
console.log(canal+"  bienvenida "+member.guild.name)
let sino = member.guild.channels.resolve(canal)
if(sino) {
  member.guild.channels.resolve(canal).send({files: [attach]})
} else {
  return
}
});

client.on("guildMemberRemove", async member => {
  let foto;
  let titulo;
  let desc;
  let bd_db = new db.crearDB("despedidas");
  if (bd_db.tiene(`${member.guild.id}`)) {
    foto = await bd_db.obtener(`${member.guild.id}-datos-foto`, "-")
    titulo = await bd_db.obtener(`${member.guild.id}-datos-titulo`, "-")
    desc = await bd_db.obtener(`${member.guild.id}-datos-desc`, "-")
  } else {
    foto = "https://androidayuda.com/app/uploads-androidayuda.com/2015/11/Imagen-fondo.jpg"
    titulo = "Bye"
    desc = 'I hope you enjoyed'
  }
  var canal;
  let bd2_db = new db.crearDB("setDespedidas");
  if (bd2_db.tiene(`${member.guild.id}`)) {
  canal = await bd2_db.obtener(`${member.guild.id}`)  
  } else {
    return;
  }

  if(!member.guild.me.permissions.has("ADMINISTRATOR")) return
  if(!member.guild.me.permissions.has("VIEW_AUDIT_LOG")) return
  if(!member.guild.me.permissions.has("VIEW_CHANNEL")) return
  if(!member.guild.me.permissions.has("SEND_MESSAGES")) return
  if(!member.guild.me.permissions.has("MANAGE_MESSAGES")) return

  
const { registerFont } = require('canvas');
registerFont('fonts/GrenzeGotisch-Bold.ttf', { family: 'Grenze-Bold' });
registerFont('fonts/Roboto-Black.ttf', { family: 'Roboto-Black' });
registerFont('fonts/TitanOne-Regular.ttf', { family: 'TitanOne-Regular' });
registerFont('fonts/ChangaOne-Regular.ttf', { family: 'ChangaOne-Regular' });
registerFont('fonts/uni-sans.heavy-caps.otf', { family: 'uni-sans' });
const Zeew = require("zeew"); 
const Canvas = require("canvas")
const Discord = require("discord.js")

const canvas = Canvas.createCanvas(800,360)
const ctx = canvas.getContext("2d")

//Fondo https://w.wallhaven.cc/full/2e/wallhaven-2eroxm.jpg
//Puedes usar un link directo al wallpaper, pero esto puede presentar un retraso al enviar la imagen
const background = await Canvas.loadImage(foto)
ctx.drawImage(background, 0, 0, 862, 421)

//Titulo
ctx.font = "70px ChangaOne-Regular";
ctx.fillStyle = "#FFFFFF"
ctx.textAlign = "center"
ctx.textBaselin = "hanging"
ctx.fillText(`${titulo}`, canvas.width/2, 250)
ctx.fillStyle = "#FFFFFF"
ctx.font = "55px ChangaOne-Regular";
ctx.fillText(`${member.user.username}`, canvas.width/2, 300)
ctx.font = "35px TitanOne-Regular";
ctx.textAlign = "center"
ctx.textBaselin = "hanging"
ctx.fillStyle = "#FFFFFF"
ctx.fillText(`${desc}`, canvas.width/2, 350)
const y= 30, radio= 85, x=canvas.width/2-radio
//Borde del avatar
ctx.beginPath()
ctx.arc(x+radio, y+radio, radio +5, 0, Math.PI * 2, true)
ctx.fillStyle = "##FFFFFF"
ctx.fill()
ctx.stroke()
ctx.closePath()

//Circulo para cortar el avatar
ctx.save()
ctx.beginPath()
ctx.arc(x+radio, y+radio, radio, 0, Math.PI * 2, true)
ctx.closePath()
ctx.clip()

//Avatar
const imagen = await Canvas.loadImage(member.user.displayAvatarURL({dynamic: false, size:256, format:"png"}))
ctx.drawImage(imagen, x, y, radio*2, radio*2)

const attach = new Discord.MessageAttachment(canvas.toBuffer(),"despedida.png")
console.log(canal+"  despedida "+ member.guild.name)
let sino = member.guild.channels.resolve(canal)
if(sino) {
  member.guild.channels.resolve(canal).send({files: [attach]})
} else {
  return
}
})

require('dotenv').config();
client.login(process.env.BOT_TOKEN);