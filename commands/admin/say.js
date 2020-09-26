const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");

module.exports.run = async (bot, message, args) => {
    if (!message.member.permissions.has(botconfig.messages))
        return message.reply("i dont obey non-message benders");
    let botMessage = args.join(" ");
    message.delete().catch();
    message.channel.send(botMessage);
};

module.exports.help = {
    name: "say",
    type: "admin",
    desc: "Make the bot to say something",
    use: "say [any text]",
};
