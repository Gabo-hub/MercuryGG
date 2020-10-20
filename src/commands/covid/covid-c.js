const Discord = require("discord.js")
module.exports = { 
    name: "covid-c",
    alias: [],
    category: 'covid',
    description: 'muestra toda la info de covid-19',
  run: async (client, message, args) => {

    const superagent = require('superagent')
    let res = await require('node-fetch')(`https://corona.lmao.ninja/v2/all?yesterday=false`);
    let data = await res.json();

let pais = args[0] // Es dónde escribiremos el Nombre del pais a buscar
if(!pais) return message.channel.send("¡Escribe el nombre del Pais a buscar información sobre el `COVID-19`! :x:") // Si el usuario no escribe el nombre del pais, nuestro BOT, retorna un mensaje diciendo que no ha colocado el nombre del pais

superagent
.get(`https://corona.lmao.ninja/v2/countries/${pais}`) // Con el NPM, "superagent", buscamos en la página, la información del pais sobre el covid-19.
.end((err,res) => {
  let body = res.body
  
  if(body.message) return message.channel.send("¡El nombre del pais es invalido! :x:") // Si no encuentra el nombre retorna mensaje que no lo encontro.
let cav = (body.cases - body.recovered)
  
  var embed = new Discord.MessageEmbed()
  .setAuthor("Casos del pais " + pais)
  .addField("**Casos Totales**", `${body.cases}`, true) // Casos totales de ese pais
  .addField("**Casos Críticos**", `${body.critical}`, true) // Casos criticos de ese pais
  .addField("**Casos Hoy**", `${body.todayCases}`, true) // Casos de "HOY" de ese pais
  .addField("**Muertes Totales**", `${body.deaths}`, true) // Muertes por el COVID-19 de ese pais
  .addField("**Muertes Hoy**", `${body.todayDeaths}`, true) // Muertes de hoy por el COVID-19 ese pais
  .addField("**Recuperados**", `${body.recovered}`, true) // Recuperados del COVID-19
  .addField("**Casos Activos**",`${cav}`, true)
  .addField("**Medidas de Prevención**", ":small_blue_diamond: Lavarse las manos frecuentemente \n:small_blue_diamond: Usar Gel Antibacterial\n:small_blue_diamond: Usar Alcohol\n:small_blue_diamond: Para Toser o estornudar usar un pañuelo \n:small_blue_diamond: Evitar contacto directo de personas con sintoma de Tos \n:small_blue_diamond: Quedarse en Casa", false) 
  .setTimestamp()
  .setColor("RED")
  .setFooter("#QuedateEnCasa", "https://fems-microbiology.org/wp-content/uploads/2020/03/2019-nCoV-CDC-23312_without_background-pubic-domain.png")
  .setThumbnail("https://media1.tenor.com/images/a866d1334a0a635eeda88c371caee50a/tenor.gif?itemid=16660839")
  message.channel.send(embed) // Envia toda la información del COVID-19, del pais buscado en un EMBED.
  
})   
  }
} 
