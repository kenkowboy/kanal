const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');
exports.run = async (client, message, args) => {
  
if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`**Bu komutu kullanmak için \`Yönetici\` izniniz bulunmuyor!**`)
  
let role = await db.fetch(`role_${message.guild.id}`)
  if(!args[0]) {
    return message.channel.send(`**Doğru kullanım : **\`${ayarlar.prefix}otorol aç @rol\``)
  }

  if(args[0] == 'kapat'){
      if (db.fetch(`role_${message.guild.id}`) === null){
      return message.channel.send(`**Kayıt rolü ayarlı değil!**`)  
    }
      db.delete(`role_${message.guild.id}`)
      return message.channel.send(`**Kayıt için belirlenen <@&${role}> rolü kapatıldı.**\nTekrar açmak için **Doğru kullanım : **\`${ayarlar.prefix}otorol aç @rol\``)
    }
      if(args[0] == 'aç'){
      if (db.fetch(`role_${message.guild.id}`)){
      return message.channel.send(`**Kayıt için belirlenen <@&${role}> rolü olarak zaten ayarlanmış.**`)  
    }
      let rol = message.mentions.roles.first();
      if(!rol){
      return message.channel.send(`**Kayıt rolü için rol etiketlemelisin!\n**Doğru kullanım : **\`${ayarlar.prefix}otorol aç @rol\`**`) 
        
    } else db.set(`role_${message.guild.id}`, rol.id)
      return message.channel.send(`**Kayıt için belirlenen ${rol} rolü ayarlandı.**\nKapatmak için **Doğru kullanım : **\`${ayarlar.prefix}otorol kapat @rol\``)
    }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'otorol',
  description: 'İstediğiniz rolü sunucuya girenlere otomatikmen verir.',
  usage: 'otorol <rol>'
};