const Discord = require("discord.js");
const pats = require("../../assets/pat.json");
const botconfig = require("../../botconfig.json");

module.exports.run = async (bot, message, args) => {
    let patted =
        message.guild.member(message.mentions.users.first()) ||
        message.guild.member(args[0]);
    let embed;
    if (!patted) {
        embed = new Discord.MessageEmbed()
            .setTitle(`${bot.user.username} patted ${message.author.username}`)
            .setColor(botconfig.color)
            .setImage(pats[Math.floor(Math.random() * pats.length)]);
    } else {
        embed = new Discord.MessageEmbed()
            .setTitle(`${message.author.username} patted ${patted.nickname}`)
            .setColor(botconfig.color)
            .setImage(pats[Math.floor(Math.random() * pats.length)]);
    }
    message.channel.send(embed);
};

module.exports.help = {
    name: "pat",
    type: "reaction",
    desc: "Pat someone",
    use: "pat <member>",
};
