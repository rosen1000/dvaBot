const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let embed = new Discord.MessageEmbed()
        .setDescription("Bot info")
        .setColor("#15f153")
        .setThumbnail(bot.user.avatarURL())
        .addField("Bot name", bot.user.username, true)
        .addField("Created on", bot.user.createdAt, true);
    message.channel.send(embed);
};

module.exports.help = {
    name: "botinfo",
    desc: "info",
    desc: "Shows basic bot information",
    use: "botinfo",
};
