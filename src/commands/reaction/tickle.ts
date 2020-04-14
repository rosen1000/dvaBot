import { getMember } from "../../functions/common";
import { getReaction } from "../../functions/image";
import { Command } from "../../models/Command";
import { BotClient } from "../../models/BotClient";

module.exports = class Tickle extends Command {
    constructor(bot: BotClient) {
        super(bot, {
            name: "tickle",
            type: "reaction",
            description: "Tickle someone",
            usage: "[mention]",
            enabled: true,
        });
    }
    async run(message, args) {
        const embed = await getReaction(this.name);
        const target = getMember(message, args);
        if (target)
            embed.setDescription(
                `${message.member} tickled ${target}, they can't control themselfs!`
            );
        else embed.setDescription(`*tickle tickle*`);
        message.channel.send(embed);
    }
};
