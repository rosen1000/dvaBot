const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");

module.exports.run = async (bot, message, args) => {
    let user =
        message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.find(
            (m) =>
                m.user.username == args.join(" ") || m == message.mentions.members.first()
        );
    if (!user) user = message.author;
    let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.avatarURL())
        .setColor(botconfig.color)
        .setThumbnail(user.avatarURL())
        .addField("Joined Discord at:", user.createdAt)
        .addField("Presence:", user.presence)
        .setTitle(user.tag);
    message.channel.send(embed);
};

module.exports.help = {
    name: "userinfo",
    type: "info",
    desc: "Shows basic user information",
    use: "userinfo <user>",
};
