const Discord = require ('discord.js')
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
module.exports={
    name:"npm",
    description:"Para crear una encuesta",
    category:"funcion",
    run: async (client, message, args) => { 
  const pkg = args.join(" ").toLowerCase()
 if(!pkg) return message.channel.send({embed: {
      color: "RED",
      description: "Que npm quieres buscar mi loko .-.?"
    }
})
    const body = await fetch(`https://registry.npmjs.com/${pkg}`)
      .then((res) => {
        if(res.status === 404) throw "No results found.";
        return res.json();
      });

    const version = body.versions[body["dist-tags"].latest];

    let deps = version.dependencies ? Object.keys(version.dependencies) : null;
    let maintainers = body.maintainers.map((user) => user.name);

    if(maintainers.length > 10) {
      const len = maintainers.length - 10;
      maintainers = maintainers.slice(0, 10);
      maintainers.push(`...${len} más.`);
    }

    if(deps && deps.length > 10) {
      const len = deps.length - 10;
      deps = deps.slice(0, 10);
      deps.push(`...${len} more.`);
    }

    const embed = new MessageEmbed()
      .setColor(0xff0000)
      .setTitle(`NPM - ${pkg}`)
      .setURL(`https://npmjs.com/package/${pkg}`)
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ size: 64 }))
      .setDescription([
        body.description || "No Description.",
        `**Versión:** ${body["dist-tags"].latest}`,
        `**Licencia:** ${body.license}`,
        `**Autor:** ${body.author ? body.author.name : "Unknown"}`,
        `**Modificado:** ${new Date(body.time.modified).toDateString()}`,
        `**Dependencias:** ${deps && deps.length ? deps.join(", ") : "None"}`
      ].join("\n"));

    return message.channel.send({ embed });
  }
}