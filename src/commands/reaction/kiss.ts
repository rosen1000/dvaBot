import { getMember } from "../../functions/common";
import { getReaction } from "../../functions/image";
import { Command } from "../../models/Command";
import { BotClient } from "../../models/BotClient";
import { Message } from "discord.js";

module.exports = class Kiss extends Command {
    constructor(bot: BotClient) {
        super(bot, {
            name: "kiss",
            type: "reaction",
            description: "Kiss your favorite one",
            usage: "[mention]",
            enabled: true,
        });
    }
    async run(message: Message, args: string[]) {
        const embed = await getReaction(this.name);
        const target = getMember(message, args[0]);
        if (target) embed.setDescription(`${message.member} kissed ${target}`);
        else embed.setDescription(`${message.member} <.< *kisses you*`);
        message.channel.send(embed);
    }
};
