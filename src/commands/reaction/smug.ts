import { getMember } from "../../functions/common";
import { getReaction } from "../../functions/image";
import { Command } from "../../models/Command";
import { BotClient } from "../../models/BotClient";

module.exports = class Smug extends Command {
    constructor(bot: BotClient) {
        super(bot, {
            name: "smug",
            type: "reaction",
            description: "smug smug smug",
            usage: "[mention]",
            enabled: true,
        });
    }
    async run(message, args) {
        const embed = await getReaction(this.name);
        const target = getMember(message, args);
        if (target)
            embed.setDescription(`${message.member} smugged on ${target}`);
        else embed.setDescription(`😏😏😏`);
        message.channel.send(embed);
    }
};
