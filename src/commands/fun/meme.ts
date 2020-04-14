import { MessageEmbed, Message } from "discord.js";
import randomPuppy from "random-puppy";
import { Command } from "../../models/Command";
import { BotClient } from "../../models/BotClient";

module.exports = class Meme extends Command {
    constructor(bot: BotClient) {
        super(bot, {
            name: "meme",
            type: "fun",
            description: "Posts random meme from r/meme r/dankmeme or r/me_irl",
            usage: "meme",
            enabled: true,
        });
    }
    async run(message: Message, args: string[]) {
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
};
