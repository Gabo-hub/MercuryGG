const embed = require('discord.js')
module.exports = {

    name: 'emoji', 
    category: 'info',
    description: 'muestra la informacion de el usuario',

    run: async (client, message, args) =>{
if (args.length < 1) return message.channel.send("<:PepeKMS:705520976045015150> | **Porfavor coloca un emoji!**")

    if (args[0].charCodeAt(0) >= 55296) {
        message.delete();

        return (await message.channel.send({embed: client.utils.embed(args[0], '**El emoji esta en discord .-.?**')
        })).delete(15000);
    }

    const match = args[0].match(/<:[a-zA-Z0-9_-]+:(\d{18})>/);

    /*if (!match || !match[1]) {
        message.channel.send('**Coloca un emoji valido!**');
    }*/

    const emoji = client.emojis.cache.get(match[1]) || client.emojis.resolve(match[1]) ;

    if (!emoji) {
        return message.channel.send('**El emoji no se pudo identificar :(.**');
    }

    await message.channel.send({embed: {
        fields: [
            {
                name: 'Nombre',
                value: `\`${emoji.name}\``
            },
            {
                name: 'Server',
                value: `\`${emoji.guild.name}\``
            },
            {
                name: 'ID',
                value: `\`${emoji.id}\``
            },
            {
                name: 'Link de Descarga',
                value: emoji.url
            },
            {
                name: 'Identificador',
                value: `\`<${emoji.animated ? 'a:' : ':'}${emoji.name}:${emoji.id}>\``
            }
        ], thumbnail: emoji.url
    }
  })

}
}