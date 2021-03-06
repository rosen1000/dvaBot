const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");

module.exports.run = async (bot, message, args) => {
    let replies = ["yes", "no", "maybe"];

    let result = Math.floor(Math.random() * replies.length);
    let question = args.join(" ");
    if (!question) return message.channel.send("You haven't asked me something");

    let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.username)
        .setColor(botconfig.color)
        .addField("Question:", question)
        .addField("Answer:", replies[result]);

    message.channel.send(embed);
};

module.exports.help = {
    name: "8ball",
    type: "fun",
    desc: "ask the 8ball something",
    use: "8ball <question>",
};
