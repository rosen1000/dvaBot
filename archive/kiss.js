const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const kisses = require("../assets/kiss.json");

module.exports.run = async (bot, message, args) => {
    let kissed = message.guild.member(message.mentions.users.first()) || message.guild.member(args[0]);
    let embed;
    if (!kissed) {
        embed = new Discord.RichEmbed()
            .setTitle(`${bot.user.username} kissed ${message.author.username}`)
            .setColor(botconfig.color)
            .setImage(kisses[Math.floor(Math.random() * kisses.length)]);
    } else {
        embed = new Discord.RichEmbed()
            .setTitle(`${message.author.username} kissed ${kissed.nickname}`)
            .setColor(botconfig.color)
            .setImage(kisses[Math.floor(Math.random() * kisses.length)]);
    }
    message.channel.send(embed);
}

module.exports.help = {
    name: "kiss",
    type: 'reaction',
    desc: "Kiss someone",
    use: "?kiss <member>"
}