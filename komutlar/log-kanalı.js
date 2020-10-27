const Discord = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`**Bu komutu kullanmak için \`Yönetici\` izniniz bulunmuyor!**`)
  
  let log = await db.fetch(`logkanal_${message.guild.id}`)
  if(!args[0]) {
    return message.channel.send(`**Doğru kullanım : **\`${ayarlar.prefix}logkanal aç #kanal\`**\nLoglanacak komutlar: \`ban/unban/kick/sustur/uyarı/uyarı-kaldır/rol-koruma\`**`)
  }

  if(args[0] == 'kapat'){
      if (db.fetch(`logkanal_${message.guild.id}`) === null){
      return message.channel.send(`**Log kanalı ayarlı değil!**`)  
    }
      db.delete(`logkanal_${message.guild.id}`)
      return message.channel.send(`**Log için belirlenen <#${log}> kanal kapatıldı.**\nTekrar açmak için **Doğru kullanım : **\`${ayarlar.prefix}logkanal aç #kanal\``)
    }
      if(args[0] == 'aç'){
      if (db.fetch(`logkanal_${message.guild.id}`)){
      return message.channel.send(`**Log için belirlenen <#${log}> kanal olarak zaten ayarlanmış.**\nLoglanacak komutlar: \`ban/unban/kick/sustur/uyarı/uyarı-kaldır/rol-koruma\``)  
    }
      let kanal = message.mentions.channels.first();
      if(!kanal){
      return message.channel.send(`**Log kanalı için kanal etiketlemelisin!\n**Doğru kullanım : **\`${ayarlar.prefix}logkanal aç #kanal\`**`) 
        
    } else db.set(`logkanal_${message.guild.id}`, kanal.id)
      return message.channel.send(`**Log için belirlenen ${kanal} kanal ayarlandı.**\nLoglanacak komutlar: \`ban/unban/kick/sustur/uyarı/uyarı-kaldır/rol-koruma\``)
    }

}
   
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,

}
exports.help = {
    name: 'logkanal',
    description: '',
    usage: '',

}