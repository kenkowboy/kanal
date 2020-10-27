const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');
const fs = require('fs');


exports.run = async (client, message, args) => {
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.RichEmbed().setDescription( ":x: Bu komutu kullanabilmek için **Yönetici** yetkisine sahip değilsin!").setColor(10038562)).then(msg => msg.delete(9000));

  let channel = await db.fetch(`banm_${message.guild.id}`)
let banID = message.content.split(' ')[1];
let banDB = await db.fetch("ban_"+banID);
if(banDB == null) 
return message.channel.send(new Discord.RichEmbed()
.setColor("FF0000")
.setTimestamp()
.setTitle(`${client.user.username} Bot  - Yasaklama/Banlama Detay Sistemi`)
.setThumbnail(client.user.avatarURL)
.setDescription(`**\n\`❌\` Banlanan Kişinin Ban ID Numarasını Belirtin !**`)
.setFooter(`${message.author.username}`, message.author.avatarURL)).then(msg => msg.delete(9000));
let banlanan = banDB.split('-')[0];
let banlayan = banDB.split('-')[1];
let sebep = banDB.split('-')[2];
 
  const embed = new Discord.RichEmbed()
    .setColor("FF0000")
    .setTimestamp()
  .setTitle(`${client.user.username} Bot  - Yasaklama/Banlama Detay Sistemi`)
  .setThumbnail(client.user.avatarURL)
    .addField('Yasaklanan Kullanıcı:', `<@${banlanan}> | ID: ${banlanan}`)
    .addField('Yasaklayan Yetkili:', `<@${banlayan}> | ID: ${banlayan}`)
    .addField('Yasaklama Sebebi:', sebep)
    .addField('ID:', banID)
  
.setFooter(`${message.author.username}`, message.author.avatarURL)
    if (!channel) return message.channel.send(new Discord.RichEmbed().setDescription(`\`❌\` Ban Mesaj Kanalı Ayarlanmamış !`).setColor('RED')).then(msg => msg.delete(9000));

 client.channels.get(channel).send(embed);


};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  kategori: 'moderasyon2'

};

exports.help = {
  name: 'bandetay',
  description: 'Ban Detayını Kontrol Eder.',
  usage: 'ban [kullanıcı] [sebep]'
};