const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
exports.run = async (client, message, params, perms) => { 

const embed = new Discord.RichEmbed()
.setTitle(`${client.user.username} - Müzik Komutları `)
.setTimestamp()
.setColor('RANDOM')
.setThumbnail(client.user.avatarURL)
.setFooter(message.author.username , message.author.avatarURL)
.setDescription(`
**\n:headphones: Müzik Çalınan Sunucu Sayısı ::** \`${client.voiceConnections.size}\`

**\n** **\`${ayarlar.prefix}çal\`** 🔹 URL - şarkı adı 
 **\`${ayarlar.prefix}tekrar\`** 🔹 Çalan şarkıyı tekrar çalar.
 **\`${ayarlar.prefix}geç\`** 🔹 Kuyruktaki sonraki şarkıya geçer.
 **\`${ayarlar.prefix}dur\`** 🔹 Çalan müziği durdurur. 
 **\`${ayarlar.prefix}ses\`** 🔹 Çalan müziğin ses seviyesini ayarlarsınız. (1-10)
 **\`${ayarlar.prefix}kuyruk\`** 🔹 Müziklerin sırasını gösterir.
 **\`${ayarlar.prefix}duraklat\`** 🔹 Çalan müziği duraklatır. 
 **\`${ayarlar.prefix}devam\`** 🔹 Duraklayan müziği devam ettirsiniz. 
 `)

  return message.channel.send(embed);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'yardım-müzik',
  description: 'a',
  usage: 'a'
};
