const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");
let talkedRecently = new Set();
module.exports = async message => {
  if (message.author.bot) return
  let client = message.client;
  if (!message.content.startsWith(ayarlar.prefix)) return;
  let command = message.content.split(' ')[0].slice(ayarlar.prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  } 
  
    if (talkedRecently.has(message.author.id)) {
  talkedRecently.add(message.author.id);
	setTimeout(() => {
     
    talkedRecently.delete(message.author.id);
  }, 2000);
   
  }


  
  if (cmd) {
        
   
    
    if (perms < cmd.conf.permLevel) return;
    cmd.run (client, message, params, perms);
        


  }

};