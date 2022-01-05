const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");
const axios = require("axios").default;

module.exports.run = async (bot, message, args) => {
    axios.get("https://nekos.life/api/v2/img/hug").then((response) => {
        const hugged =
                message.guild.member(message.mentions.users.first()) ||
                message.guild.member(args.join(" ")),
            embed = new Discord.MessageEmbed()
                .setColor(botconfig.color)
                .setImage(response.data.data.url);

        if (!hugged) {
            embed.setTitle(`${bot.user.username} hugged ${message.author.username}`);
        } else {
            embed.setTitle(`${message.author.username} hugged ${hugged.user.username}`);
        }

        message.channel.send(embed);
    });
};

module.exports.help = {
    name: "hug",
    type: "reaction",
    desc: "Hug someone",
    use: "hug <member>",
};
