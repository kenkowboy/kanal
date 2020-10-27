const Discord = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
message.delete(9000)
/*
let kayit = await db.fetch(`kayitkanal_${message.guild.id}`)
if(message.channel.id !== kayit) return message.channel.send(`**Bu komut sadece <#693834090931159080> kanalında kullanılabilir!**`)
*/
if(!message.member.roles.some(r=>["【 Yönetici 】" , "【 Super Mod 】" , "【 Moderator 】" , "【 D.Moderator 】"].includes(r.name)) ) return message.channel.send(' :x: Bu komutu kullanmak için gerekli yetkiye sahip olmalısın!').then(msg => msg.delete(9000));
  
let kayitrol = await db.fetch(`kayitrol_${message.guild.id}`) 
let kullanıcı = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
let nick = args.slice(1).join(" | ");
  
if (!kullanıcı) return message.channel.send(`**Lütfen bir kullanıcı etiketle!**`).then(msg => msg.delete(9000));
let kayitsiz = await db.fetch(`role_${message.guild.id}`)
if (!kayitrol) return message.channel.send(`**Bu rolü bulamıyorum!**`).then(msg => msg.delete(9000));
if (kullanıcı.roles.has(kayitrol.id)) return message.channel.send(':x: Bu kullanıcı zaten bu rolde.').then(msg => msg.delete(9000));
  
await (kullanıcı.addRole(kayitrol))
await (kullanıcı.removeRole(kayitsiz))

message.channel.send(new Discord.RichEmbed()
.setAuthor(`Kayıt İşlemi Tamamlandı!`,'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/600px-User_icon_2.svg.png')
.setColor('7CFC00')
.setThumbnail('https://img.icons8.com/clouds/2x/user.png')
.setDescription(`**Kayıt Yapan Yetkili: <@${message.author.id}>**
**Kayıt için verilen rol: <@&${kayitrol}>**
**\nİsmi Değiştirilen Kullanıcı: \`${kullanıcı.user.username}\`**
**Kullanıcının Yeni İsmi: \`${nick}\`**
`)).then(msg => msg.delete(9000));
message.guild.member(kullanıcı).setNickname(`${nick}`);
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'kayıt',
    description: '',
    usage: ''
};