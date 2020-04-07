const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
    let invEmbed = new Discord.MessageEmbed()
        .setColor(botconfig.color)
        .setTitle('Invite:')
        .setDescription("[invite me](https://discordapp.com/api/oauth2/authorize?client_id=455489457789861898&permissions=8&scope=bot) ❤");

    message.channel.send(invEmbed)
}

module.exports.help = {
    name: "invite",
    type: 'meta',
    desc: "Sends invite link for the bot and its server",
    use: "?invite"
}