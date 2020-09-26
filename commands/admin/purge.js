const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission(botconfig.messages)) return message.reply("nope");

    let number = args[0];
    if (!number) return message.channel.send("how about you give me number");

    if (number > 100)
        return message.channel.send(
            "Can't delete more than 100 messages at once >~< blame discord API"
        );

    message.delete();
    message.channel
        .bulkDelete(number)
        .then(
            message.channel
                .send(`Purged ${number} messages`)
                .then((msg) => msg.delete({ timeout: 3500 }))
        )
        .catch((e) => {
            if (e) message.channel.send("Error ocured");
        });
};

module.exports.help = {
    name: "purge",
    type: "admin",
    desc: "Clears the chat from spam",
    use: "purge <number>",
};
