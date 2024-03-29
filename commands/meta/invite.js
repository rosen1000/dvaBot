const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");

module.exports.run = async (bot, message, args) => {
    let invEmbed = new Discord.MessageEmbed()
        .setColor(botconfig.color)
        .setTitle('Invite:')
        .setDescription(`[invite me](${await bot.generateInvite(268758038)}) ❤`);

    message.channel.send(invEmbed);
};

module.exports.help = {
    name: "invite",
    type: "meta",
    desc: "Sends invite link for the bot and its server",
    use: "invite",
};
