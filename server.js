const Discord = require('discord.js');
const client = new Discord.Client();
const chalk = require('chalk');
const ayarlar = require('./ayarlar.json');
const fs = require('fs');
const db = require("quick.db");
const ms = require("ms");
const express = require('express');
require('./util/eventLoader')(client);
const moment = require("moment");
require("moment-duration-format");
const YouTube = require("simple-youtube-api");
var ffmpeg = require('ffmpeg-static');
var ffmpeg = require('ffmpeg');
const ytdl = require("ytdl-core");
var opus = require('node-opus');
const queue = new Map();  
const { GOOGLE_API_KEY } = require('./ayarlar.json');
const youtube = new YouTube(GOOGLE_API_KEY);
let prefix = ayarlar.prefix
const http = require('http');
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000)

const log = message => {
  console.log(`${message}`);
  
};
  ///////////

////////// 
  client.commands = new Discord.Collection();
  client.aliases = new Discord.Collection();
  fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
      let props = require(`./komutlar/${f}`);
      log(`Yüklenen komut: ${props.help.name}.`);
      client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
    });
  });
  
  client.reload = command => {
    return new Promise((resolve, reject) => {
      try {
        delete require.cache[require.resolve(`./komutlar/${command}`)];
        let cmd = require(`./komutlar/${command}`);
        client.commands.delete(command);
        client.aliases.forEach((cmd, alias) => {
          if (cmd === command) client.aliases.delete(alias);
        });
        client.commands.set(command, cmd);
        cmd.conf.aliases.forEach(alias => {
          client.aliases.set(alias, cmd.help.name);
        });
        resolve();
      } catch (e){
        reject(e);
      }
    });
  };
  
  client.load = command => {
    return new Promise((resolve, reject) => {
      try {
        let cmd = require(`./komutlar/${command}`);
        client.commands.set(command, cmd);
        cmd.conf.aliases.forEach(alias => {
          client.aliases.set(alias, cmd.help.name);
        });
        resolve();
      } catch (e){
        reject(e);
      }
    });
  };
  
  client.unload = command => {
    return new Promise((resolve, reject) => {
      try {
        delete require.cache[require.resolve(`./komutlar/${command}`)];
        let cmd = require(`./komutlar/${command}`);
        client.commands.delete(command);
        client.aliases.forEach((cmd, alias) => {
          if (cmd === command) client.aliases.delete(alias);
        });
        resolve();
      } catch (e){
        reject(e);
      }
    });
  };
///////////////////////////////////////////////////////////////

client.on("message", async message => {
  const dmchannel = client.channels.find(dm => dm.name === "dm-log");
  if (message.channel.type === "dm") {
      if (message.author.bot) return;
      dmchannel.sendMessage("", {embed: {
          color: 3447003,
          title: `Gönderen: ${message.author.tag}`,
          description: `Bota Özelden Gönderilen DM: ${message.content}`
      }})
  }
  if(message.content === '!kayıt' || message.content === '!Kayıt'){message.delete()
    let kayit = await db.fetch(`kayitkanal_${message.guild.id}`)
    let kayityetkili = await db.fetch(`kayityetkili_${message.guild.id}`)
    message.channel.send(new Discord.RichEmbed().setDescription(`**Müsait olan yetkililerimiz birazdan sese gelecektir. Sizde sesli kanala girerek teyit işleminizi tamamlatabilirsiniz.**`).setColor('RANDOM')).then(msg => msg.delete(10000));
    message.guild.channels.get(kayit).send(`**${kayityetkili}**`).then(msg => msg.delete());
  }
});

let ehengel = JSON.parse(
  fs.readFileSync("./ayarlar/everhereengel.json", "utf8")
);
client.on("message", async function(msg) {
  if (!msg.guild) {
  } else {
    if (!ehengel[msg.guild.id]) {
    } else {
      if (ehengel[msg.guild.id].sistem == false) {
      } else if (ehengel[msg.guild.id].sistem == true) {
        if (msg.author.id == msg.guild.ownerID) {
        } else {
          if (msg.content.includes("@everyone")) {
            msg.delete();
            msg
              .reply("maalesef `everyone` atmana izin veremem!")
              .then(msj => msj.delete(3200));
          } else {
          }
          if (msg.content.includes("@here")) {
            msg.delete();
            msg
              .reply("maalesef `here` atmana izin veremem!")
              .then(msj => msj.delete(3200));
          } else {
          }
        }
      }
    }
  }
});
////////////////////////////////////////////////////////ROL KORUMA BAŞLANGIÇ
client.on("roleCreate", async (rolee, member, guild) => {
  let log = await db.fetch(`logkanal_${rolee.guild.id}`)
   const entry = await rolee.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first())
    if (entry.executor.bot) return;
      if (entry.executor.id === rolee.guild.owner.user.id) return;
        let rolkoruma = await db.fetch(`rolk_${rolee.guild.id}`);
          if (rolkoruma == "acik") {
            if (rolee.guild.member(entry.executor).hasPermission('ADMINISTRATOR')) return;
              rolee.delete();
                const embed = new Discord.RichEmbed()
                .setDescription(`<@${entry.executor.id}>, **${rolee.guild.name}** adlı sunucunuzda **\`${rolee.name}\`** adlı rolü oluşturdu! \n\n**Fakat rol geri silindi! \`(\`Rol Koruma Sistemi\`)\`**`)
                .setColor("BLACK");
                rolee.guild.channels.get(log).send(embed);
              return;
        } else {
    return;
  }
});
/////////////////////////////////////////////////////////////////////////////// ROL KORUMA BİTİŞ
/////////////////////////////////////////////////////////////////////////////
client.on('message', async message => {
  
  if (!message.guild) return;
  let afk_kullanici = message.mentions.users.first() || message.author;
  
  if (message.content.startsWith(prefix + "afk")) return;
  if (message.author.bot) return;
  if (message.content.includes(`<@${afk_kullanici.id}>`) || message.content.includes(`<@!${afk_kullanici.id}>`))
    
      if (db.has(`afkid_${afk_kullanici.id}`)){
      let süre = await db.fetch(`afkzaman_${afk_kullanici.id}`);
      let sebep = await db.fetch(`afkSebep_${afk_kullanici.id}`)
      let timeObj = ms(new Date().getTime() - süre);
      let zaman = moment.duration(new Date().getTime() - süre).format("H [saat] m [dakika] s [saniye]");
      message.delete();
      message.channel.send(new Discord.RichEmbed().setTitle(`${client.user.username} Bot - Afk Sistemi`).setDescription(`
      **${client.users.get(afk_kullanici.id).username}** adlı kullanıcı şuanda AFK!\n**AFK sebebi :** \`${sebep}\` \n**AFK süresi :** \`${zaman}\`\n**Etiketleyen Kişi :** <@${message.author.id}> 
      `).setTimestamp().setColor('2f3136').setThumbnail(message.author.avatarURL));
     }
       
  if (db.has(`afkid_${message.author.id}`)) {
    message.channel.send(new Discord.RichEmbed().setDescription(`**<@${message.author.id}> >> Başarıyla AFK modundan çıktın! Tekrar Hoşgeldin :)**`).setColor('2f3136')).then(msg => msg.delete(5000));
    db.delete(`afkid_${message.author.id}`);
    db.delete(`afkzaman_${message.author.id}`);
    db.delete(`afkSebep_${message.author.id}`);
    afk_kullanici = message.guild.member(afk_kullanici);
    afk_kullanici.setNickname(afk_kullanici.displayName.replace("[AFK]", ""))

  }
});
/////////////////////////////////////////////////////////////////////////////
client.on('guildMemberAdd', async member => {
  let rol = await db.fetch(`role_${member.guild.id}`)
   await member.addRole(rol);
  });



client.on("message", async message => {
  if (!message.guild) return;
  
  client.queue = new Map()
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || ayarlar.prefix;

  var args = message.content.substring(prefix.length).split(" ");
  if (!message.content.startsWith(prefix)) return;
  var searchString = args.slice(1).join(" ");
  var url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";
  var serverQueue = queue.get(message.guild.id);

  switch (args[0].toLowerCase()) {
    case "çal":
      var voiceChannel = message.member.voiceChannel;

      const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(
          " Dinlemek istediğin şarkıyı yazmalısın! (Şarkı ismi veya Youtube URLsi)"
        );
      if (!url) return message.channel.send(embed);

      const voiceChannelAdd = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Lütfen herhangi bir sesli kanala katılınız.`);
      if (!voiceChannel) return message.channel.send(voiceChannelAdd);
      var permissions = voiceChannel.permissionsFor(message.client.user);
      if (!permissions.has("CONNECT")) {
        const warningErr = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setDescription(
            `  Herhangi bir sesli kanala katılabilmek için yeterli iznim yok.`
          );
        return message.channel.send(warningErr);
      }
      if (!permissions.has("SPEAK")) {
        const musicErr = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setDescription(
            `  Müzik açamıyorum/şarkı çalamıyorum çünkü kanalda konuşma iznim yok veya mikrofonum kapalı.`
          );
        return message.channel.send(musicErr);
      }
      try {
        if(playlist = await youtube.getPlaylist(url)){
         if (url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/)) { 
            var playlist = await youtube.getPlaylist(url);
            var videos = await playlist.getVideos()
           
            for (const video of Object.values(videos)) {
              var video2 = await youtube.getVideoByID(video.id);
              await handleVideo(video2, message, voiceChannel, true);
    
            }
             const PlayingListAdd = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setDescription(`\`${playlist.title}\` Şarkı Kuyruğa eklendi!`);
            return message.channel.send(PlayingListAdd);
           }
    
        }
    
    } catch(err){
    
          if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) { 
         
            var playlist = await youtube.getPlaylist(url);
            var videos = await playlist.getVideos();
            for (const video of Object.values(videos)) {
              var video2 = await youtube.getVideoByID(video.id);
              await handleVideo(video2, message, voiceChannel, true);
            }
            const PlayingListAdd = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setDescription(`\`${serverQueue.songs.length}.\` Şarkı Kuyruğa eklendi!`);
            return message.channel.send(PlayingListAdd); 
            }
            try {
              var video = await youtube.getVideo(url);
            } catch (error) {
              try {
                var videos = await youtube.searchVideos(searchString, 1);
    
                var r = 1;
    
                var video = await youtube.getVideoByID(videos[r - 1].id);
              } catch (err) {
                //console.log('Api key değişmesi gereklidir!')
                //console.error(err);
                
                const songNope = new Discord.RichEmbed()
                  .setColor("#b22222")
                  .setDescription(` Aradığınız isimde bir şarkı bulamadım. Daha sonra tekrar deneyiniz!`);
                return message.channel.send(songNope).then(msg=>msg.delete(7000));
              }
            }
            return handleVideo(video, message, voiceChannel);
          }
      break;
    case "tekrar":
      const e = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(
          `  Bir sesli kanalda değilsin.`
        );
      if (!message.member.voiceChannel) return message.channel.send(e);
      const p = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(
          `  Şuanda herhangi bir şarkı çalmıyor.`
        );
      if (!serverQueue) return message.channel.send(p);

      var u = serverQueue.songs[0];

      /*var pla = await youtube.getPlaylist(u);
      var v = await pla.getVideos();*/
      var vi2 = await youtube.getVideoByID(u.id);
      await handleVideo(vi2, message, voiceChannel, true);
      const PlayingListAdd = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(
          `[${u.title}](https://www.youtube.com/watch?v=${u.id}) İsimli şarkı bitince tekrar oynatılacak.`
        );
      return message.channel.send(PlayingListAdd);

      break;
    case "geç":
      const err0 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(
          `  Bir sesli kanalda değilsin.`
        );
      if (!message.member.voiceChannel) return message.channel.send(err0);
      const err05 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(
          `  Şuanda herhangi bir şarkı çalmıyor.`
        );
      if (!serverQueue) return message.channel.send(err05);
      const songSkip = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(`  Şarkı başarıyla geçildi!`);
      serverQueue.connection.dispatcher.end("");
      message.channel.send(songSkip);
      return undefined;
      break;

    case "dur":
      const err1 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(
          `  Bir sesli kanalda değilsin.`
        );
      if (!message.member.voiceChannel) return message.channel.send(err1);
      const err2 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(
          `  Şuanda herhangi bir şarkı çalmıyor.`
        );
      if (!serverQueue) return message.channel.send(err2);
      serverQueue.songs = [];
      const songEnd = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(
          `  Şarkı başarıyla durduruldu ve odadan ayrıldım!`
        );
      serverQueue.connection.dispatcher.end("");

      message.channel.send(songEnd);

      return undefined;

      break;

    case "ses":
      const asd1 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(
          `  Bir sesli kanalda değilsin.`
        );
      if (!message.member.voiceChannel) return message.channel.send(asd1);
      const asd2 = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Şuanda herhangi bir şarkı çalmıyor.`);
      if (!serverQueue) return message.channel.send(asd2);

      if (!args[1])
        return message.reply(
          "  Ses seviyesi ayarlamak için bir sayı yaz!"
        );
      serverQueue.volume = args[1];
      if (args[1] > 10)
        return message.channel.send(
          `  Ses seviyesi en fazla \`10\` olarak ayarlanabilir.`
        );
      serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
      const volumeLevelEdit = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(`Ayarlanan Ses Seviyesi: **${args[1]}**`);
      return message.channel.send(volumeLevelEdit);
      break;
    case "kuyruk":
      var siralama = 0;
      const a = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(
          `  Bir sesli kanalda değilsin.`
        );
      if (!message.member.voiceChannel) return message.channel.send(a);
      const b = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(
          `  Şuanda herhangi bir şarkı çalmıyor.`
        );
      if (!serverQueue) return message.channel.send(b);

      var k = serverQueue.songs.map(song =>`${++siralama} - [${song.title}](https://www.youtube.com/watch?v=${song.id})`).join("\n").replace(serverQueue.songs[0].title,`**${serverQueue.songs[0].title}**`);

      const kuyruk = new Discord.RichEmbed()
        .setColor("RANDOM")
        .addField("Şarkı Kuyruğu", k);
      return message.channel.send(kuyruk);
      break;
    case "duraklat":
      if (serverQueue && serverQueue.playing) {
        serverQueue.playing = false;
        serverQueue.connection.dispatcher.pause();
        const asjdhsaasjdha = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setDescription(
            `  Şarkı başarıyla duraklatıldı!`
          );
        return message.channel.send(asjdhsaasjdha);
      }
      return message.channel.send(
        "  Şuanda herhangi bir şarkı çalmıyor."
      );
      break;
    case "devam":
      if (serverQueue && !serverQueue.playing) {
        serverQueue.playing = true;
        serverQueue.connection.dispatcher.resume();
        const asjdhsaasjdhaadssad = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setDescription(`Şarkı başarıyla devam ettiriliyor...`);
        return message.channel.send(asjdhsaasjdhaadssad);
      }
      return message.channel.send(
        "  Şuanda herhangi bir şarkı çalmıyor."
      );

      return undefined;
      break;
  }
  async function handleVideo(video, message, voiceChannel, playlist = false) {
    var serverQueue = queue.get(message.guild.id);
    //console.log(video);
    var song = {
      id: video.id,
      title: video.title,
      durationh: video.duration.hours,
      durationm: video.duration.minutes,
      durations: video.duration.seconds,
      url: `https://www.youtube.com/watch?v=${video.id}`,
      thumbnail: `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`,
      requester: message.author.id
    };
    if (!serverQueue) {
      var queueConstruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 3,
        playing: true
      };
      queue.set(message.guild.id, queueConstruct);

      queueConstruct.songs.push(song);

           try {
        var connection = await voiceChannel.join();
        queueConstruct.connection = connection;
        play(message.guild, queueConstruct.songs[0]);
      } catch (error) {
        console.error(`Ses kanalına giremedim HATA: ${error}`);
        queue.delete(message.guild.id);
        return message.channel.send(new Discord.RichEmbed().setDescription(`HATA: \`\`\`${error}\`\`\``)).then(msg=>msg.delete(7000));
      }
    } else {
      serverQueue.songs.push(song);
      //console.log(serverQueue.songs);
      if (playlist) return undefined;

      const songListBed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(
          `[${song.title}](https://www.youtube.com/watch?v=${song.id}) isimli şarkı kuyruğa eklendi!`
        );
      return message.channel.send(songListBed);
    }
    return undefined;
  }
async  function play(guild, song) {
   var serverQueue = queue.get(guild.id);

    if (!song) {
      queue.delete(guild.id);
      serverQueue.voiceChannel.leave();
      voiceChannel.leave(); 
      serverQueue.songs = [];
      return message.channel.send(new Discord.RichEmbed().setDescription(`**Sıraya şarkı eklemediğiniz için odadan ayrıldım.**\n\nYeniden şarkı dinlemek için \`${prefix}çal şarkı adı & video URL & playlist URL\``).setColor("#b22222"))
    
    }
    //console.log(serverQueue.songs);

const dispatcher = await serverQueue.connection.playStream(ytdl(song.url , { filter: "audioonly" })).on("end", reason => {
       if (reason === "İnternetten kaynaklı bir sorun yüzünden şarkılar kapatıldı.");
          //else console.log(reason);
          serverQueue.songs.shift();
          play(guild, serverQueue.songs[0]);
      });
    client.on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

    const playingBed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setAuthor(
        `Şuanda Oynatılıyor`,
        "https://davidjhinson.files.wordpress.com/2015/05/youtube-icon.png"
      )
      .setDescription(`[${song.title}](${song.url})`)
      .addField("Şarkı Süresi", `${song.durationm}:${song.durations}`, true)
      .addField("Şarkıyı Açan Kullanıcı", `<@${song.requester}>`, true)
      .setThumbnail(song.thumbnail);
    serverQueue.textChannel.send(playingBed);
  }
});


/////////////////////////////////////////////////////////////


client.on('guildCreate', guild => {
	const rrrsembed = new Discord.RichEmbed()
    .setColor("GREEN")
    .setThumbnail(guild.iconURL || guild.defaultİconURL)
    .setTitle(`${client.user.username} Bot Eklendi - Hadi Yine İyiyiz ❤`)
    .addField("Atılan Sunucu", guild.name)
    .addField("Sunucu sahibi", guild.owner)
    .addField("Sunucu ID'si", guild.id)
    .addField("Sunucunun Kurulu Olduğu Bölge:", guild.region)
    .addField("Sunucudaki Kişi Sayısı:", guild.memberCount)
    .setTimestamp();

  client.channels.get("691925540017274881").send(rrrsembed);
})


client.on('guildDelete', guild => {
	const rrrsembed = new Discord.RichEmbed()
    .setColor("RED")
    .setThumbnail(guild.iconURL || guild.defaultİconURL)
    .setTitle(`${client.user.username} Bot Kickledi - Canımız Sağolsun 💔`)
    .addField("Atılan Sunucu", guild.name)
    .addField("Sunucu sahibi", guild.owner)
    .addField("Sunucu ID'si", guild.id)
    .addField("Sunucunun Kurulu Olduğu Bölge:", guild.region)
    .addField("Sunucudaki Kişi Sayısı:", guild.memberCount)
    .setTimestamp();

  client.channels.get("691925540017274881").send(rrrsembed);
})

///////////////////////////////////////////////////////////////
  client.elevation = message => {
    if(!message.guild) {
    return; }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
  };
  
  var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
  
  client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
  });
  
  client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
  });
  

client.login(ayarlar.token)