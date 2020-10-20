const Discord = require('discord.js');
module.exports = {

    name: 'covid-g',
    category: 'covid',
    description: 'muestra toda la info de covid-19',

    run: async (client, message, args) =>{
try{
//Indicamos la pagina web de los datos, puedes poner o cambiar un dato si prefieres
    let res = await require('node-fetch')(`https://corona.lmao.ninja/v2/all?yesterday=false`);
    let data = await res.json();
//Hacemos un embed para indicar los datos
    let covid = new Discord.MessageEmbed()
    .setTitle('Covid-19') 
    .addField('Casos', data.cases.toLocaleString(), true)
    .addField('Casos Hoy', data.todayCases.toLocaleString(), true)
    .addField('Muertes', data.deaths.toLocaleString(), true)
    .addField('Muertes Hoy', data.todayDeaths.toLocaleString(), true)
    .addField('Situaciones criticas', data.critical.toLocaleString(), true)
    .addField('Recuperados', data.recovered.toLocaleString(), true)
    .addField('Paises Afectados', data.affectedCountries.toLocaleString(), true)
    .addField("**Medidas de Prevención**", ":small_blue_diamond: Lavarse las manos frecuentemente \n:small_blue_diamond: Usar Gel Antibacterial\n:small_blue_diamond: Usar Alcohol\n:small_blue_diamond: Para Toser o estornudar usar un pañuelo \n:small_blue_diamond: Evitar contacto directo de personas con sintoma de Tos\n:small_blue_diamond: Quedarse en Casa", false) 
    .setFooter("#QuedateEnCasa", "https://fems-microbiology.org/wp-content/uploads/2020/03/2019-nCoV-CDC-23312_without_background-pubic-domain.png")
    .setThumbnail("https://www.elindependiente.com/wp-content/uploads/2020/03/gif-mapa-internacional.gif")
    .setColor('RED')
    message.channel.send(covid)
    }catch(e){
      message.channel.send('Ha ocurrido un error!')
//Indicamos que pasa si hay un error
}
}
}