import * as Discord from "discord.js";
import randomPuppy from "random-puppy";
import { Command } from "../../models/Command";
import { BotClient } from "../../models/BotClient";

module.exports = class Animeme extends Command {
    constructor(bot: BotClient) {
        super(bot, {
            name: "animeme",
            type: "fun",
            description: "Posts random meme from r/animemes",
            usage: "animeme",
            enabled: true,
        });
    }
    async run(message: Discord.Message, args: string[]) {
        const animeme = await randomPuppy("animeme");
        const embed = new Discord.MessageEmbed()
            .setColor(require("../../config.js").color)
            .setImage(animeme)
            .setTitle("Animeme!")
            .setURL("https://reddit.com/r/animemes/");
        message.channel.send(embed);
    }
};
