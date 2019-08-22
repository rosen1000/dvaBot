const botconfig = require("../botconfig.json");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!bUser) return message.channel.send("Couldn't find user.");
  let bReason = args.join(" ") || "breaking the rules";

  if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You cant ban members");
  if (bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("He can ban too :/");
  if (!bUser.bannable) return message.channel.send("I can't ban him tho")

  message.guild.member(bUser).ban(bReason);
  message.channel.send(`Banned ${bUser.user.username}`)

  let channel = message.guild.channel.find(ch => ch.name == "incidents");
  if (!channel) return;
  let banEmbed = new Discord.RichEmbed()
    .setDescription('---===Ban===---')
    .setColor(botconfig.ban)
    .addField("Banned user", `${bUser}`)
    .addField('banned by', `<@${message.author.id}>`)
    .addField('banned in', message.createdAt)
    .addField('reason:', bReason);
  channel.send(banEmbed);
}

module.exports.help = {
    name: "ban",
    type: "admin",
  desc: "bans someone for being too bad >~<",
  use: "?ban [user] <reason>"
}