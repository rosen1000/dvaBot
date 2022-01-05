const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");
const axios = require("axios").default;

module.exports.run = async (bot, message, args) => {
    axios.get("https://nekos.life/api/v2/img/kiss").then((response) => {
        const kissed =
                message.guild.member(message.mentions.users.first()) ||
                message.guild.member(args.join(" ")),
            embed = new Discord.MessageEmbed()
                .setColor(botconfig.color)
                .setImage(response.data.data.url);

        if (!kissed) {
            embed.setTitle(`${bot.user.username} kissed ${message.author.username}`);
        } else {
            embed.setTitle(`${message.author.username} kissed ${kissed.user.username}`);
        }
        
        message.channel.send(embed);
    });
};

module.exports.help = {
    name: "kiss",
    type: "reaction",
    desc: "Kiss someone",
    use: "kiss <member>",
};
