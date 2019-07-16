const botconfig = require("../botconfig.json");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!bUser) return message.channel.send("Couldn't find user.");
  let bReason = args.join(" ").slice(22);

  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You cant ban members");
  if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("He can ban too :/")

  message.guild.member(bUser).ban(bReason);
  message.channel.send(`Banned ${bUser.username}`)

  let banEmbed = new Discord.RichEmbed()
  .setDescription('---===Ban===---')
  .setColor(botconfig.ban)
  .addField("Banned user", `${bUser}`)
  .addField('banned by', `<@${message.author.id}>`)
  .addField('banned in', message.createdAt)
  .addField('reason:', bReason);

  if(!banChannel) return message.channel.send("Can't find incidents channel. Please create channel named exactly \"incidents\"");
  banChannel.send(banEmbed);
}

module.exports.help = {
    name: "ban",
    type: "admin",
  desc: "bans someone for being too bad >~<",
  use: "?ban [user] <reason>"
}