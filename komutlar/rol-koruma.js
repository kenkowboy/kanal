const db = require("quick.db");
const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json');
exports.run = async (client, message, args) => {
  
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`**Bu komutu kullanmak için \`Yönetici\` izniniz bulunmuyor!**`)
  let log = await db.fetch(`logkanal_${message.guild.id}`)
  
  if(!args[0]) {
    return message.channel.send(`**Doğru kullanım : **\`${ayarlar.prefix}rol-koruma aç && kapat\`**\nLoglanacak komutlar: \`ban/unban/kick/sustur/uyarı/uyarı-kaldır/rol-koruma\`**`)
  }

  if(args[0] == 'kapat'){
      if (db.fetch(`rolk_${message.guild.id}`) === null){
      return message.channel.send(`**Görünüşe göre rol koruma zaten kapalı!**`)  
    }
      db.delete(`rolk_${message.guild.id}`)
      return message.channel.send(`**Rol Koruma başarıyla kapandı!**\nTekrar açmak için **Doğru kullanım : **\`${ayarlar.prefix}rol-koruma aç\``)
    }
      if(args[0] == 'aç'){
      if (db.fetch(`rolk_${message.guild.id}`)){
      return message.channel.send(`**Rol koruma zaten ayarlanmış.**\nLoglanacak kanal: ${db.has(`logkanal_${message.guild.id}`) ? ` **${message.guild.channels.get(log)}** **\n**\`Rol korumayı kapatmak için :: ${ayarlar.prefix}rol-koruma kapat\`` : `Ayarlanmamış \n **\`Ayarlamak için :: ${ayarlar.prefix}logkanal aç #kanal\`** `}`)  
     } else
      db.set(`rolk_${message.guild.id}`, 'acik')
      return message.channel.send(`**Rol koruma başarıyla açıldı!**\nLoglanacak kanal: ${db.has(`logkanal_${message.guild.id}`) ? ` **${message.guild.channels.get(log)}** **\n**\`Rol korumayı kapatmak için :: ${ayarlar.prefix}rol-koruma kapat\`` : `Ayarlanmamış \n **\`Ayarlamak için :: ${ayarlar.prefix}logkanal aç #kanal\`** `}`)
    }
  
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "rol-koruma",
  description: "Rol koruma",
  usage: "rol-koruma"
};