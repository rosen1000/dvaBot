const { RichEmbed } = require("discord.js");
const randomPuppy = require("random-puppy");

module.exports = {
    name: "animeme",
    category: "fun",
    desc: "Posts random meme from r/animemes",
    use: "animeme",
    enabled: true,
    run: async (bot, message, args) => {
        const animeme = await randomPuppy("animeme");
        const embed = new RichEmbed()
            .setColor(require("../../botconfig.json"))
            .setImage(animeme)
            .setTitle("Animeme!")
            .setURL("https://reddit.com/r/animemes");
        message.channel.send(embed);
    }
}