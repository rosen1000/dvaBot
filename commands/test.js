const Discord = require("discord.js");

/**
 * @param {Discord.Client} bot
 * @param {Discord.Message} message
 * @param {string[]} args
 */
module.exports.run = async (bot, message, args) => {
    if (message.author.id != "353464955217117185") return;
};

module.exports.help = {
    name: "test",
    desc: "testing command do not use ~~cant use~~",
    use: "none",
};
