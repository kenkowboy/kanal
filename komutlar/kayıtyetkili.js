const Discord = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {

  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`**Bu komutu kullanmak için \`Yönetici\` izniniz bulunmuyor!**`)
  
  let kayityetkili = await db.fetch(`kayityetkili_${message.guild.id}`)
  if(!args[0]) {
    return message.channel.send(`**Doğru kullanım : **\`${ayarlar.prefix}kayıtyetkili aç @roller\``)
  }

  if(args[0] == 'kapat'){
      if (db.fetch(`kayityetkili_${message.guild.id}`) === null){
      return message.channel.send(`**Kayıt rolü ayarlı değil!**`)  
    }
      db.delete(`kayityetkili_${message.guild.id}`)
      return message.channel.send(`**Kayıt yetklili bildirimi için belirlenen ${kayityetkili} roller kapatıldı.**\nTekrar açmak için **Doğru kullanım : **\`${ayarlar.prefix}kayıtyetkili aç @roller\``)
    }
      if(args[0] == 'aç'){
      if (db.fetch(`kayityetkili_${message.guild.id}`)){
      return message.channel.send(`**Kayıt yetklili bildirimi için belirlenen ${kayityetkili} roller olarak zaten ayarlanmış.**`)  
    }
      let rol = args.slice(1).join(' ')
      if(!rol){
      return message.channel.send(`**Kayıt yetklili bildirimi için rol & roller etiketlemelisin!\n**Doğru kullanım : **\`${ayarlar.prefix}kayıtyetkili aç @roller\`**`) 
        
    } else db.set(`kayityetkili_${message.guild.id}`, rol)
      return message.channel.send(`**Kayıt için ${rol} yetklili bildirim rolleri ayarlandı.**`)
    }

}
    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
}

exports.help = {
    name: 'kayıtyetkili',
    description: '',
    usage: ''
}