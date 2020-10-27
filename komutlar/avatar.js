const Discord = require('discord.js');

exports.run = (client, message, args) => {
   

let mention = message.mentions.users.first();
let sender = "";

if (message.channel.guild.member(message.author).nickname == null) {
  sender = message.author.username;
} else {
  sender = message.channel.guild.member(message.author).nickname;
}

if (mention != null || mention != undefined) {
  var name = mention.username + "'s ";
  if (mention.username.endsWith("s")) {
    name = mention.username + "' ";
  }
  const avatarEmbedOther = new Discord.RichEmbed()

  .setTitle(`${client.user.username} BoT - Avatar Kontrol \n\n| __${mention.username}__ | \n\nAdlı Kullanıcının Avatarı Karşınızda !` , mention.avatarURL)
  .setColor('RANDOM')
  .setImage(mention.avatarURL)
  .setFooter(`${message.author.username} tarafından istendi.`, message.author.avatarURL)
  //.setDescription(`[Avatarın büyük halini göster!](${message.author.avatarURL})`);
  message.channel.sendEmbed(avatarEmbedOther);
  return;
} else {
  const avatarEmbedYou = new Discord.RichEmbed()

  .setTitle(`${client.user.username} BoT - Avatar Kontrol \n\nİşte Avatarınız Karşınızda !`)
  .setColor('RANDOM')
  .setImage(message.author.avatarURL)
  .setFooter(`${message.author.username} tarafından istendi.`, message.author.avatarURL)
  //.setDescription(`[Avatarın büyük halini göster!](${message.author.avatarURL})`);
  message.channel.sendEmbed(avatarEmbedYou);
  return;
}
message.channel.sendMessage("Bir Hata Oldu Galiba ? Lütfen Daha Sonra Tekrar Deneyiniz !");
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'avatar',
  description: 'Avatar Kontrol',
  usage: '..avatar'
};