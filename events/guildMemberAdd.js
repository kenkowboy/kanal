const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

module.exports = member => {
    let username = member.user.id;
    member.send(`**<@${username}> | ${member.guild.name} Discord Sunucumuza Hoşgeldiniz..**

>> Sunucumuzda Kayıt Olmalısınız. Kayıt Olmak İçin \`!kayıt\` yazınız. 
>> Ses teyidi vermeniz **zorunludur.**
>> Teyit kanallarına giriş yaparak yetkililerimizi bekleyiniz.
>> Sunucumuzun yararlanmak için kaydınızı tamamlayınız.

Saygılarımızla **GameTürk Ailesi** <a:tik:696413395431456841> `);
};
