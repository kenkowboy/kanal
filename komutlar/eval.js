const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');
const fs = require("fs");
exports.run = async (client, message, args) => {
  
  if(message.author.id !== ayarlar.sahip && message.author.id !== ayarlar.sahip2 && message.author.id !== ayarlar.sahip3) return message.channel.send(new Discord.RichEmbed().setDescription(' Bu komut bot sahibine özeldir!').setColor('RED'))
  
 let codein = args.slice(0).join(' ')
  if(!codein.toLowerCase().includes('token') && !codein.toLowerCase().includes('ayarlar') && !codein.toLowerCase().includes('config')) {
    
  try {
      let code = eval(codein)
      if (codein.length < 1) return message.channel.send(`:x: Bir kod girmelisin.`)
      if (typeof code !== 'string')    
        code = require('util').inspect(code, { depth: 0 });
      
      const embed = new Discord.RichEmbed()
      .setColor('GREEN')
      .addField('Kod', `\`\`\`js\n${codein}\`\`\``)
      .addField('Sonuç', `\`\`\`js\n${code}\n\`\`\` `)
      message.channel.send(embed)
  } catch(e) {
    let embed2 = new Discord.RichEmbed()
    .setColor('RED')
    .addField('Kod', `\`\`\`js\n${codein}\`\`\``)
    .addField('Hata', `\`\`\`js\n${e}\`\`\``)
    message.channel.send(embed2)
  }
 } else {
    
    message.channel.send(new Discord.RichEmbed().setDescription(`<@${message.author.id}> Fazla zekisin herhalde :D`).setColor('RED'))
 }


};
//eval require('quick.db').delete(`ayar_${message.guild.id}`)
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['eva'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'eval',
    description: 'Kod denemeyi sağlar.',
    usage: 'eval <kod>',
    kategori: "yapımcı"
  };