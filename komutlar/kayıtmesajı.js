const Discord = require('discord.js');

exports.run = (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`**Bu komutu kullanmak için \`Yönetici\` izniniz bulunmuyor!**`)
	    message.delete();
    const embed = new Discord.RichEmbed()
    .setColor(0xD97634)
    .setDescription(`**Gametürk.net Oyun ve Oyuncu Formu Discord Sunucumuza Hoşgeldiniz..**

➤ Sunucumuzda Kayıt Olmalısınız. Kayıt Olmak İçin \`!kayıt\` yazınız. 
➤ Ses teyidi vermeniz **zorunludur.**
➤ Teyit kanallarına giriş yaparak yetkililerimizi bekleyiniz.
➤ Sunucumuzun özelliklerinden yararlanmak için __kaydınızı tamamlayınız.__

Saygılarımızla **GameTürk Ailesi** <a:tik:696413395431456841> `)
    return message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'kayıtmesaj',
  description: '',
  usage: ''
};