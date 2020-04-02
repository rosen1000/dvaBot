const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const kisses = require("../assets/kiss.json");

module.exports.run = async (bot, message, args) => {
   let kissed =
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
         m =>
            m.user.username == args.join(" ") ||
            m == message.mentions.members.first()
      );
   let embed;
   if (!kissed) {
      embed = new Discord.MessageEmbed()
         .setTitle(`${bot.user.username} kissed ${message.author.username}`)
         .setColor(botconfig.color)
         .setImage(kisses[Math.floor(Math.random() * kisses.length)]);
   } else {
      embed = new Discord.MessageEmbed()
         .setTitle(`${message.author.username} kissed ${kissed.user.username}`)
         .setColor(botconfig.color)
         .setImage(kisses[Math.floor(Math.random() * kisses.length)]);
   }
   message.channel.send(embed);
};

module.exports.help = {
   name: "kiss",
   type: "reaction",
   desc: "Kiss someone",
   use: "?kiss <member>"
};
