const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = (client, message, params) => {
  if (!params[0]) {
    const commandNames = Array.from(client.commands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
	message.channel.send({embed: {
            color: 0xD97634,
            author: {
              name: message.guild.name,
              icon_url: "https://i.ibb.co/wRjZ59y/5f55d8ff847d79d456ca86a598e1598e.png"
            },
			    "thumbnail": {
				 "url": "https://i.ibb.co/wRjZ59y/5f55d8ff847d79d456ca86a598e1598e.png"
			},
            title: `${client.user.username} Nedir ?`,
            description: `${client.user.username} Kolay işlevli bir bottur. \n\n**Prefix [Ön-ek] :** \`${ayarlar.prefix}\``,
            fields: [
				{
                name: "Mod komutları",
				inline: true,
                value: `➤**temizle**\n➤**ban**\n➤**ban-detay**\n➤**unban**\n➤**duyuruyap**\n➤**uyarı**\n➤**uyarı-kaldır**\n➤**uyarılar**\n➤**kick**\n➤**sustur**\n➤**kayıtkanal**\n➤**kayıtrol**\n➤**kayıtyetkili**\n➤**kayıt**\n➤**otorol**\n➤**logkanal**\n➤**rolal**\n➤**rolver**\n➤**eh-engel**\n➤**rol-koruma**`,
        },
			
			  {
                name: "Genel Komutlar",
				inline: true,
                value: `➤**kullanıcıbilgim**\n➤**sunucubilgi**\n➤**avatar**\n➤**ping**\n➤**afk**\n➤**yardım-müzik**\n➤**radyo**\n➤**üyedurum**`
                
              },
                            {
                name: "Eğlence komutları",
				inline: true,
                value: `➤**banned**`
                
              },
              {
                name: "Güncel Sürüm",
                value: "v2.0"
              }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: "https://i.ibb.co/wRjZ59y/5f55d8ff847d79d456ca86a598e1598e.png",
              text:  `© ${client.user.username} 2020 `
            }
          }
        });  
	    message.react("👍")
}};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['h', 'halp', 'help', 'y'],
  permLevel: 0
};

exports.help = {
  name: 'yardım',
  description: 'Tüm komutları gösterir.',
  usage: 'yardim [komut]'
};
