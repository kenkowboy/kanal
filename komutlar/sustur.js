const Discord = require("discord.js");
const ms = require("ms");
const db = require('quick.db');
const djsturkiye = require('../ayarlar.json');

exports.run = async (client, message, args) => {
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || djsturkiye.prefix;
  let üye = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!üye) return message.channel.send(`Kime işlem yapılacağını belirtmelisin! \n**Doğru Kullanım:** \`${prefix}sustur @Kullanıcı <isterseniz süre>\``);
  let log = await db.fetch(`logkanal_${message.guild.id}`)
  if (!log) return message.channel.send(new Discord.RichEmbed().setDescription(`:x: Log Kanalı Ayarlanmamış !`).setColor('RED')).then(msg => msg.delete(9000));
  let rol = message.guild.roles.find(abc => abc.name === "Susturulmuş");
  if(!rol) {
    if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS")) return message.channel.send(`\`Hata:\`  Botun yetkisi yetersiz!  **(Botun,  \`Kanalları Yönet\` ve \`Rolleri Yönet\`  yetkisi açık olmalıdır!)** `);
    try {
      rol = await message.guild.createRole({
        name: "Susturulmuş",
        color: "#818386",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(rol, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          SPEAK: false
        });
      });
    } catch(e) { console.log(e) };
  };

  let süre = args.slice(1).join(' ').replace('gün'.toLowerCase(), 'd').replace('saat'.toLowerCase(), 'h').replace('dakika'.toLowerCase(), 'm').replace('saniye'.toLowerCase(), 's');

  if(üye.roles.has(rol.id)) {
    await(üye.removeRole(rol.id));
    client.channels.get(log).send(`**\`${üye.displayName}\`  adlı üyenin susturulması kaldırıldı!**`)
    return
  }
  
  if(!süre) {
    await(üye.addRole(rol.id));
    client.channels.get(log).send(`**\`${üye.displayName}\`  adlı üye susturuldu! Tekrar aynı işlemi uygulayarak susturulmayı kaldırabilirsiniz.**`)
  } else {
    await(üye.addRole(rol.id));
    client.channels.get(log).send(`**\`${üye.displayName}\`  adlı üye  \`${ms(ms(süre))}\`  süre boyunca susturuldu.**`);
    setTimeout(function(){
      üye.removeRole(rol.id);
      client.channels.get(log).send(`**\`${üye.displayName}\`  adlı üyenin susturulma süresi dolduğu için susturulması kaldırıldı!**`);
    }, ms(süre));
  };
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'sustur',
  description: '',
  usage: '',
  kategori: ''
};