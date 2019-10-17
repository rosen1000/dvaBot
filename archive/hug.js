const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const hugs = require("../assets/hug.json");

module.exports.run = async (bot, message, args) => {
    let hugged = message.guild.member(message.mentions.users.first()) || message.guild.member(args[0]);
    if (!hugged) {
        let embed = new Discord.RichEmbed()
            .setColor(botconfig.color)
            .setImage(hugs[Math.floor(Math.random() * hugs.length)])
            .setTitle(`${bot.user.username} hugged ${message.author.username}`);
        message.channel.send(embed);
    } else {
        let embed = new Discord.RichEmbed()
            .setColor(botconfig.color)
            .setImage(hugs[Math.floor(Math.random() * hugs.length)])
            .setTitle(`${message.author.username} hugged ${hugged.nickname}`);
        message.channel.send(embed);
    }
}

module.exports.help = {
    name: "hug",
    type: 'reaction',
    desc: "Hug someone",
    use: "?hug <member>"
}