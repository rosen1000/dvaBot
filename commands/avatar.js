const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
   let aMember =
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
         m =>
            m.user.username == args.join(" ") ||
            m == message.mentions.members.first()
      );

   if (!aMember) {
      let embed = new Discord.MessageEmbed()
         .setAuthor(`${message.author.username}'s avatar`)
         .setColor(botconfig.color)
         .setImage(message.author.avatarURL());

      message.channel.send(embed);
   } else {
      let embed = new Discord.MessageEmbed()
         .setAuthor(`${aMember.user.username}'s avatar`)
         .setColor(botconfig.color)
         .setImage(aMember.user.avatarURL());

      message.channel.send(embed);
   }
};

module.exports.help = {
   name: "avatar",
   type: "image",
   desc:
      "Outputs pinged user avatar (if not anyone is pinged will give your avatar)",
   use: "?avatar <member>"
};
