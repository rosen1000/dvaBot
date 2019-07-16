const Discord = require("discord.js");
const botconfig = require("../botconfig.json")

module.exports.run = async (bot, message, args) => {
    let guilds = bot.guilds.array().join(",\n");
    let embed = new Discord.RichEmbed()
    .setColor(botconfig.color)
    .setTitle("All severs im in:")
    .setDescription(`\`\`\`fix\n${guilds}\`\`\``);

    message.channel.send(embed)
}

module.exports.help = {
    name: "servers",
    desc: "Shows all servers the bot is in",
    use: "?servers"
}