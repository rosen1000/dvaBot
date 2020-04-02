const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
   if (message.author.id != 353464955217117185) return message.channel.send("Restricted to bot owner only!");
   let embed = new Discord.MessageEmbed()
      .setColor(botconfig.color)
      .setTitle("All severs im in:")
      .setDescription(`\`\`\`fix${bot.guilds.cache.map(g => "\n" + g.name )}\`\`\``);

   message.channel.send(embed);
};

module.exports.help = {
   name: "servers",
   desc: "Shows all servers the bot is in",
   use: "?servers"
};
