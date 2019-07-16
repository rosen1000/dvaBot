const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", 'utf8'));

module.exports.run = async (bot, message, args) => {
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("cant find him");
  let warnlevel = warns[wUser.id].warns;

  message.reply(`<@${wUser.id}> has ${warnlevel} warnings.`);
}

module.exports.help = {
  name: "warnlevel",
  desc: "Shows how many warns someone has",
  use: "?warnlevel [user]"
}