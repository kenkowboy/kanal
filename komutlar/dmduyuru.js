const Discord = require('discord.js');

exports.run = (client, message, args) => {
  if (message.author.id != "274697483928731659","309718254522466305") return message.channel.send("Bunun için iznin yok");

  let mesaj = args.slice(0).join(' ');
if (mesaj.length < 1) return message.channel.send('Birşey Yazmalısınız');

  message.delete();

  console.log(`Duyuru: "${message.author.username}#${message.author.discriminator}" "${mesaj}"`);

      const mesajat = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription(mesaj)

      client.users.forEach(u => {
        u.send(mesajat)
})

message.channel.send(`✅ Mesaj basariyla **` + client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString() + `** kullanıcıya gonderildi.`);

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['duyurbot'],
  permLevel: 0
};

exports.help = {
  name: 'ozelduyuru',
  description: 'İstediğiniz şeyi bota duyurtur.',
  usage: 'ozelduyuru'
};
