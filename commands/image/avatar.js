const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");

/**
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (bot, message, args) => {
    let aMember =
        message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.find(
            (m) => m.user.username == args.join(" ") || m == message.mentions.members.first()
        ) ||
        bot.users.cache.find((u) => u.id == args[0]);
    let embed = new Discord.MessageEmbed().setColor(botconfig.color);

    if (!aMember)
        embed
            .setAuthor(`${message.author.username}'s avatar`)
            .setImage(message.author.avatarURL() + "?size=1024")
            .setURL(message.author.avatarURL() + "?size=1024");
    else {
        if (aMember.user) aMember = aMember.user;
        embed
            .setAuthor(`${aMember.username}'s avatar`)
            .setImage(aMember.avatarURL() + "?size=1024")
            .setURL(aMember.avatarURL() + "?size=1024");
    }

    message.channel.send(embed);
};

module.exports.help = {
    name: "avatar",
    type: "image",
    desc: "Outputs pinged user avatar (if not anyone is pinged will give your avatar)",
    use: "avatar [member]",
};
