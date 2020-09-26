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
            (m) =>
                m.user.username == args.join(" ") || m == message.mentions.members.first()
        );
    let embed = new Discord.MessageEmbed().setColor(botconfig.color);

    if (!aMember)
        embed
            .setAuthor(`${message.author.username}'s avatar`)
            .setImage(message.author.avatarURL());
    else
        embed
            .setAuthor(`${aMember.user.username}'s avatar`)
            .setImage(aMember.user.avatarURL());

    message.channel.send(embed);
};

module.exports.help = {
    name: "avatar",
    type: "image",
    desc: "Outputs pinged user avatar (if not anyone is pinged will give your avatar)",
    use: "avatar [member]",
};
