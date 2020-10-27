const Discord = require('discord.js');
exports.run = function(client, message, args) {
   message.delete(1000);
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`**Bu komutu kullanmak için \`Yönetici\` izniniz bulunmuyor!**`)
    
    let mesaj = args.slice(0).join(' ');
    if (!mesaj) return message.channel.send('**Duyuru Atcağım Yazıyı Unuttun!**').then(msg => msg.delete(5000))
    
    let kanal = message.guild.channels.find(name => name.name === 'duyurular')
    if(!kanal) return message.channel.send(`Duyurular kanalını bulamadım!\n\`duyurular\` Adında yeni bir kanal oluşturunuz!`).then(msg => msg.delete(5000))
  
    const duyuru = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTimestamp()
    .setTitle('Duyuru Var!')
    .setDescription(`${mesaj}`)
    kanal.send(duyuru);
    kanal.send('||@everyone @here||')
    const duyuruok = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('İşlem Tamamlandı :white_check_mark:')
    message.channel.send(duyuruok);

};
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

module.exports.help = {
  name: 'duyuruyap',
  description: '',
  usage: 'duyuruyap'
};