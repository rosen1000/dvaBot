import { getMember } from "../../functions/common";
import { getReaction } from "../../functions/image";
import { Command } from "../../models/Command";
import { BotClient } from "../../models/BotClient";
import { Message } from "discord.js";

module.exports = class Cuddle extends Command {
    constructor(bot: BotClient) {
        super(bot, {
            name: "cuddle",
            type: "reaction",
            description: "Cuddle someone uwu",
            usage: "[mention]",
            enabled: true,
        });
    }
    async run(message: Message, args: string[]) {
        const embed = await getReaction(this.name);
        const target = getMember(message, args[0]);
        if (target) embed.setDescription(`${target} you have been cuddled uwu`);
        else
            embed.setDescription(
                `${message.member} worry not, i'll cuddle you`
            );
        message.channel.send(embed);
    }
};
