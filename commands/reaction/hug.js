const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");
const hugs = require("../../assets/hug.json");

module.exports.run = async (bot, message, args) => {
    let hugged =
        message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.find(
            (m) =>
                m.user.username == args.join(" ") || m == message.mentions.members.first()
        );
    if (!hugged) {
        let embed = new Discord.MessageEmbed()
            .setColor(botconfig.color)
            .setImage(hugs[Math.floor(Math.random() * hugs.length)])
            .setTitle(`${bot.user.username} hugged ${message.author.username}`);
        message.channel.send(embed);
    } else {
        let embed = new Discord.MessageEmbed()
            .setColor(botconfig.color)
            .setImage(hugs[Math.floor(Math.random() * hugs.length)])
            .setTitle(`${message.author.username} hugged ${hugged.user.username}`);
        message.channel.send(embed);
    }
};

module.exports.help = {
    name: "hug",
    type: "reaction",
    desc: "Hug someone",
    use: "hug <member>",
};
