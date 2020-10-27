const Discord = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');
var prefix = ayarlar.prefix
exports.run = async (client, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(new Discord.RichEmbed().setDescription( ":x: Bu komutu kullanabilmek için *Mesajları Yönet** yetkisine sahip değilsin!").setColor(10038562)).then(msg => msg.delete(9000)); 
  let log = await db.fetch(`logkanal_${message.guild.id}`)
  if (!log) return message.channel.send(new Discord.RichEmbed().setDescription(`:x: Uyarı Kanalı Ayarlanmamış !`).setColor('RED')).then(msg => msg.delete(9000));
  let user = message.mentions.users.first();
  let reason = args.slice(1).join(' ');
  if (message.mentions.users.size < 1) return message.channel.send(new Discord.RichEmbed().setDescription('Uyaracağın kişiyi etiketlemelisin!').setColor('RED')).then(msg => msg.delete(9000));
  if (reason.length < 1) return message.channel.send(new Discord.RichEmbed().setDescription('Uyarma sebebini yazmadın!').setColor('RED')).then(msg => msg.delete(9000));
  if (user.id === message.author.id) return message.channel.send(new Discord.RichEmbed().setDescription('Kendini uyaramazsın!').setColor('RED')).then(msg => msg.delete(9000));
  
  //if (!message.guild.member(user).roles.has(muteRole)) return message.reply('Bu kişi zaten susturulmuş!');
  
  const embed = new Discord.RichEmbed()
  .setTitle(`${client.user.username} Bot  - Uyarı Sistemi`)
  .setThumbnail(client.user.avatarURL)
  .setColor("B22222")
  .setTimestamp()
  .addField('Uyarılan Kullanıcı', `<@${user.id}> | ID : ${user.id}`)
  .addField('Uyaran Yetkili', `<@${message.author.id}> | ID : ${message.author.id}`)
  .addField('Uyarı Sebebi', "```" + reason + "```")
  .setFooter(`${message.author.username} `, message.author.avatarURL)
  
   client.channels.get(log).send(embed);
  
  message.guild.members.get(user.id).send(`<@${user.id}>, \n**${message.guild.name}** adlı sunucuda **${reason}** sebebi ile uyarıldın! \nKuralları çiğnemeye devam eder isen susturulabilir, atılabilir veya yasaklanabilirsin!`)
  
  db.add(`uyarılar_${user.id}`, 1)
  
  const embed2 = new Discord.RichEmbed()
  .setTitle(`${client.user.username} Bot  - Uyarı Sistemi`)
  .setThumbnail(client.user.avatarURL)
  .setColor("RANDOM")
  .setTimestamp()
  .setDescription(`**\n<@${user.id}> adlı kullanıcı **${reason}** sebebi ile başarıyla uyarıldı!**`)
  .setFooter(`${message.author.username} `, message.author.avatarURL)
  message.channel.send(embed2).then(msg => msg.delete(9000));
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["warn", "uyarı-ver"],
  permLevel: 0,
    kategori: "moderasyon3"
};

exports.help = {
  name: 'uyarı',
  category: 'moderasyon',
  description: 'İstediğiniz kişiyi uyarır.',
  usage: 'uyar <@kişi-etiket> <sebep>'
};