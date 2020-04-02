const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
   if (!args[0]) return message.channel.send("please tell me something");
   let feedback = args.join(" ");
   var rosen = bot.users.cache.find(r => r.id == "353464955217117185");
   rosen.send(
      `\`${message.author.tag}\` in \`${message.guild.name}\`: ${feedback}`
   );

   message.channel.send("👍");
};

module.exports.help = {
   name: "feedback",
   type: "meta",
   desc: "Send feedback to the bots owner",
   use: "?feedback [any text]"
};
