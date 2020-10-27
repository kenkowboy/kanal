const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json")
exports.run = async (client, message, args) => {
    
  const kisi = db.fetch(`afkid_${message.author.id}`)
  if(kisi) return;
  const sebep = args[0]
  if(!args[0]){

  await db.set(`afkSebep_${message.author.id}`, "Sebep Girilmemiş")
  await db.set(`afkid_${message.author.id}`, message.author.id)
  await db.set(`afkzaman_${message.author.id}`, new Date().getTime())
  
  const a = await db.fetch(`afkSebep_${message.author.id}`)
     message.channel.send(new Discord.RichEmbed()
    .setAuthor(`${client.user.username}`,"https://i.ibb.co/wRjZ59y/5f55d8ff847d79d456ca86a598e1598e.png")
    .setDescription(`**Başarıyla Afk Oldunuz \n Sebep: ${a}**`)
    .setTimestamp()
    .setColor('2f3136').setThumbnail(message.author.avatarURL)
    ).then(msg => msg.delete(7000));
 message.member.setNickname(`[AFK] ${message.member.displayName}`)
  }
  
  if(args[0]){
    let sebep = args.join(" ");
    await db.set(`afkSebep_${message.author.id}`, sebep)
    await db.set(`afkid_${message.author.id}`, message.author.id)
    await db.set(`afkzaman_${message.author.id}`, new Date().getTime())
    const a = await db.fetch(`afkSebep_${message.author.id}`)
     
     message.channel.send(new Discord.RichEmbed()
    .setAuthor(`${client.user.username}`,"https://i.ibb.co/wRjZ59y/5f55d8ff847d79d456ca86a598e1598e.png")
    .setDescription(`**Başarıyla Afk Oldunuz \n Sebep: ${a}**`)
    .setTimestamp()
    .setColor('2f3136').setThumbnail(message.author.avatarURL)
    ).then(msg => msg.delete(7000));
    
  message.member.setNickname(`[AFK] ${message.member.displayName}`)
  }
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["afk"],
  permLevel: 0
};

exports.help = {
  name: 'afk',
  description: 'Afk Olmanızı Sağlar.',
  usage: 'afk / afk <sebep>'
};