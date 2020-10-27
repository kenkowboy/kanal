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
  if (message.mentions.users.size < 1) return message.channel.send(new Discord.RichEmbed().setDescription('Uyarılarını kaldıracağın kişiyi etiketlemelisin!').setColor('RANDOM')).then(msg => msg.delete(9000));
  
  if (db.has(`uyarılar_${user.id}`) === false) return message.channel.send(new Discord.RichEmbed().setDescription("Bu kullanıcının hiç uyarısı bulunmuyor!").setColor('RANDOM')).then(msg => msg.delete(9000));
  
  db.delete(`uyarılar_${user.id}`)
  
  const embed = new Discord.RichEmbed()
  .setTitle(`${client.user.username} Bot  - Uyarı Kaldırma Sistemi`)
  .setThumbnail(client.user.avatarURL)
  .setColor("FF4500")
  .addField('Uyarısı Kaldırılan Kullanıcı', `<@${user.id}> | ID : ${user.id}`)
  .addField('Uyarısını Kaldıran Yetkili', `<@${message.author.id}> | ID : ${message.author.id}`)
  .setTimestamp()
  .setFooter(`${client.user.username} - Uyarı Sistemi`, client.user.avatarURL)
    

  client.channels.get(log).send(embed);
    const embed2 = new Discord.RichEmbed()
  .setTitle(`${client.user.username} Bot  - Uyarı Sistemi`)
  .setThumbnail(client.user.avatarURL)
  .setColor("RANDOM")
  .setTimestamp()
  .setDescription(`**\n<@${user.id}> adlı kullanıcının başarıyla uyarısı kaldırıldı!**`)
  .setFooter(`${message.author.username} `, message.author.avatarURL)
  message.channel.send(embed2).then(msg => msg.delete(9000));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["warnd-delete", "uyarı-sil"],
  permLevel: 0,
    kategori: "moderasyon3"
};

exports.help = {
  name: 'uyarı-kaldır',
  category: 'moderasyon',
  description: 'İstediğiniz kişinin uyarılarını kaldırır.',
  usage: 'uyarı-kaldır <@kullanıcı>'
};