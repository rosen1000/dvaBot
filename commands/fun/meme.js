const { RichEmbed } = require("discord.js");
const randomPuppy = require("random-puppy");

module.exports = {
    name: "meme",
    category: "fun",
    desc: "Posts random meme from r/meme r/dankmeme or r/me_irl",
    use: "meme",
    run: async (bot, message, args) => {
        const reddits = ["dankmeme", "meme", "me_irl"];
        const random = reddits[Math.floor(Math.random() * reddits.length)];
        const meme = await randomPuppy(random);
        const embed = new RichEmbed()
            .setColor(require("../../botconfig.json"))
            .setImage(meme)
            .setTitle(`r/${random}`)
            .setURL(`https://reddit.com/r/${random}`);
        message.channel.send(embed);
    }
}