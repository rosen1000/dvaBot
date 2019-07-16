const botconfig = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let embed = new Discord.RichEmbed()
        .setDescription("Server info")
        .setColor(botconfig.color)
        .setThumbnail(message.guild.iconURL)
        .addField("Server name", message.guild.name)
        .addField("Created on", message.guild.createdAt)
        .addField("You joined", message.member.joinedAt)
        .addField("Total members", message.guild.memberCount);
    message.channel.send(embed);
}

module.exports.help = {
    name: "serverinfo",
    desc: "Shows some basic server information",
    use: "?serverinfo"
}