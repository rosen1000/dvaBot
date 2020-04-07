import { MessageEmbed } from "discord.js";
import randomPuppy from "random-puppy";

module.exports = {
    name: "meme",
    category: "fun",
    desc: "Posts random meme from r/meme r/dankmeme or r/me_irl",
    use: "meme",
    enabled: true,
    run: async (bot, message, args) => {
        const reddits = ["dankmeme", "meme", "me_irl"];
        const random = reddits[Math.floor(Math.random() * reddits.length)];
        const meme = await randomPuppy(random);
        const embed = new MessageEmbed()
            .setColor(require("../../config.js").color)
            .setImage(meme)
            .setTitle(`r/${random}`)
            .setURL(`https://reddit.com/r/${random}`);
        message.channel.send(embed);
    }
}