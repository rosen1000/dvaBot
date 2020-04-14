import { getMember } from "../../functions/common";
import { getReaction } from "../../functions/image";
import { Command } from "../../models/Command";
import { BotClient } from "../../models/BotClient";

module.exports = class Slap extends Command {
    constructor(bot: BotClient) {
        super(bot, {
            name: "slap",
            type: "reaction",
            description: "Slap someone",
            usage: "[mention]",
            enabled: true,
        });
    }
    async run(message, args) {
        const embed = await getReaction(this.name);
        const target = getMember(message, args[0]);
        if (target) embed.setDescription(`${target} SLAPP`);
        else embed.setDescription(`${message.member} think straight!`);
        message.channel.send(embed);
    }
};
