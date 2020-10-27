const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');
var prefix = ayarlar.prefix

module.exports.run = async (client, message, args) => {
message.delete();
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.RichEmbed().setDescription( ":x: Bu komutu kullanabilmek için **Yönetici** yetkisine sahip değilsin!").setColor(10038562)).then(msg => msg.delete(9000));

  let log = await db.fetch(`logkanal_${message.guild.id}`)
  
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send(new Discord.RichEmbed().setDescription(':x: Kimi atacağımı yazmalısın !').setColor('RED')).then(msg => msg.delete(9000));
    if(kUser.id === client.user.id) return message.channel.send(new Discord.RichEmbed().setDescription(':x: Botu **Atamazsın!**').setColor('RED')).then(msg => msg.delete(9000)); 
    let kReason = args.join(" ").slice(22);
    if(!kReason) return message.channel.send(new Discord.RichEmbed().setDescription(':x: Atma sebebini yazmalısın !').setColor('RED')).then(msg => msg.delete(9000));
    if(kUser.hasPermission("BAN_MEMBERS")) return message.channel.send(new Discord.RichEmbed().setDescription(":x: Atmak istediğin kişi **Üyeleri At** yetkisine sahip **Atamam !**").setColor('RED')).then(msg => msg.delete(9000));
  message.guild.member(kUser).kick();
  message.guild.members.get(kUser.id).send(`<@${kUser.id}>, \n**${message.guild.name}** adlı sunucuda **${kReason}** sebebi ile atıldın ! <@${ayarlar.sahip}> adlı kişiyle irtibata geçebilirsiniz ! `)
    let kickEmbed = new Discord.RichEmbed()
    .setTitle(`${client.user.username} Bot  - Atma/Kickleme Sistemi`)
    .setThumbnail(client.user.avatarURL)
    .setColor("DC143C")
    .addField("Atılan Kişi", `<@${kUser.id}> | ID: ${kUser.id}`)
    .addField("Atan Yetkili", `<@${message.author.id}> | ID: ${message.author.id}`)
    .addField("Sebep", kReason);
    if (!log) return message.channel.send(new Discord.RichEmbed().setDescription(`:x: Log Kanalı Ayarlanmamış !`).setColor('RED')).then(msg => msg.delete(9000));

  client.channels.get(log).send(kickEmbed);};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  kategori: "moderasyon2"
};

exports.help = {
  name: 'kick',
  description: 'İstediğiniz kişiyi atar/kickler.',
  usage: 'kick [kullanıcı] [sebep]'
};