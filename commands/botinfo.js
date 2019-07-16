const botconfig = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let embed = new Discord.RichEmbed()
        .setDescription("Bot info")
        .setColor("#15f153")
        .setThumbnail(bot.user.displayAvatarURL)
        .addField("Bot name", bot.user.username, true)
        .addField("Created on", bot.user.createdAt, true);
    message.channel.send(embed);
}

module.exports.help = {
    name: "botinfo",
    desc: "Shows basic bot information",
    use: "?botinfo"
}