const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    let aMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    
    if (!aMember) {
        let embed = new Discord.RichEmbed()
            .setAuthor(`${message.author.username}'s avatar`)
            .setColor(botconfig.color)
            .setImage(message.author.avatarURL);

        message.channel.send(embed);
    } else {
        let embed = new Discord.RichEmbed()
            .setAuthor(`${aMember.username}'s avatar`)
            .setColor(botconfig.color)
            .setImage(aMember.avatarURL);

        message.channel.send(embed)
    }
}

module.exports.help = {
    name: "avatar",
    type: "image",
    desc: "Outputs pinged user avatar (if not anyone is pinged will give your avatar)",
    use: "?avatar <member>"
}