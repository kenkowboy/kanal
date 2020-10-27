const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = async (bot, message, args) => {
  
if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(new Discord.RichEmbed().setDescription('Bu komutu kullanmak için **Rolleri Yönet** yetkisine sahip olmalısın.').setColor(10038562));

    let üye = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    let role = message.mentions.roles.first()
    if (!üye) return message.channel.send(`**Kullanıcı etiketlemelisin!\n**Doğru kullanım : \`${ayarlar.prefix}rolver @kullanıcı @rol\``);
    if (!role) return message.channel.send(`**Rol etiketlemelisin!\n**Doğru kullanım : \`${ayarlar.prefix}rolver @kullanıcı @rol\`**`);
    if (üye.roles.has(role.id)) return message.channel.send('Bu kullanıcı zaten bu rolde.');
    await (üye.addRole(role.id))
    message.channel.send(new Discord.RichEmbed().setDescription(`${üye} isimli üyeye \`${role.name}\` isimli yetki başarıyla verildi! :white_check_mark:`).setColor('RANDOM'));

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "rolver",
  description: "Kişilere Rol Yetkisi Verir",
  usage: "rolver <mesaj>"
};