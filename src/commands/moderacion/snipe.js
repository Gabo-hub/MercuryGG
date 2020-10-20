const MessageEmbed = require ("discord.js")
const fetch = require ('node-fetch')
module.exports = {
    name: 'snipe',
    description: 'Muestra el ultimo mensaje eliminado.',
    categoria: 'Utilidad',
    run: async (message, client, args) => {
    const snipes = client.snipes.get(message.channel.id) || [];
    const msg = snipes[args[0] - 1 || 0];
    if (!msg) return message.channel.send(`That is not a valid snipe...`);
    const Embed = new MessageEmbed()
      .setAuthor(
        msg.author.tag,
        msg.author.displayAvatarURL({ dynamic: true, size: 256 })
      )
      .setDescription(msg.content)
      .setFooter(`Date: ${msg.date} | ${args[0] || 1}/${snipes.length}`);
    if (msg.attachment) Embed.setImage(msg.attachment);
    message.channel.send(Embed);
  }
}
