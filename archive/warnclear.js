const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", 'utf8'));

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply("NOPE");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("cant find him");
  let warnlevel = wanrs[wUser.id].warns;

  message.send(`All warns from <@${wUser.id}> has been removed (were ${warnlevel})`)

  warns[wMember.id] = {
    warns: 0
  }
}

module.exports.help = {
  name: "warnclear",
  desc: "Clear all warnings on user",
  use: "?warnclear [user]"
}
