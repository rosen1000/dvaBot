const botconfig = require("../botconfig.json");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
   let member =
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
         m =>
            m.user.username == args.join(" ") ||
            m == message.mentions.members.first()
      );
   if (!member) return message.channel.send("Couldn't find user.");
   let reason = args.join(" ") || "breaking rules";

   if (!message.member.permissions.has("KICK_MEMBERS"))
      return message.channel.send("How about you can't kick ppl!");
   if (member.permissions.has("KICK_MEMBERS"))
      return message.channel.send("But he is admin :/");
   if (!member.kickable) return message.channel.send("I can't kick him tho");

   let kickEmbed = new Discord.MessageEmbed()
      .setDescription("---===Kick===---")
      .setColor(botconfig.ban)
      .addField("Banned user", `${member}`)
      .addField("banned by", `<@${message.author.id}>`)
      .addField("banned in", message.createdAt)
      .addField("reason:", reason);

   member.kick(reason);
   message.channel.send(`${member.user.username} has been kicked`);

   let channel = message.guild.channel.find(ch => ch.name == "incidents");
   if (!channel) return;
   channel.send(kickEmbed);
};

module.exports.help = {
   name: "kick",
   type: "admin",
   desc: "Kicks a user who is not following the rules",
   use: "?kick [user] <reason>"
};
