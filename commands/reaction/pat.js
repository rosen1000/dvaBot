const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");
const axios = require("axios").default;

module.exports.run = async (bot, message, args) => {
    axios
        .get("https://nekos.life/api/v2/img/pat")
        .then((response) => {
            const patted =
                    message.guild.member(message.mentions.users.first()) ||
                    message.guild.member(args.join(" ")),
                embed = new Discord.MessageEmbed()
                    .setColor(botconfig.color)
                    .setImage(response.data.data.url);

            if (!patted) {
                embed.setTitle(`${bot.user.username} patted ${message.author.username}`);
            } else {
                embed.setTitle(`${message.author.username} patted ${patted.nickname}`);
            }

            message.channel.send(embed);
        })
        .catch((e) => {
            if (e) console.log(e);
        });
};

module.exports.help = {
    name: "pat",
    type: "reaction",
    desc: "Pat someone",
    use: "pat <member>",
};
