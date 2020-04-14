import { getMember } from "../../functions/common";
import { getReaction } from "../../functions/image";
import { Command } from "../../models/Command";
import { BotClient } from "../../models/BotClient";
import { Message } from "discord.js";

module.exports = class Feed extends Command {
    constructor(bot: BotClient) {
        super(bot, {
            name: "feed",
            type: "reaction",
            description: "Feed your hungry friends",
            usage: "[mention]",
            enabled: true,
        });
    }
    async run(message: Message, args: string[]) {
        const embed = await getReaction(this.name);
        const target = getMember(message, args);
        if (target)
            embed.setDescription(
                `${target} you got fed with ${args[1] ? args[1] : "spaghetti"}`
            );
        else embed.setDescription(`${message.member} open wide! Ahhh~`);
        message.channel.send(embed);
    }
};
