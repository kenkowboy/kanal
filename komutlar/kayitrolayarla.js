const Discord = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {

  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`**Bu komutu kullanmak için \`Yönetici\` izniniz bulunmuyor!**`)
  
  let kayitrol = await db.fetch(`kayitrol_${message.guild.id}`)
  if(!args[0]) {
    return message.channel.send(`**Doğru kullanım : **\`${ayarlar.prefix}kayıtrol aç @rol\``)
  }

  if(args[0] == 'kapat'){
      if (db.fetch(`kayitrol_${message.guild.id}`) === null){
      return message.channel.send(`**Kayıt rolü ayarlı değil!**`)  
    }
      db.delete(`kayitrol_${message.guild.id}`)
      return message.channel.send(`**Kayıt için belirlenen <@&${kayitrol}> rolü kapatıldı.**\nTekrar açmak için **Doğru kullanım : **\`${ayarlar.prefix}kayıtrol aç @rol\``)
    }
      if(args[0] == 'aç'){
      if (db.fetch(`kayitrol_${message.guild.id}`)){
      return message.channel.send(`**Kayıt için belirlenen <@&${kayitrol}> rolü olarak zaten ayarlanmış.**`)  
    }
      let rol = message.mentions.roles.first();
      if(!rol){
      return message.channel.send(`**Kayıt rolü için rol etiketlemelisin!\n**Doğru kullanım : **\`${ayarlar.prefix}kayıtrol aç @rol\`**`) 
        
    } else db.set(`kayitrol_${message.guild.id}`, rol.id)
      return message.channel.send(`**Kayıt için belirlenen ${rol} rolü ayarlandı.**\nKapatmak için **Doğru kullanım : **\`${ayarlar.prefix}kayıtrol kapat @rol\``)
    }

}
    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
}

exports.help = {
    name: 'kayıtrol',
    description: '',
    usage: ''
}