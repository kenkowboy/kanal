const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');
const fs = require('fs');

exports.run = async (client, message, args) => {
  message.delete()
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.RichEmbed().setDescription( ":x: Bu komutu kullanabilmek için **Yönetici** yetkisine sahip değilsin!").setColor(10038562)).then(msg => msg.delete(9000));

  let channel = await db.fetch(`banm_${message.guild.id}`)
  
  if (!message.guild) {
  const ozelmesajuyari = new Discord.RichEmbed()
  .setColor(0xFF0000)
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField(':x: **Uyarı**', '`unban` **adlı komutu özel mesajlarda kullanamazsın.** ')
  return message.author.sendEmbed(ozelmesajuyari); }
  let guild = message.guild
  let reason = args.slice(1).join(' ');
  client.unbanAuth = message.author;
  client.unbanReason = reason;

  let user = args[0];
  if (!user) return message.channel.send(new Discord.RichEmbed().setDescription(':x: **Banı kaldırılacak kişinin** **__ID__** **numarasını yazmalısın.**').setColor('RED')).then(msg => msg.delete(5000));

if (reason.length < 1) return message.channel.send(new Discord.RichEmbed().setDescription(':x: **Ban kaldırma sebebini belirtmedin!**').setColor('RED')).then(msg => msg.delete(5000));
  message.guild.unban(user);

 
  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setTitle(`${client.user.username} Bot  - Yasak/Ban Kaldırma Sistemi`)
    .setThumbnail(client.user.avatarURL)
    .addField('Yasağı Silinen Kullanıcı:', `<@${user}> | ID: ${user}`)
    .addField('Yasağı Silen Yetkili:', `<@${message.author.id}> | ID: ${message.author.id}`)
    .addField('Sebep', reason);
  return guild.channels.get(channel).send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  kategori: "moderasyon2"
};

exports.help = {
  name: 'unban',
  description: 'İstediğiniz Kişinin Banını Kaldırır.',
  usage: 'unban [kullanıcı] [sebep]'
};
