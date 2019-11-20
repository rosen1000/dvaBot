const { RichEmbed } = require("discord.js");
const { getMember } = require("../../models/common");

module.exports = {
    name: "love",
    aliases: ["luv", "wuv"],
    category: "fun",
    description: "Predicts how much 2 people love each other",
    use: "<mention | id | args>",
    run: async (bot, message, args) => {
        let lover = getMember(message, args[0]);
        if (lover) {
            return message.channel.send("Who is the lucky one :)");
        } else if (message.author.id == lover.id) {
            return message.channel.send("I love chu dear");
        }
        const love = Math.random() * 100;
        const loveIndex = Math.floor(love / 10);
        const loveMeter = "💓".repeat(loveIndex) + "💔".repeat(10 - loveIndex);
        const embed = new RichEmbed()
            .setColor(require("../../botconfig.json").color)
            .setTitle(`${message.author} x ${lover}`)
            .addField(`${love}/100`, loveMeter);
        message.channel.send(embed);
    }
}