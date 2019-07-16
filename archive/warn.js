const Discord = require("discord.js");
const fs = require("fs");
const ms = require('ms');
const botconfig = require("../botconfig.json");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission('KICK_MEMBERS')) return message.reply("NOPE");
  let wMember = message.guild.member(message.mentions.users.first()) || message.guild.members(args[0]);
  if(!wMember) return message.reply("cant find them");
  if(wMember.hasPermission("KICK_MEMBERS")) return message.reply("he seems cool");
  let reason = args.join(" ").slice(22);

  if(!warns[wMember.id]) warns[wMember.id] = {
    warns: 0
  };

  warns[wMember.id].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });

  let warnEmbed = new Discord.RichEmbed()
  .setDescription("---===Warns===---")
  .setAuthor(message.author.username)
  .setColor(botconfig.kick)
  .addField("Warned user", `<@${wMember.id}>`)
  .addField('warned in', message.channel)
  .addField('warnings', warns[wMember.id].warns)
  .addField("reason", reason);

  let warnchannel = message.guild.channel.find(`name`, 'incidents');
  if(!warnchannel) return message.reply('no channel to send log');

  warnchannel.send(warnEmbed);

  if(warns[wMember.id].warns >= 2){
    let muterole = message.guild.roles.find(`name`, 'muted');
    if(!muterole) return message.reply("try aggain when have mutee role?");

    let muteTime = '10m';
    await(wMember.addRole(muterole.id));
    message.reply(`${wMember} is beeing bad and muted for 10 seconds`);

    setTimeout(function(){
      wMember.removeRole(muterole.id);
      message.reply(`${wMember} has been unmuted`);
    }, ms(muteTime))
  }
  if(warns[wMember.id].warns == 5){
    message.guild.member(wUser).kick(reason);
    message.reply(`${wMember} is kicked for beeing too bad -.-`);
  }
}

module.exports.help = {
  name: "warn",
  desc: "Warns user for being bad (on 2 or more warns he gets muted for 10 minutes, 5 warns = kick)"
}
