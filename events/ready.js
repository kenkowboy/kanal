const chalk = require('chalk');
const moment = require('moment');
const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

module.exports = client => {
console.log('>> Oynuyor kısmı başarıyla güncellendi. <<');
console.log('>> Bot Hazır Giriş Yapıldı! <<');
console.log(`>> ${client.user.username} => ${client.guilds.size} Adet Sunucu  İçin Teşekürler..`)
  client.user.setStatus("dnd");
  client.user.setActivity(`GameTürk'ü`, { type: 'WATCHING'})
  //////let channel = client.channels.get('693793911789060146');
  ////////if(!channel) return
  /////////channel.join();
      };


 
 //////// "WATCHING" });  // Izliyor
////////  "LISTENING" }); // Dinliyor
//////// "PLAYING" }); // Oynuyor