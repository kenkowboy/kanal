const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');
const fs = require('fs');


exports.run = async (client, message, args) => {
message.delete()
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.RichEmbed().setDescription( ":x: Bu komutu kullanabilmek için **Yönetici** yetkisine sahip değilsin!").setColor(10038562)).then(msg => msg.delete(9000));

let log = await db.fetch(`logkanal_${message.guild.id}`)


let banID = await db.fetch("banID");
if(banID == null) banID = 0;
  db.set("banID", ++banID);
//message.channel.send(banID);
  
  if (!message.guild) {
  const ozelmesajuyari = new Discord.RichEmbed()
  .setColor(0xFF0000)
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField(':x: Uyarı', '`ban` adlı komutu özel mesajlarda kullanamazsın.')
  return message.author.sendEmbed(ozelmesajuyari); }
  let guild = message.guild
  let user = message.mentions.users.first();
  let reason = args.slice(1).join(' ');
if (message.mentions.users.size < 1) return message.channel.send(new Discord.RichEmbed().setDescription(':x: Kimi banlayacağını yazmalısın !').setColor('RED')).then(msg => msg.delete(5000));
if (reason.length < 1) return message.channel.send(new Discord.RichEmbed().setDescription(':x: Ban sebebini yazmalısın !').setColor('RED')).then(msg => msg.delete(5000));
if (!message.guild.member(user).bannable) return message.channel.send(new Discord.RichEmbed().setDescription(':x: Atmak istediğin kişi **Üyeleri Yasaklama** yetkisine sahip **Atamam !**').setColor('RED')).then(msg => msg.delete(5000));
 message.guild.ban(user, 2);
  message.guild.members.get(user.id).send(`<@${user.id}>, \n**${message.guild.name}** adlı sunucuda **${reason}** sebebi ile yasaklandın! <@${ayarlar.sahip}> adlı kişiyle irtibata geçebilirsiniz ! \n\n**Ban Kodunuz \`${banID}\`**`)
  const embed = new Discord.RichEmbed()
    .setColor("FF0000")
    .setTimestamp()
  .setTitle(`${client.user.username} Bot  - Yasaklama/Banlama Sistemi`)
  .setThumbnail(client.user.avatarURL)
    .addField('Yasaklanan Kullanıcı:', `<@${user.id}> | ID: ${user.id}`)
    .addField('Yasaklayan Yetkili:', `<@${message.author.id}> | ID: ${message.author.id}`)
    .addField('Yasaklama Sebebi:', reason)
    .addField('ID:', banID)
    if (!log) return message.channel.send(new Discord.RichEmbed().setDescription(`:x: Log Kanalı Ayarlanmamış !`).setColor('RED')).then(msg => msg.delete(9000));
  let banDb = user.id+"-"+message.author.id+"-"+reason;
  db.set('ban_'+banID, banDb);
 client.channels.get(log).send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  kategori: 'moderasyon2'

};

exports.help = {
  name: 'ban',
  description: 'İstediğiniz Kişiyi Sunucudan Yasaklar.',
  usage: 'ban [kullanıcı] [sebep]'
};