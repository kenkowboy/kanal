const Discord = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');
var prefix = ayarlar.prefix
exports.run = (client, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(new Discord.RichEmbed().setDescription( ":x: Bu komutu kullanabilmek için *Mesajları Yönet** yetkisine sahip değilsin!").setColor(10038562)).then(msg => msg.delete(9000));   
  let user = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.channel.send(new Discord.RichEmbed().setDescription(':x: Uyarısına bakacağın kişiyi etiketlemelisin!').setColor('RANDOM')).then(msg => msg.delete(9000));

  if (db.has(`uyarılar_${user.id}`) === false) return message.channel.send(new Discord.RichEmbed().setDescription(":x:Bu kullanıcının hiç uyarısı bulunmuyor!").setColor('RANDOM')).then(msg => msg.delete(9000));
  
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setTimestamp()
  .setThumbnail(client.user.avatarURL)
  .setAuthor(`${user.username} - Uyarı Bilgisi`, user.avatarURL)
  .addField("Uyarı Sayısı", db.has(`uyarılar_${user.id}`) ? db.fetch(`uyarılar_${user.id}`) : 0)
  .setFooter(`${message.author.username} `, message.author.avatarURL)
  message.channel.send({embed}).then(msg => msg.delete(15000));
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["warns"],
  permLevel: 0,
    kategori: "moderasyon3"
};

exports.help = {
  name: 'uyarılar',
  category: 'moderasyon',
  description: 'İstediğiniz kişinin uyarılarını gösterir.',
  usage: 'uyarılar <@kullanıcı>'
};