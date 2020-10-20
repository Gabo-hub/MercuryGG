const Discord = require ('discord.js')
const moment = require('moment');
const momentesp = require ('../../eventos/momentesp.js');
const { stat } = require('fs');
const toArray = require('discord.js')
const { Constants } = require('eris');
module.exports = {

    name: 'info', 
    category: 'info',
    description: 'muestra la informacion de el usuario',

    run: async (client, message, args) =>{

      let user = message.mentions.users.first() 
    || client.users.cache.get(args[0])
    || client.users.cache.find(x => (args)?(x.tag === args.join(" ")):undefined)
    || message.author
let member = message.guild.member(user);
var x
if(moment.locate = "es") {x=moment.utc(user.createdAt).format('LLLL');} 
else {x=moment.utc(user.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}

var joinDiscord = x
var joinServer = moment.utc(user.joinedAt).format('LLLL');

const badges = Object.keys(Constants.UserFlags).filter((flag) => {
    return user.publicFlags & Constants.UserFlags[flag];
});

var status = user.presence.status 
function estado(status1) {
 switch (status1){
   case ("dnd"):
     return "<:dnd:746521299798458398> No Molestar";
     case ("online"):
      return "<a:5886_online:746499785711812738> Conectado";
     case("idle"):
      return "<:idle:746521645895778479> Ausente";
     case("offline"):
      return "<:invisible:746521977396789279> Desconectado";
 }
  
}
if (member.user.bot === true) {
    bot = ":green_circle: Si";
  } else {
    bot = ":red_circle: No";
  }
  let inline = true
  
  const perms = member.permissions.toArray();
  let permstext = "";
  if (perms.indexOf("ADMINISTRATOR") === -1) {
    permstext = perms.join(",") || "No tiene permisos";
  } else {
    permstext = ">> Adiminstrador";
  }
  const perms2 = member.permissionsIn(message.channel).toArray();
  let permstext2 = "";
  if (perms2.indexOf("ADMINISTRATOR") === -1) {
    permstext2 = perms2.join(",") || "No tiene permisos";
  } else {
    permstext2 = ">> Adiminstrador";
  }
  

//
// moment.utc(user.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')

             const embed = new Discord.MessageEmbed()     
             .setThumbnail(user.avatarURL())      
             .setAuthor(user.username +'#'+ user.discriminator, user.avatarURL())  
             .addField('<:hola_taco:746523099960311860> Nombre', `Nombre: ${user.username}`, false)   
             .addField('ID',`:id: ${user.id}`, false)
             .addField('Jugando a',`:video_game: ${user.presence.activity !=null ? user.presence.activity.name :"Nada"}`, false)          
             .addField('Estado',estado(status), false)
             .addField("Bot", `${bot}`,inline, false)
             //.addField("Rol Más Alto", member.roles.cache.size > 1 ? member.roles.highest.name : "None", false)     
             .addField('Roles:', member.roles.cache.map(r => `${r}`).join(' | '), false)
             //.addField('Permisos',`<a:cute_cat:734605543913685012> \`${permstext}\``,false)
             .addField('Cuenta Creada',joinDiscord, false)   
             //.addField('ejemplo',`a ${badges}`,false)  
             .addField('Fecha de Ingreso',joinServer,false)          
             .setColor("RED")
             .setTimestamp()
             .setFooter(`MercuryGG | v2.0`, client.user.avatarURL())          
            message.channel.send({ embed });
     
        
        }
    }