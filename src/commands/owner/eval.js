var Discord = require('discord.js');
module.exports = {
  name: 'eval',
  aliases: ["e"],
	category: 'System',
	description: 'Evaluates arbitrary javascript. With great power comes great responsibility',
	usage: 'eval [code]',

  run: async (client, message, args) => {
    
    
    const { clean } = require('../../eventos/Utils.js')
    const nonono = new Discord.MessageEmbed
    nonono.setTitle('<a:rainbow:746978129532289214> |No no no!')
    nonono.setDescription('Que intentas hacer mi loko? solo el Owner del bot puede usar esta opcion <:akkoShrug:705523099583643689>')
    nonono.setImage('https://media1.tenor.com/images/f4e970b8d92408a8993f1d5498c2210b/tenor.gif?itemid=4668608')
    if(!["637346259266699296", "ID 2", "Etc"].includes(message.author.id)) return message.channel.send(nonono)
    
     
    // eslint-disable-line no-unused-vars
//Ya agregadas las id, si el autor del comando no corresponde a las id's que pusiste retornara.
try {
      let code = await args.join(' ');
      let evalued = clean(await eval(code));
      let type = typeof evalued;
      if (typeof evalued !== "string")
        evalued = require("util").inspect(evalued);
      let txt = "" + evalued;

if(txt.length >= 1023){
  txt = `${txt.substr(0, 1010)}...`;

}

 //agregar un limite
 

//Creamos un RichEmbed v11 o MessageEmbed para v12
        var embed = new Discord.MessageEmbed()
        .setAuthor("Evaluacion hecha!", client.user.displayAvatarURL)
        .addField("Entrada", `\`\`\`js\n${args.join(" ")}\n\`\`\``,true)
        .addField('Tiempo',`\`\`\`${Math.floor(Date.now() - message.createdTimestamp)}ms\`\`\``,true) //Se muestra lo que pediste a evaluar
        .addField("Salida", `\`\`\`js\n ${txt}\n\`\`\``)//Y el resultado de la evaluacion
        .addField("Tipo",`\`\`\`js\n${type.substring(0, 1).toUpperCase() + type.substring(1)}\n\`\`\``)  
        .setColor("RANDOM")
        .setFooter("Pedido por: "+message.author.tag)
        message.channel.send(embed);

//Mandamos el embed
    } catch (err) {
//Si hubo un error retorna a esto:
//Creamos un RichEmbed v11 o MessageEmbed para v12
      const embed = new Discord.MessageEmbed()
      .setAuthor("Falla en la evaluacion D:", client.user.displayAvatarURL)
      .addField("Entrada", `\`\`\`js\n${args.join(" ")}\n\`\`\``) //Se muestra lo que pediste a evaluar
      .addField("Salida", `\`\`\`js\n${err}\n\`\`\``) //Y el error que tuvo tu evaluacion asi para poder arreglarlo
      .setColor("RANDOM")
      .setFooter("Pedido por: "+message.author.tag)
      message.channel.send(embed);
      
      
      }
//Mandamos el embed
  } 
}


