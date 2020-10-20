const db = require('megadb')
module.exports = {
  name: 'addpremium',
  aliases: ["addp"],
	category: 'System',
	description: 'Evaluates arbitrary javascript. With great power comes great responsibility',
	usage: 'eval [code]',

  run: async (client, message, args) => {
     const nonono = new Discord.MessageEmbed
    nonono.setTitle('<a:rainbow:746978129532289214> |No no no!')
    nonono.setDescription('Que intentas hacer mi loko? solo el Owner del bot puede usar esta opcion <:akkoShrug:705523099583643689>')
    nonono.setImage('https://media1.tenor.com/images/f4e970b8d92408a8993f1d5498c2210b/tenor.gif?itemid=4668608')
    if(!["637346259266699296", "ID 2", "Etc"].includes(message.author.id)) return message.channel.send(nonono)
    
    let user = message.mentions.users.first() || client.users.cache.get(args[0])
    || client.users.cache.find(x => (args)?(x.tag === args.join(" ")):undefined)
    if(!user){
      return message.channel.send({embed: {
        description: ":x: | **Debes Mencionar a una persona para añadir como premium**",
        color: 'RED'
      }})
    }
    let premium_db = new db.crearDB("premiums");
    premium_db.establecer(user.id,{nombre:user.username})
    message.channel.send({embed: {
      description: `:white_check_mark: | **Se ah añadido correctamente el usuario: ${user.tag} Correctamente!**`,
      color: 'RED'
    }})
  }
}