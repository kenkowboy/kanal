const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json');
exports.run = async(client, message, args) => {
   if(message.author.id !== ayarlar.sahip && message.author.id !== ayarlar.sahip3) return message.reply('Bu komut bot sahibine özeldir!')
  if(!args[0]) return message.channel.send(new Discord.RichEmbed().setDescription(`\`❌\` **Doğru kullanım ::** \`${ayarlar.prefix}emoji liste & id & oluştur\``)).then(msg => msg.delete(7000))
  let i = 0;
  
  if(args[0] === 'liste') {
  const emojiList2 = message.guild.emojis.map((emojiadı, emojiid) => (++i +'-] ' + emojiadı) +' => ' +emojiadı.name  + '\n').join(" ");
  message.channel.send(new Discord.RichEmbed().setDescription(emojiList2));

  }
  if(args[0] ==='id') {
  const emojiList = message.guild.emojis.map((emojiadı, emojiid) => (++i +'-] ' + emojiadı ) ).join(`\n`);
  message.channel.send(`${message.guild.name} Adlı Sunucuda "${message.guild.emojis.size}" adet emoji bulunuyor! \n\n${emojiList} \n`, {split: true, code: "php"});
  }
  

  
  if(args[0] ==='oluştur') {
  let emoji_isim = args[1]
  let emoji_url = args[2]
  if(emoji_isim) {
  if (message.attachments.size > 0) emoji_url = message.attachments.first().url
  if(!emoji_url) return message.reply("Emoji dosyasını yükleyin ya da bağlantısını gönderin.\n Yada sadece `"+ayarlar.prefix+"emojio` yazıp bekleyin.")
     message.guild.createEmoji(emoji_url, emoji_isim)
     .then(emoji => {
        return message.channel.send(`\`${emoji.name}\`(${emoji}) adlı emoji başarıyla oluşturuldu`)
     })
     .catch((err) => {
       message.channel.send(new Discord.RichEmbed().setDescription(`Bir hata oluştu. Lütfen;
- Yazdığınız adın içinde Türkçe bir karakter bulunmadığına,
- Sunucuda emoji yüklemek için yer olduğuna,
- Koyduğunuz dosyanın bir resim olduğuna,
- Emojinin 256kb boyutundan küçük olduğuna,
 emin olun ve tekrar deneyin.`))
     })
}
if(!emoji_isim) {
  await message.channel.send(` Emojiye koyulacak adı yazın. \nİşlemi iptal etmek içim \`iptal\` yazın.`)
  let a1 = await message.channel.awaitMessages(x => x.author.id == message.author.id, {max: 1, time: 30000})
  if (!a1.size) return message.channel.send('Herhangi bir cevap vermediğiniz için iptal edildi.')
  let a = a1.first()
  if (a.content == 'iptal') return message.channel.send('İşlem iptal edildi.')
  let isim = a.content

  await message.channel.send(`Emoji dosyasını yükleyin ya da bağlantısını gönderin. \nİşlemi iptal etmek içim \`iptal\` yazın.`)
  let b1 = await message.channel.awaitMessages(x => x.author.id == message.author.id, {max: 1, time: 30000})
  if (!b1.size) return message.channel.send('Herhangi bir cevap vermediğiniz için iptal edildi.')
  let b = b1.first()
  let url
  if (b.content.length > 0) url = b.content
  else if (b.attachments.first()) url = b.attachments.first().proxyURL
  else return message.channel.send("Kafam karıştı. Embed falan mı atıyorsun?")
  
  
  await message.guild.createEmoji(url, isim)
     .then(emoji => {
        return message.channel.send(`\`${emoji.name}\`(<:${emoji.name}:${emoji.id}>) adlı emoji başarıyla oluşturuldu`)
     })
  //console.log(b.attachments)
  }
}
  
  
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['emojiresmi'],
  permLevel: 0
};
exports.help = {
  name: 'emoji',
  description: 'Adı girilen emojinin resmini atar.',
  usage: 'emoji-foto',
  kategori: 'kullanıcı'
};