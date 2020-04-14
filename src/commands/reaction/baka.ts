import { getMember } from "../../functions/common";
import { getReaction } from "../../functions/image";
import { Command } from "../../models/Command";
import { BotClient } from "../../models/BotClient";
import { Message } from "discord.js";

module.exports = class Baka extends Command {
    constructor(bot: BotClient) {
        super(bot, {
            name: "baka",
            type: "reaction",
            description: "Baka someone! Let them know how foolish they are!",
            usage: "[mention]",
            enabled: true,
        });
    }
    async run(message: Message, args: string[]) {
        const embed = await getReaction(this.name);
        const target = getMember(message, args);
        if (target)
            embed.setDescription(`${target} you just got :b:aKa'd! HA!`);
        else embed.setDescription(`b-baka!`);
        message.channel.send(embed);
    }
};
