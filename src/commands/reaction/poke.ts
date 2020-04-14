import { getMember } from "../../functions/common";
import { getReaction } from "../../functions/image";
import { Command } from "../../models/Command";
import { BotClient } from "../../models/BotClient";

module.exports = class Poke extends Command {
    constructor(bot: BotClient) {
        super(bot, {
            name: "poke",
            type: "reaction",
            description: "Poke someone to wake up",
            usage: "[mention]",
            enabled: true,
        });
    }
    async run(message, args) {
        const embed = await getReaction(this.name);
        const target = getMember(message, args);
        if (target) embed.setDescription(`${target}, you got poked`);
        else embed.setDescription(`wake me up WAKE ME UP INSIDE`);
        message.channel.send(embed);
    }
};
