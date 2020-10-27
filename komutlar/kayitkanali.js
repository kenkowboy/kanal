const Discord = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`**Bu komutu kullanmak için \`Yönetici\` izniniz bulunmuyor!**`)
  
  let kayit = await db.fetch(`kayitkanal_${message.guild.id}`)
  if(!args[0]) {
    return message.channel.send(`**Doğru kullanım : **\`${ayarlar.prefix}kayıtkanal aç #kanal\``)
  }

  if(args[0] == 'kapat'){
      if (db.fetch(`kayitkanal_${message.guild.id}`) === null){
      return message.channel.send(`**Kayıt kanalı ayarlı değil!**`)  
    }
      db.delete(`kayitkanal_${message.guild.id}`)
      return message.channel.send(`**Kayıt için belirlenen <#${kayit}> kanal kapatıldı.**\nTekrar açmak için **Doğru kullanım : **\`${ayarlar.prefix}kayıtkanal aç #kanal\``)
    }
      if(args[0] == 'aç'){
      if (db.fetch(`kayitkanal_${message.guild.id}`)){
      return message.channel.send(`**Kayıt için belirlenen <#${kayit}> kanal olarak zaten ayarlanmış.**`)  
    }
      let kanal = message.mentions.channels.first();
      if(!kanal){
      return message.channel.send(`**Kayıt kanalı için kanal etiketlemelisin!\n**Doğru kullanım : **\`${ayarlar.prefix}kayıtkanal aç #kanal\`**`) 
        
    } else db.set(`kayitkanal_${message.guild.id}`, kanal.id)
      return message.channel.send(`**Kayıt için belirlenen ${kanal} kanal ayarlandı.**`)
    }

}
   
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,

}
exports.help = {
    name: 'kayıtkanal',
    description: '',
    usage: '',

}